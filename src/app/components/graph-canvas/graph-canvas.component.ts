import { Component,
        ElementRef,
        ViewChild,
        AfterViewInit,
        ChangeDetectorRef,
        OnInit,
        OnDestroy } from '@angular/core';
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
    public nodeColor = '#0336FF';
    public selectedNode: Node | null = null;

    private nodeRadius = 20;
    private nodes: Node[] = [];
    // if user click on canvas where any node is present
    // that node will be selected if no node is selected

    private graphCanvasState: Subscription;

    constructor(private changeDetectionRef: ChangeDetectorRef,
                private graphStoreService: GraphStoreService,
                private store: Store<{graphCanvas: {selectedNode: Node|null}}>) {}

    ngOnInit() {
        // setting subscription for graph canvas state
        this.graphCanvasState = this.store.select('graphCanvas').subscribe(state => {
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

    // called when someone click anywhere in graph canvas
    public canvasClick(event: any) {
        const clickCoordinates: Coordinates = this.getCanvasClickCoordinates(event);
        const nodeSelected: Node | undefined = this.nodeSelected(clickCoordinates);

        // if no node is selected, that means user want to create new node
        if (!nodeSelected) {
            // setting selected node as null as no node is selected
            // older selecting will reset
            this.store.dispatch(new GraphCanvasActions.SelectNode(null));

            // creating new node
            this.generateNode(clickCoordinates);
            this.createNodeInGraph(clickCoordinates);

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
            this.store.dispatch(new GraphCanvasActions.SelectNode(null));

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
        context.moveTo(nodeA.x, nodeA.y);
        context.lineTo(nodeB.x, nodeB.y);
        context.stroke();
        context.closePath();
    }

    // Will return node whose x and y intersect with the given coordinate else null
    private nodeSelected(coordinates: Coordinates): Node | undefined {
        return this.nodes.find(node => {
            return Utils.isBetween(coordinates.x, node.x - this.nodeRadius, node.x + this.nodeRadius) &&
                Utils.isBetween(coordinates.y, node.y - this.nodeRadius, node.y + this.nodeRadius);
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

    private getCanvasClickCoordinates(canvasEvent: any): Coordinates {
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

    // draw node in graph @ given coordinate
    private createNodeInGraph(canvasCoordinates: Coordinates) {

        const { x, y } = canvasCoordinates;
        const context = this.graph.nativeElement.getContext('2d');
        context.fillStyle = this.nodeColor;
        context.beginPath();
        context.arc(x, y, this.nodeRadius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
}
