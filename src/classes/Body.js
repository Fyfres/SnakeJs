class Body extends Objects {
    partPos = [0,0];
    lastPos = [0,0];
    head = false;

    constructor(property, status, visual, head) {
        super(property, status, visual);
        this.head = head;
        this.addBodyPart(this.head);
        AbstractSnake.bodyQts ++;
    }

    // Add a body part at the end of the current body.
    addBodyPart(head) {
        // If it's the Head the Defaults position are already good.
        if (head) {
            return;
        }
        // Get the last position of the last part of the Snake body as the position of the new body part.
        this.partPos = AbstractSnake.bodies[AbstractSnake.bodies.length-1].lastPos;
        this.lastPos = this.partPos;
    }

    // Move all the body.
    static moveWholeBody() {
        // Empty the case behind the head and put the head in its new position.
        Board.emptyACase(AbstractSnake.bodies[0].lastPos);
        Board.changeACaseContent(AbstractSnake.bodies[0].partPos, AbstractSnake.bodies[0]);

        for (let i = 1; i < AbstractSnake.bodies.length; i++) {
            // The last position of a body part become the current part position
            // and the new position of a body part is at the last position of the part in front of it.
            AbstractSnake.bodies[i].lastPos = AbstractSnake.bodies[i].partPos;
            AbstractSnake.bodies[i].partPos = AbstractSnake.bodies[i-1].lastPos;
            // The case behind the body part is emptied and it's new position is set to the good case of the board.
            Board.emptyACase(AbstractSnake.bodies[i].lastPos);
            Board.changeACaseContent(AbstractSnake.bodies[i].partPos, AbstractSnake.bodies[i])
        }
    }

}
