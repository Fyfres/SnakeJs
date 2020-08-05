class AbstractSnake {
    static bodyQts = 0;
    static bodies = [];
    static status = false;
    static snakeDirection = "right";

    static init() {
        AbstractSnake.bodies = [];
        AbstractSnake.bodies.push(new Body("SnakeHead", true, "SnakeHead", true));
        AbstractSnake.direction();
        let tempEvent = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
                AbstractSnake.step();
                window.removeEventListener("keydown", tempEvent);
            }
        };
        window.removeEventListener("keydown", tempEvent);
        window.addEventListener("keydown", tempEvent);
        AbstractSnake.direction();
    }

    static direction() {
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") {
                AbstractSnake.snakeDirection = "right";
            } else if (e.key === "ArrowLeft") {
                AbstractSnake.snakeDirection = "left";
            } else if (e.key === "ArrowUp") {
                AbstractSnake.snakeDirection = "up";
            } else if (e.key === "ArrowDown") {
                AbstractSnake.snakeDirection = "down";
            }
        })
    }

    static step(){

        let pos = AbstractSnake.bodies[0].partPos;
        AbstractSnake.bodies[0].lastPos = AbstractSnake.bodies[0].partPos;
        if (AbstractSnake.snakeDirection === "right") {
            if (Board.board[pos[0]] != undefined && Board.board[pos[0]][pos[1] + 1] != undefined && !(Board.board[pos[0]][pos[1] + 1] instanceof Body)) {
                AbstractSnake.bodies[0].partPos = [pos[0], pos[1] + 1];
            } else {
                PlayerStatus.lose();
                return
            }
        } else if (AbstractSnake.snakeDirection === "left") {
            if (Board.board[pos[0]] != undefined && Board.board[pos[0]][pos[1] - 1] != undefined && !(Board.board[pos[0]][pos[1] - 1] instanceof Body)) {
                AbstractSnake.bodies[0].partPos = [pos[0], pos[1] - 1];
            } else {
                PlayerStatus.lose();
                return
            }
        } else if (AbstractSnake.snakeDirection === "up") {
            if (Board.board[pos[0] - 1] != undefined && Board.board[pos[0] - 1][pos[1]] != undefined && !(Board.board[pos[0] - 1][pos[1]] instanceof Body)) {
                AbstractSnake.bodies[0].partPos = [pos[0] - 1, pos[1]];
            } else {
                PlayerStatus.lose();
                return
            }
        } else if (AbstractSnake.snakeDirection === "down") {
            if (Board.board[pos[0] + 1] != undefined && Board.board[pos[0] + 1][pos[1]] != undefined && !(Board.board[pos[0] + 1][pos[1]] instanceof Body)) {
                AbstractSnake.bodies[0].partPos = [pos[0] + 1, pos[1]];
            } else {
                PlayerStatus.lose();
                return
            }
        } else {
            console.error("Error while reading direction of the Snake.\nCurrent direction : \"" + AbstractSnake.snakeDirection + "\".");
            Board.initBoard();
            return;
        }
        let newPos = Board.board[AbstractSnake.bodies[0].partPos[0]][AbstractSnake.bodies[0].partPos[1]];
        if (newPos.property === "lootable") {
            if (newPos instanceof RecoltObject) {
                console.log(newPos);
                Board.emptyACase(AbstractSnake.bodies[0].partPos);
                let body = new Body("SnakeBody", true, "SnakeBody", false);
                AbstractSnake.bodies.push(body);
                AbstractSnake.bodyQts++;
                PlayerStatus.currentRecoltedAppleCount++;
                Board.changeACaseContent(AbstractSnake.bodies[AbstractSnake.bodies.length-1].partPos, AbstractSnake.bodies[AbstractSnake.bodies.length-1]);
                if(PlayerStatus.testWin()) {
                    return;
                }
            } else if (newPos instanceof Boost) {
                if (AbstractSnake.bodies.length > 1) {
                    Board.emptyACase(AbstractSnake.bodies[AbstractSnake.bodies.length-1].partPos);
                    AbstractSnake.bodies.pop();
                }
                PlayerStatus.currentRecoltedBonusCount++;
            } else {
                console.error("Error unrecognized lootable item : " + newPos);
                Board.initBoard();
                return;
            }
        }
        if (!(newPos instanceof Objects)) {
            console.error("An error occured a case isn't standard.\n" + newPos);
            Board.initBoard();
            return;
        }
        Body.moveWholeBody();
        setTimeout(()=>{
            AbstractSnake.step();
        },800)
    }
}

//"29 mars-25 juin 2021"
