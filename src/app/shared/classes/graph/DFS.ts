export class DFS {

    // Its a hashmap::: nodeId -> {status, index(in adjacency list)}
    // node status : can be one of the three: undiscovered discovered processed
    // undiscovered means we didn't get to this node yet || representation: 0
    // discovered means we reached this node but its yet to explored || representation: 1
    // processed means we fully explored this node || representation: 2
    private nodeStatus: { [nodeId: string]: { status: number, index: number } } = {};

    // adjacencyList: store graph to be processed
    constructor(private adjacencyList: { nodeId: string, connectedNodes: string[] }[]) {

        // creating node status hashmap for fast processing
        adjacencyList.forEach((node, index) => {
            this.nodeStatus = Object.assign(this.nodeStatus, {
                [node.nodeId]: {
                    status: 0,
                    index
                }
            });
        });
    }

    // This function will traverse the array in DFS pattern and return traversal order
    // traversal order will be return as array of nodeIDs
    public getTraversalOrder(): string[] {

        // order array
        const order: string[] = [];

        if (!this.adjacencyList.length) {
            return order;
        }
        const sourceNodeIndex = 0;
        //pushing the source node index in the order
        order.push(this.adjacencyList[sourceNodeIndex].nodeId);
        //making sourceIndex visited
        this.nodeStatus[this.adjacencyList[sourceNodeIndex].nodeId].status = 1;
        this.DFSRecursive(sourceNodeIndex, order);
        return order;
    }

    private DFSRecursive(sourceNodeIndex: number, order: string[]) {

        // making it discovered
        this.nodeStatus[this.adjacencyList[sourceNodeIndex].nodeId].status = 1;
        // adding node to order list
        order.push(this.adjacencyList[sourceNodeIndex].nodeId);
        this.adjacencyList[sourceNodeIndex].connectedNodes.forEach(node => {
            // extracting data from object
            const { status, index } = this.nodeStatus[node];

            // checking if node is undiscovered
            if (!status) {
                this.DFSRecursive(index, order);
            }
        });
        //mark node as explored
        this.nodeStatus[this.adjacencyList[sourceNodeIndex].nodeId].status = 2;
    }




}
