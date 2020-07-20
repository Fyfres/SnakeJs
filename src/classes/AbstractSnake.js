class AbstractSnake {
    static bodyQts = 0;
    static bodies = [];
    static status = false;
    static direction = "right";
    static initStep = false;

    static init() {
        this.bodies.push(new Body("SnakeHead", true, "SnakeHead", true));
        this.direction();
    }

    static direction() {
        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowRight") {
                this.direction = "right";
            } else if (e.key == "ArrowLeft") {
                this.direction = "left";
            } else if (e.key == "ArrowUp") {
                this.direction = "up";
            } else if (e.key == "ArrowDown") {
                this.direction = "down";
            }
        })
    }

    static step(){
        if(AbstractSnake.initStep) {
            return;
        }
        setTimeout(()=>{
            
        },500)
    }
}

"29 mars-25 juin 2021";
