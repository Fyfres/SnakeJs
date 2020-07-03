class Body extends Objects {
    partPos = [0,0];
    lastPos = [0,1];
    head = false;

    constructor(property, status, visual) {
        super(property, status, visual);
    }

    findPosToNewBodyPart() {
        let lastSnakePartPos = AbstractSnake.bodies[AbstractSnake.bodies.length].partPos;
        let lastSnakePartLastPos = AbstractSnake.bodies[AbstractSnake.bodies.length].lastPos;
    }

}
