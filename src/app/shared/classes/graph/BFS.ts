import { Queue } from '../Queue';

export class BFS {

    // Its a hashmap::: nodeId -> {status, index(in adjacency list)}
    // node status : can be one of the three: undiscovered discovered processed
    // undiscovered means we didn't get to this node yet || representation: 0
    // discovered means we reached this node but its yet to explored || representation: 1
    // processed means we fully explored this node || representation: 2
    private nodeStatus: {[nodeId: string]: {status: number, index: number}} | null  = null;

    // adjacencyList: store graph to be processed
    constructor(private adjacencyList: {nodeId: string, connectedNodes: string[]}[]) {

        // creating node status hashmap for fast processing
        this.nodeStatus = adjacencyList.reduce((statusObject, node, index) => {
            return statusObject[node.nodeId] = {
                status: 0,
                index
            };
        }, {});
    }

    // This function will traverse the array in BFS pattern and return traversal order
    // traversal order will be return as array of nodeIDs
    public getTraversalOrder(): string[] {

        // order array
        const order: string[] = [];

        if (this.adjacencyList.length) {
            return order;
        }

        // Queue of discovered node
        const discoveryQueue = new Queue();

        // index (in adjacency list) of current node
        let currentNodeIndex = 0;
        // setting root node in order list
        order.push(this.adjacencyList[currentNodeIndex].nodeId);
        // setting root node as discovered
        this.nodeStatus[this.adjacencyList[currentNodeIndex].nodeId].status = 1;
        // adding root node in discovered node queue
        discoveryQueue.enqueue(currentNodeIndex);

        // Looping till queue is empty ie no node is left to be discovered
        while (discoveryQueue.getItemCount()) {
            currentNodeIndex = discoveryQueue.dequeue();

            // if node is processed then skip
            if (this.nodeStatus[this.adjacencyList[currentNodeIndex].nodeId].status === 2) {
                continue;
            }

            // processing all connected nodes
            this.adjacencyList[currentNodeIndex].connectedNodes.forEach(node => {

                // extracting data from object
                const {status, index} = this.nodeStatus[node];

                // checking if node is undiscovered
                if (!status) {
                    // adding it to discovery queue
                    discoveryQueue.enqueue(index);
                    // adding node to order list
                    order.push(this.adjacencyList[index].nodeId);
                    // making it discovered
                    this.nodeStatus[this.adjacencyList[index].nodeId].status = 1;
                }
            });

            // setting current node as processed after exploration
            this.nodeStatus[this.adjacencyList[currentNodeIndex].nodeId].status = 2;
        }

        return order;
    }




}
