/**
 * SPT (Shortest path tree) class traverses the shortest path tree from a given source in the minimum cost, path is experimental
 */
export class SPT {
    dist: { [id: string]: number };
    parent: { [id: string]: string };
    private sptSet: { [id: string]: Boolean };

    // adjacencyList: store graph to be processed
    constructor(private adjacencyList: { nodeId: string, connectedNodes: string[] }[]) {
        this.sptSet = {};
        this.dist = {};
        this.parent = {};
        adjacencyList.forEach(({ nodeId }) => {
            this.dist[nodeId] = Number.MAX_VALUE;
            this.sptSet[nodeId] = false;
        });
    }

    private minDistance(): string {
        // Initialize min value 
        let min = Number.MAX_VALUE, min_index = "-1";

        this.adjacencyList.forEach(({ nodeId }) => {
            if (this.sptSet[nodeId] == false && this.dist[nodeId] <= min) {
                min = this.dist[nodeId];
                min_index = nodeId;
            }
        });

        return min_index;
    }

    /**
     * gets distance cost via the shortest path to the target node
     * @param {string} sourceNode 
     * @param {string} targetNode 
     * @returns {number} cost 
     */
    public getShortestPathCost(target: string): number {
        return this.dist[target];
    }

    /**
     * gets the shortest path to the target node
     * @param {string} sourceNode 
     * @param {string} targetNode 
     * @returns {string[]} path 
     */
    public getShortestPath(target: string): string[] {
        return this.getPathToTarget(target, [target]).reverse();
    }

    private getPathToTarget(target:string, path:string[]): string[] {
        if(!this.parent[target]) return path;
        else {
            path.push(this.parent[target]);
            return this.getPathToTarget(this.parent[target], path)
        }
    }

    /**
     * compiles the paths for SPT from a given source
     * @param {string} source nodeid of source
     */
    public compilePaths(source?: string): void {
        if(!source) source = this.adjacencyList[0].nodeId;
        // Distance of source vertex from itself is always 0 
        this.dist[source] = 0;

        // Find shortest path for all vertices 
        this.adjacencyList.forEach(() => {
            const u = this.minDistance();
            // Mark the picked vertex as included in SPT set 
            this.sptSet[u] = true;
            //update distance for all the adjacent vertices ie connected nodes
            this.adjacencyList.forEach((node, index) => {
                if (node.nodeId === u) {
                    this.adjacencyList[index].connectedNodes.forEach(id => {
                        if (!this.sptSet[id] && (this.dist[u] + 1) < this.dist[id]) {
                            this.dist[id] = this.dist[u] + 1;// graph has uniform weights as 1 for now
                            this.parent[id] = u;
                        }
                    });
                }
            });
        });
    }
}
