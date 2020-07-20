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

    addBodyPart(head) {
        // If it's the Head the Defaults position are already good
        if (head) {
            return;
        }
        // Get the last position of the last part of the Snake body as the position of the new body part
        this.partPos = AbstractSnake.bodies[AbstractSnake.bodies.length].lastPos;
        this.lastPos = this.partPos;
    }

}
