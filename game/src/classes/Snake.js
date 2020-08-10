class Snake {
    static bodyQts = 0;
    static bodies = [];
    static snakeDirection = "right";
    static infiniteRecolted = false;
    static infiniteSpeed = 500;


    static init() {
        // Reset the snake
        Snake.bodies = [];
        Snake.bodies.push(new Body("SnakeHead", true, "SnakeHead", true));


        let removeEvent = ()=> {
            // Cancel the current Listeners
            document.getElementById("left").removeEventListener("click", tempEvent2);
            document.getElementById("right").removeEventListener("click", tempEvent2);
            document.getElementById("up").removeEventListener("click", tempEvent2);
            document.getElementById("down").removeEventListener("click", tempEvent2);
            window.removeEventListener("keydown", tempEvent);
        };
        let tempEvent = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
                    // Thanks to this the screen doesn't move while pushing the arrows on the keyboard
                    e.preventDefault();

                    Snake.step();
                    removeEvent();
            }
        };
        let tempEvent2 = () => {
            Snake.step();
            removeEvent();
        };

        Snake.direction();
        removeEvent();

        // Set the listeners to start the snake movement
        document.getElementById("left").addEventListener("click", tempEvent2);
        document.getElementById("right").addEventListener("click", tempEvent2);
        document.getElementById("up").addEventListener("click", tempEvent2);
        document.getElementById("down").addEventListener("click", tempEvent2);
        window.addEventListener("keydown", tempEvent);
    }


    // Change the direction where the snake must move
    static direction() {

        // functions to change the directions depending on the key pushed or the button clicked //
        /****************************************************/
        let left = () => {
            Snake.snakeDirection = "left";
        };
        let right = () => {
            Snake.snakeDirection = "right";
        };
        let up = () => {
            Snake.snakeDirection = "up";
        };
        let down = () => {
            Snake.snakeDirection = "down";
        };
        let tempEvent = (e) => {
            if (e.key === "ArrowRight") {
                e.preventDefault();
                Snake.snakeDirection = "right";
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                Snake.snakeDirection = "left";
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                Snake.snakeDirection = "up";
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                Snake.snakeDirection = "down";
            }
        };
        /****************************************************/

        // Remove the current listeners
        document.getElementById("left").removeEventListener("click", left);
        document.getElementById("right").removeEventListener("click", right);
        document.getElementById("up").removeEventListener("click", up);
        document.getElementById("down").removeEventListener("click", down);
        window.removeEventListener("keydown", tempEvent);

        // Set the listeners
        document.getElementById("left").addEventListener("click", left);
        document.getElementById("right").addEventListener("click", right);
        document.getElementById("up").addEventListener("click", up);
        document.getElementById("down").addEventListener("click", down);
        window.addEventListener("keydown", tempEvent)
    }

    // Method to check where the snake must move and do something if there's something on the case it's going
    static step(){
        // Set the current position of the snakeHead to make it easier
        let pos = Snake.bodies[0].partPos;
        // Set the "last position" of the snakeHead to it's current position which will change once the methods is finished
        Snake.bodies[0].lastPos = Snake.bodies[0].partPos;

        // Each methods look in the direction where the snake must move
        // Then check if there's a wall or a snakeBody
        // If there is, make the player lose
        // Else Change the position of the head to one case in the good direction
        /****************************************************/
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
            PlayerStatus.lose();
            return;
        }
        /****************************************************/


        let newPos = Board.board[Snake.bodies[0].partPos[0]][Snake.bodies[0].partPos[1]];
        if (newPos.property === "lootable") {
            if (newPos instanceof RecoltObject) {
                Board.emptyACase(Snake.bodies[0].partPos);
                PlayerStatus.currentRecoltedAppleCount++;

                // Only useful for the infinite version
                /****************************************************/
                // Once the body of the snake is 30 long cut all the snake to it's Head
                if (Snake.bodies.length >= 30) {
                    for (let i = Snake.bodies.length-1; i > 0; i--) {
                        Board.emptyACase(Snake.bodies[i].partPos);
                        Snake.bodies.pop();
                        Snake.bodyQts--;
                    }
                }

                if (PlayerStatus.infiniteGame) {
                    // Say that the snake has recolted the only apple
                    Snake.infiniteRecolted = true;
                    // Change the stats
                    PlayerStatus.infiniteTotalRecoltedApple++;
                    PlayerStatus.currentRecoltedAppleCount > PlayerStatus.infiniteMaxRecoltedApple ? PlayerStatus.infiniteMaxRecoltedApple = PlayerStatus.currentRecoltedAppleCount : PlayerStatus.infiniteMaxRecoltedApple = PlayerStatus.infiniteMaxRecoltedApple;
                }
                /****************************************************/

                // Add a new body part
                let body = new Body("SnakeBody", true, "SnakeBody", false);
                Snake.bodies.push(body);
                Snake.bodyQts++;

                Board.changeACaseContent(Snake.bodies[Snake.bodies.length-1].partPos, Snake.bodies[Snake.bodies.length-1]);
            } else if (newPos instanceof Boost) {
                // Cut the last body part if the snake isn't just a head
                if (Snake.bodies.length > 1) {
                    Board.emptyACase(Snake.bodies[Snake.bodies.length-1].partPos);
                    Snake.bodies.pop();
                }
                PlayerStatus.currentRecoltedBonusCount++;
            } else {
                console.error("Error unrecognized lootable item : " + newPos);
                PlayerStatus.lose();
                return;
            }
        }
        if (!(newPos instanceof Objects)) {
            console.error("An error occured a case isn't standard.\n" + newPos);
            PlayerStatus.lose();
            return;
        }
        // Test if it's a normal game if the player has win
        if(!PlayerStatus.infiniteGame && PlayerStatus.testWin()) {
            return;
        }

        Body.moveWholeBody();


        if (Snake.infiniteRecolted) {
            // Add a new apple
            Board.InfiniteAddApple();
            // Change the speed by 3%
            Snake.infiniteSpeed *= 0.97;
        }

        Board.saveForReplay();

        // Relaunch the movement depending on the speed the snake must move
        setTimeout(()=>{
            Snake.step();
        },(PlayerStatus.infiniteGame ? (Snake.infiniteSpeed) : (500 - (PlayerStatus.winstreak > 24 ? 24 * 20 : PlayerStatus.winstreak * 20))))
    }
}

//"29 mars-25 juin 2021"
