export class Queue {

    // storage structure for queue
    private store: any[] = [];
    // store no of item present in queue
    private itemCount = 0;

    public enqueue(item: any): void {
        this.itemCount += 1;
        this.store.push(item);
    }

    public dequeue(): any {
        this.itemCount -= 1;
        return this.store.length ? this.store.shift() : null;
    }

    // return total number of items in queue
    public getItemCount(): number {
        return this.itemCount;
    }

}
