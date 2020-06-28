export default class {
    constructor(elSelector) {
        this.$el = $(elSelector); // $el jquery对象

        this.init();
    }
    init() {
        this.render();
        this.afterMount();
        this.handler();
    }
    render() {
        
    }
    afterMount() {  //挂载完成后如果还有事情做就写在这里

    }
    handler() {
       
    }
}