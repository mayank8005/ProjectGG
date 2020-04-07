abstract class Button {

    constructor(protected label: string) {}

    getLabel() {
        return this.label;
    }

    abstract onClickHandler(): void;

}

export default Button;
