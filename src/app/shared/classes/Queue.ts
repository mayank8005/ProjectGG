export class Queue {

    // storage structure for queue
    private store: any[] = [];

    public enqueue(item: any): void {
        this.store.push(item);
    }

    public dequeue(): any {
        return this.store.length ? this.store.shift() : null;
    }

    // return total number of items in queue
    public getItemCount(): number {
        return this.store.length;
    }

}
