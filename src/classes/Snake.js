class Snake {
    static bodyQts = 0;
    static bodies = [];
    static snakeDirection = "right";

    static init() {
        Snake.bodies = [];
        Snake.bodies.push(new Body("SnakeHead", true, "SnakeHead", true));
        let tempEvent = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
                    Snake.step();
                window.removeEventListener("keydown", tempEvent);
            }
        };
        Snake.direction();
        window.removeEventListener("keydown", tempEvent);
        window.addEventListener("keydown", tempEvent);
    }

    static direction() {
        let tempEvent = (e) => {
            if (e.key === "ArrowRight") {
                Snake.snakeDirection = "right";
            } else if (e.key === "ArrowLeft") {
                Snake.snakeDirection = "left";
            } else if (e.key === "ArrowUp") {
                Snake.snakeDirection = "up";
            } else if (e.key === "ArrowDown") {
                Snake.snakeDirection = "down";
            }
        };
        window.removeEventListener("keydown", tempEvent);
        window.addEventListener("keydown", tempEvent)
    }

    static step(){

        let pos = Snake.bodies[0].partPos;
        Snake.bodies[0].lastPos = Snake.bodies[0].partPos;
        if (Snake.snakeDirection === "right") {
            if (Board.board[pos[0]] != undefined && Board.board[pos[0]][pos[1] + 1] != undefined && !(Board.board[pos[0]][pos[1] + 1] instanceof Body)) {
                Snake.bodies[0].partPos = [pos[0], pos[1] + 1];
            } else {
                PlayerStatus.lose();
                return
            }
        } else if (Snake.snakeDirection === "left") {
            if (Board.board[pos[0]] != undefined && Board.board[pos[0]][pos[1] - 1] != undefined && !(Board.board[pos[0]][pos[1] - 1] instanceof Body)) {
                Snake.bodies[0].partPos = [pos[0], pos[1] - 1];
            } else {
                PlayerStatus.lose();
                return
            }
        } else if (Snake.snakeDirection === "up") {
            if (Board.board[pos[0] - 1] != undefined && Board.board[pos[0] - 1][pos[1]] != undefined && !(Board.board[pos[0] - 1][pos[1]] instanceof Body)) {
                Snake.bodies[0].partPos = [pos[0] - 1, pos[1]];
            } else {
                PlayerStatus.lose();
                return
            }
        } else if (Snake.snakeDirection === "down") {
            if (Board.board[pos[0] + 1] != undefined && Board.board[pos[0] + 1][pos[1]] != undefined && !(Board.board[pos[0] + 1][pos[1]] instanceof Body)) {
                Snake.bodies[0].partPos = [pos[0] + 1, pos[1]];
            } else {
                PlayerStatus.lose();
                return
            }
        } else {
            console.error("Error while reading direction of the Snake.\nCurrent direction : \"" + Snake.snakeDirection + "\".");
            Board.initBoard();
            return;
        }
        let newPos = Board.board[Snake.bodies[0].partPos[0]][Snake.bodies[0].partPos[1]];
        if (newPos.property === "lootable") {
            if (newPos instanceof RecoltObject) {
                console.log(newPos);
                Board.emptyACase(Snake.bodies[0].partPos);
                let body = new Body("SnakeBody", true, "SnakeBody", false);
                Snake.bodies.push(body);
                Snake.bodyQts++;
                PlayerStatus.currentRecoltedAppleCount++;
                Board.changeACaseContent(Snake.bodies[Snake.bodies.length-1].partPos, Snake.bodies[Snake.bodies.length-1]);
                if(PlayerStatus.testWin()) {
                    return;
                }
            } else if (newPos instanceof Boost) {
                if (Snake.bodies.length > 1) {
                    Board.emptyACase(Snake.bodies[Snake.bodies.length-1].partPos);
                    Snake.bodies.pop();
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
            Snake.step();
        },800)
    }
}

//"29 mars-25 juin 2021"
