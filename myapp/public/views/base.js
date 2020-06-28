
export default class {
    constructor(elSelector) {
        this.$el = $(elSelector);
        this.init();
    }
    init() {
        this.render();
        this.afterMount();
        this.handler();
    }
    render() {
    }
    afterMount() {
    }
    handler() {
    }

}