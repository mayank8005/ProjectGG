import { Injectable } from '@angular/core';

import { BFS } from '../shared/classes/graph/BFS';

@Injectable()
export class GraphStoreService {

    private adjacencyList: {nodeId: string, connectedNodes: string[]}[] = [];

    public addNode = (nodeId: string): void => {
        // This will create new entry in adjacency list
        this.adjacencyList.push({
            nodeId, connectedNodes: []
        });
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
            default:
                return [];
        }
    }

    public getBFSTraversalOrder(): string[] {
        const bfs = new BFS(this.adjacencyList);
        return bfs.getTraversalOrder();
    }
}
