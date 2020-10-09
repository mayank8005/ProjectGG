import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { BFS } from '../shared/classes/graph/BFS';
import { DFS } from '../shared/classes/graph/DFS';
import { SPT } from '../shared/classes/graph/SPT';

@Injectable()
export class GraphStoreService {

    private adjacencyList: {nodeId: string, connectedNodes: string[]}[] = [];
    private static nodesController = new Subject<{nodeId: string, connectedNodes: string[]}[]>();
    private static selectedOptionsController = new Subject<{start:string, end:string}>();
    private selectedOptionsReceiver: Observable<{start: string, end:string}>;
    private selectedOptions:{start:string, end:string};
    constructor(){
        this.selectedOptionsReceiver = GraphStoreService.getSelectedOptionsReciever();
        this.selectedOptionsReceiver.subscribe(newSelectedOptions=> {
            this.selectedOptions = newSelectedOptions;
        })
    }
   




    public addNode = (nodeId: string): void => {
        // This will create new entry in adjacency list
        this.adjacencyList.push({
            nodeId, connectedNodes: []
        });
        GraphStoreService.triggerNodesController(this.adjacencyList);
    }

    public static getNodesReciever(): Observable<{nodeId: string, connectedNodes: string[]}[]> {
        return GraphStoreService.nodesController;
    }

    // This will trigger controller observable to send nodes array to all subscribers
    public static triggerNodesController(nodes: {nodeId: string, connectedNodes: string[]}[]): void {
        GraphStoreService.nodesController.next(nodes);
    }

    public static getSelectedOptionsReciever(): Observable<{start:string, end:string}> {
        return GraphStoreService.selectedOptionsController;
    }

    // This will trigger controller observable to send nodes array to all subscribers
    public static triggerSelectedOptionsController(option: {start:string, end:string}): void {
        GraphStoreService.selectedOptionsController.next(option);
    }

    // return array of all nodeIds
    public getAllNodes = (): string[] => {
        return this.adjacencyList.map( node => node.nodeId);
    }

    // this function require two node id string and a bool
    // if isDirected is false that means graph is not directed and
    // nodeA -> nodeB === nodeB -> nodeA
    // else vice versa
    // In case of invalid nodeId this function won't do anything
    public addConnection = (nodeA: string, nodeB: string, isDirected: boolean): void => {
        const nodeAIndex = this.adjacencyList.findIndex(node => node.nodeId === nodeA);
        const nodeBIndex = this.adjacencyList.findIndex(node => node.nodeId === nodeB);

        if (nodeAIndex === -1 || nodeBIndex === -1 ) {
            return;
        }

        // adding connection between nodeA -> nodeB
        this.adjacencyList[nodeAIndex].connectedNodes.push(nodeB);

        // adding connection between nodeB -> nodeA if its not a directed graph
        // and its not a loop edge ie nodeA === nodeB
        if (!isDirected && nodeA !== nodeB) {
            this.adjacencyList[nodeBIndex].connectedNodes.push(nodeA);
        }
    }

    public getAlgorithmTraversalOrder(id: string): string[] {

        // running algoritm based on id if no algorthm exist return empty array
        switch (id) {
            case 'bfs':
                return this.getBFSTraversalOrder();
            case 'dfs':
                return this.getDFSTraversalOrder();
            case 'spt':
                return this.getSPT()
            default:
                return [];
        }
    }

    public getBFSTraversalOrder(): string[] {
        const bfs = new BFS(this.adjacencyList);
        return bfs.getTraversalOrder();
    }
    
    public getDFSTraversalOrder(): string[] {
        const dfs = new DFS(this.adjacencyList);
        return dfs.getTraversalOrder();
    }

    public getSPT(): string[] {
        if(!this.adjacencyList.length) return [];
        const spt = new SPT(this.adjacencyList);
        spt.compilePaths(this.selectedOptions.start);
        return spt.getShortestPath(this.selectedOptions.end) || [];
    }
}
