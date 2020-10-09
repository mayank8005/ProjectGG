import { GraphStoreService } from './graph-store.service';
describe("Service: GraphStore", ()=>{
    let service: GraphStoreService;
    beforeEach(()=>{
        service = new GraphStoreService();
    });

    afterEach(()=>{
        service = null;
    });

    it("should add new node when passed", ()=>{
        service.addNode("sampleNode");
        expect((service as any).adjacencyList).toContain({ nodeId: 'sampleNode', connectedNodes: [  ] });
    });

    it("should return all nodes when getAllNodes is called", ()=>{
        service.addNode("sampleNode");
        expect(service.getAllNodes()).toEqual(['sampleNode']);
    });

    it("should add single connection between the nodes when add connection is called with isDirected as true", ()=>{
        service.addNode("1");
        service.addNode("2");
        service.addConnection('1', '2', true);
        const retVal = [{ nodeId: '1', connectedNodes: [ '2' ]}, { nodeId: '2', connectedNodes: []}];
        expect((service as any).adjacencyList).toEqual(retVal)
    });

    it("should call proper algorithm when getAlgorithmTraversalOrder is called", ()=>{
        spyOn(service, 'getBFSTraversalOrder');
        spyOn(service, 'getDFSTraversalOrder');
        service.getAlgorithmTraversalOrder('bfs');
        expect(service.getBFSTraversalOrder).toHaveBeenCalled();  
        service.getAlgorithmTraversalOrder('dfs');
        expect(service.getDFSTraversalOrder).toHaveBeenCalled();
    });

    it("should return proper bfs traversal", ()=>{
        service.addNode("1");
        service.addNode("2");
        service.addNode("3");
        service.addNode("4");
        service.addNode("5");
        service.addConnection('1', '2', true);
        service.addConnection('2', '3', true);
        service.addConnection('2', '4', true);
        service.addConnection('1', '5', true);
        expect(service.getBFSTraversalOrder()).toEqual(['1', '2', '5', '3', '4']);
    });

    it("should return proper dfs traversal", ()=>{
        service.addNode("1");
        service.addNode("2");
        service.addNode("3");
        service.addNode("4");
        service.addNode("5");
        service.addConnection('1', '2', true);
        service.addConnection('2', '3', true);
        service.addConnection('2', '4', true);
        service.addConnection('1', '5', true);
        expect(service.getDFSTraversalOrder()).toEqual(['1', '1', '2', '3', '4', '5']);
    });

    it("should return proper SPT", ()=>{
        service.addNode("1");
        service.addNode("2");
        service.addNode("3");
        service.addNode("4");
        service.addNode("5");
        service.addConnection('1', '3', true);
        service.addConnection('3', '4', true);
        service.addConnection('4', '5', true);
        service.addConnection('1', '2', true);
        service.addConnection('2', '5', true);
        (service as any).selectedOptions = {start:'1', end:'5'};
        expect(service.getSPT()).toEqual(['1', '2', '5']);
    });

}) 