import { Injectable } from '@angular/core';

import { BFS } from '../shared/classes/graph/BFS';
import { DFS } from '../shared/classes/graph/DFS';

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
            case 'dfs':
                return this.getDFSTraversalOrder();
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
}
