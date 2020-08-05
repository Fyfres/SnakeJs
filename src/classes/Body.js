class Body extends Objects {
    partPos = [0,0];
    lastPos = [0,0];
    head = false;

    constructor(property, status, visual, head) {
        super(property, status, visual);
        this.head = head;
        this.addBodyPart(this.head);
        Snake.bodyQts ++;
    }

    // Add a body part at the end of the current body.
    addBodyPart(head) {
        // If it's the Head the Defaults position are already good.
        if (head) {
            return;
        }
        // Get the last position of the last part of the Snake body as the position of the new body part.
        this.partPos = Snake.bodies[Snake.bodies.length-1].lastPos;
        this.lastPos = this.partPos;
    }

    // Move all the body.
    static moveWholeBody() {
        // Empty the case behind the head and put the head in its new position.
        Board.emptyACase(Snake.bodies[0].lastPos);
        Board.changeACaseContent(Snake.bodies[0].partPos, Snake.bodies[0]);

        for (let i = 1; i < Snake.bodies.length; i++) {
            // The last position of a body part become the current part position
            // and the new position of a body part is at the last position of the part in front of it.
            Snake.bodies[i].lastPos = Snake.bodies[i].partPos;
            Snake.bodies[i].partPos = Snake.bodies[i-1].lastPos;
            // The case behind the body part is emptied and it's new position is set to the good case of the board.
            Board.emptyACase(Snake.bodies[i].lastPos);
            Board.changeACaseContent(Snake.bodies[i].partPos, Snake.bodies[i])
        }
    }

}
