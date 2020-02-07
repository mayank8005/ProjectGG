import {
    Component,
    ElementRef,
    ViewChild,
    AfterViewInit,
    ChangeDetectorRef,
    OnInit,
    OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as Utils from '../../../lib/Utils';
import { GraphStoreService } from 'src/app/services/graph-store.service';
import { Node, Coordinates } from '../../shared/graph-canvas.model';
import * as GraphCanvasActions from '../../store/graph-canvas.action';

@Component({
    selector: 'app-graph-canvas',
    templateUrl: 'graph-canvas.component.html',
    styleUrls: ['graph-canvas.component.css']
})
export class GraphCanvasComponent implements AfterViewInit, OnInit, OnDestroy {

    @ViewChild('graphCanvas', { static: false }) graph: ElementRef;

    public canvasResolution: { width: number, height: number } = {
        width: 1024,
        height: 1024
    };
    // Purple color
    public nodeColor = '#0336FF';
    // Red color
    public nodeSelectedColor = '#FF0266';
    public selectedNode: Node | null = null;
    // This object contain node if user hover on a node
    // null if user is not hovering on any node
    public hoverObject: Node | null = null;

    private nodeRadius = 20;
    private nodes: Node[] = [];
    // if user click on canvas where any node is present
    // that node will be selected if no node is selected

    private graphCanvasState: Subscription;

    constructor(private changeDetectionRef: ChangeDetectorRef,
        private graphStoreService: GraphStoreService,
        private store: Store<{ graphCanvas: { selectedNode: Node | null } }>) { }

    ngOnInit() {
        // setting subscription for graph canvas state
        this.graphCanvasState = this.store.select('graphCanvas').subscribe(state => {
                // Need to handle canvas changes before actually changing selected node
                // to handle de-selection case(by determining diff between new and old state)
                this.handleCanvasOnNodeSelection(state.selectedNode, this.selectedNode);
                this.selectedNode = state.selectedNode;
            });
    }

    ngAfterViewInit() {
        const canvasRect = this.graph.nativeElement.getBoundingClientRect();
        this.canvasResolution.width = canvasRect.width;
        this.canvasResolution.height = canvasRect.height;
        // HACK: need to find better solution to avoid this
        // Setting canvas width equal to its css width to
        // avoid node oval shape instead of circle
        // to get css width need to change width of component in ngAfterViewInit
        // which is throwing error without this
        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy() {
        // destroying Subscription on destroy
        this.graphCanvasState.unsubscribe();
    }

    // Will be triggered when user hover on canvas
    public canvasMouseMove(event: any): void {
        const hoverCoordinates: Coordinates = this.getCanvasCoordinates(event);
        this.hoverObject = this.getNodeFromCoordinates(hoverCoordinates);
    }

    // Will be triggered when user mouse leave the canvas
    public canvasMouseLeave(): void {
        this.hoverObject = null;
    }

    // called when someone click anywhere in graph canvas
    public canvasClick(event: any) {
        const clickCoordinates: Coordinates = this.getCanvasCoordinates(event);
        const nodeSelected: Node | undefined = this.getNodeFromCoordinates(clickCoordinates);

        // if no node is selected, that means user want to create new node
        if (!nodeSelected) {
            // setting selected node as null as no node is selected
            // older selecting will reset
            this.store.dispatch(new GraphCanvasActions.ClearNodeSelection());

            // validating new coordinates(checking if we can create new node or not)
            if (this.validateCoorinate(clickCoordinates)) {
                // creating new node
                this.generateNode(clickCoordinates);
                this.drawNodeInGraph(clickCoordinates, this.nodeColor);
            }

        } else if (this.selectedNode) {
            // any node is already selected then join both node

            // extracting coordinates of selected node
            const initialSelectedNodeCoord: Coordinates = {
                x: this.selectedNode.x,
                y: this.selectedNode.y
            };

            const newSelectedNodeCoord: Coordinates = {
                x: nodeSelected.x,
                y: nodeSelected.y
            };

            // NOTE: setting graph as undirected so sending it as false
            // adding edge in graphStoreService
            this.graphStoreService.addConnection(this.selectedNode.id, nodeSelected.id, false);

            // joining nodes in canvas
            this.joinNodeByEdge(initialSelectedNodeCoord, newSelectedNodeCoord);

            // setting selected node as null
            this.store.dispatch(new GraphCanvasActions.ClearNodeSelection());

        } else {
            // else no node was selected till now so selecting this node
            this.store.dispatch(new GraphCanvasActions.SelectNode(nodeSelected));
        }
    }

    // generate node id in format node-1 where 1 is index of this
    // new node in nodes array
    private generateNewNodeId(): string {
        return `node-${this.nodes.length}`;
    }

    // This function will draw edge betwwen two node in canvas
    private joinNodeByEdge(nodeA: Coordinates, nodeB: Coordinates): void {
        const context = this.graph.nativeElement.getContext('2d');
        context.lineWidth = 5;

        context.beginPath();

        //creates an edge from nodeA to nodeB
        const edge = Utils.drawShorterLine(nodeA, nodeB, { start: this.nodeRadius, end: this.nodeRadius });
        const { start, end } = edge;//pulls the start and end coordinates from the edge
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
    }

    // Will return node whose x and y intersect with the given coordinate else null
    private getNodeFromCoordinates(coordinates: Coordinates): Node | undefined {
        return this.nodes.find(node => {
            return Utils.isBetween(coordinates.x, node.x - this.nodeRadius, node.x + this.nodeRadius) &&
                Utils.isBetween(coordinates.y, node.y - this.nodeRadius, node.y + this.nodeRadius);
        });
    }

    // This function will validate if for given coordinate we can generate node or not
    // Will return true in case of no conflicts
    // Will return false for validation failure(if new node will overlap any previous node)
    private validateCoorinate(coordinates: Coordinates): boolean {
        // defining danger radius in which nodes can overlap
        const conflictRadius = 2 * this.nodeRadius;
        // if any new coordinate is in confict area of any previous node then return false
        return !this.nodes.some(node => {
            return Utils.isBetween(coordinates.x, node.x - conflictRadius, node.x + conflictRadius) &&
            Utils.isBetween(coordinates.y, node.y - conflictRadius, node.y + conflictRadius);
        });
    }

    // this function will generate new node in node array
    // and also add node in graphStoreService
    private generateNode(coordinates: Coordinates): void {

        const { x, y } = coordinates;
        const id = this.generateNewNodeId();

        // adding node in graph service
        this.graphStoreService.addNode(id);

        // pushing new node in nodes array for future reference
        this.nodes.push({
            id,
            x,
            y
        });
    }

    private getCanvasCoordinates(canvasEvent: any): Coordinates {
        const canvasRect = this.graph.nativeElement.getBoundingClientRect();
        // extrcting mouse coordinate on graph
        // mouse coordinate - canvas top left and canvas x and y are not same
        // x ad y depends on canvas resolution whereas mouse coordinate depends on
        // css style: refer:
        // https://stackoverflow.com/questions/43853119/javascript-wrong-mouse-position-when-drawing-on-canvas
        const mouseCanvasCoordinate: Coordinates = {
            x: canvasEvent.offsetX,
            y: canvasEvent.offsetY
        };

        const normalisedX: number = (mouseCanvasCoordinate.x / canvasRect.width) * this.canvasResolution.width;
        const normalisedY: number = (mouseCanvasCoordinate.y / canvasRect.height) * this.canvasResolution.height;

        return {
            x: normalisedX,
            y: normalisedY
        };
    }

    // this function handle node selection and de-selection in graph(camvas level changes)
    private handleCanvasOnNodeSelection(newSelectionState: Node|null, oldSelectionState: Node|null): void {
        // :NOTE both new and old selectionState cannot be Node object at same time
        // atleast one of them will be null

        // if node selection new and old state both are null then do nothing
        if (!newSelectionState && !oldSelectionState) {
            return;
        } else if (newSelectionState) {
            // if new state contain some node then changing that nodes color to selected color
            const coordinates: Coordinates = {x: newSelectionState.x, y: newSelectionState.y};
            this.drawNodeInGraph(coordinates, this.nodeSelectedColor);
        } else {
            // if new node contain null then changing color of previously selected node (old state)
            // to normal color
            const coordinates: Coordinates = {x: oldSelectionState.x, y: oldSelectionState.y};
            this.drawNodeInGraph(coordinates, this.nodeColor);
        }
    }

    // draw node in graph @ given coordinate with given color
    private drawNodeInGraph(canvasCoordinates: Coordinates, color: string) {

        const { x, y } = canvasCoordinates;
        const context = this.graph.nativeElement.getContext('2d');
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, this.nodeRadius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
}
