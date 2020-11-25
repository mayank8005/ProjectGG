import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphStoreService } from 'src/app/services/graph-store.service';

@Component({
    selector: 'app-algo-options',
    templateUrl: 'algo-options.component.html',
    styleUrls: ['algo-options.component.css']
})
export class AlgoOptionsComponent {

    options;

    // variable to hold the value of select 
    selectedValueStart;
    selectedValueEnd;

    constructor(private graphStoreService: GraphStoreService) {
        this.options = graphStoreService.getAllNodes();
        this.selectedValueStart = this.options[0];
        this.selectedValueEnd = this.options[this.options.length - 1];
    }

    ngOnInit() {

        const nodesReceiver: Observable<{nodeId: string, connectedNodes: string[]}[]> = GraphStoreService.getNodesReciever();

        nodesReceiver.subscribe((nodes) => {
            this.options = nodes;
            this.selectedValueStart = nodes[0].nodeId;
            this.selectedValueEnd = nodes[nodes.length - 1].nodeId;
            this.onChange();
        });
    }

    onChange() {
        GraphStoreService.triggerSelectedOptionsController({start: this.selectedValueStart, end:this.selectedValueEnd});
    }
}
