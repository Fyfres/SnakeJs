class Board {
    static board = [];
    static lvl = 1;

    static canceled = [];

    // Launch or Relaunch the board with the choosed difficulty for normal game
    static initBoard() {
        // State the type of the game
        PlayerStatus.infiniteGame = false;

        Utility.modalHide();
        PlayerStatus.resetForNewGame();
        PlayerStatus.initPage();

        // Reset the board
        Board.board = [];
        // Get the difficulty
        Board.lvl = parseInt(document.getElementById("difficulty").value);

        // Initializing 2D Array
        for (let i = 0; i < 10; i++) {
            Board.board.push([]);
        }
        // Reinitialize the Board
        document.getElementsByTagName("table")[0].innerHTML = "<tbody></tbody>";
        for (let i = 0; i < 10; i++) {
            // Create a new row
            document.getElementsByTagName("tbody")[0].innerHTML = document.getElementsByTagName("tbody")[0].innerHTML + "<tr id='r"+i+"'></tr>";
            for (let j = 0; j < 10; j++) {
                Board.randomCase(i,j);
                // Create a case and put his content in
                document.getElementById("r"+i).innerHTML = document.getElementById("r"+i).innerHTML + "<td id='r"+ i + "l" + j + "' >" + (Board.board[i][j].visual != "empty" ? "<img src='src/img/" + Board.board[i][j].visual + ".png' class='w-100'></img>" : "") + "</td>";
            }
        }
        // If by any chance there is not enough apple on the board relaunch the Board initialization
        if(PlayerStatus.currentGameTotalApple < Board.lvl) {
            Board.initBoard(Board.lvl);
            return;
        }
        Snake.init();
    }

    // Launch or Relaunch the board for Infinite game
    static initBoardInfinite() {
        PlayerStatus.infiniteGame = true;
        Utility.modalHide();
        PlayerStatus.resetForNewGame();
        PlayerStatus.initPage();
        Board.board = [];

        // Initializing 2D Array
        for (let i = 0; i < 10; i++) {
            Board.board.push([]);
        }
        // Reinitialize the Board
        document.getElementsByTagName("table")[0].innerHTML = "<tbody></tbody>";
        for (let i = 0; i < 10; i++) {
            // Create a new row
            document.getElementsByTagName("tbody")[0].innerHTML = document.getElementsByTagName("tbody")[0].innerHTML + "<tr id='r"+i+"'></tr>";
            for (let j = 0; j < 10; j++) {
                Board.board[i][j] = new Objects("", false, "empty");
                document.getElementById("r"+i).innerHTML = document.getElementById("r"+i).innerHTML + "<td id='r"+ i + "l" + j + "' >" + (Board.board[i][j].visual != "empty" ? "<img src='src/img/" + Board.board[i][j].visual + ".png' class='w-100'></img>" : "") + "</td>";
            }
        }

        Board.InfiniteAddApple(true);

        Snake.init();
    }


    static randomCase(i ,j) {
        // Randomize a number to test
        let rdmNbr = Utility.getRandomInt(20);
        // The first case will always be empty to let the snake spawn
        if( i === 0 && j === 0) {
            Board.board[i][j] = new Objects("", false, "empty");
            // The difficulty tell how much apple we can have it can still be lower than it
        } else if(rdmNbr === 1 && Board.lvl > PlayerStatus.currentGameTotalApple) {
            Board.board[i][j] = new RecoltObject("lootable", true);
            PlayerStatus.currentGameTotalApple++;
            // There can't be more boost than apple on the board
        } else if(rdmNbr === 2 && PlayerStatus.currentGameTotalBoost < PlayerStatus.currentGameTotalApple-1 && this.lvl > 1) {
            Board.board[i][j] = new Boost("lootable", true);
            PlayerStatus.currentGameTotalBoost++;
            // By default the case will be empty
        } else {
            Board.board[i][j] = new Objects("", false, "empty");
        }
    }

    // Change the value of a case in the board to empty
    static emptyACase(pos) {
        Board.changeACaseContent(pos, new Objects("", false, "empty"));
    }

    static emptyAllBoard() {
        for (let i = 0; i < Board.board.length; i++) {
            for (let j = 0; j < Board.board[i].length; j++) {
                Board.emptyACase([i,j]);
            }
        }
    }

    // Change the value of a case in the board
    static changeACaseContent(pos,object) {
        if(pos[0] > 9 || pos[1] > 9) {
            console.error("An error occurred while changing the content of a case the given position were off the Board. \n" + pos);
        }
        Board.board[pos[0]][pos[1]] = object;
        document.getElementById("r" + pos[0] + "l" + pos[1]).innerHTML = (Board.board[pos[0]][pos[1]].visual != "empty" ? "<img src='src/img/" + Board.board[pos[0]][pos[1]].visual + ".png' class='w-100'></img>" : "");
    }

    // Adding an apple in the board
    static InfiniteAddApple(start = false) {
        // get 2 random int for row and column
        let intOne = Utility.getRandomInt(9);
        let intTwo = Utility.getRandomInt(9);

        // If it's the start of the game the position of the apple cannot be 0,0
        if (start && intOne ===  0 && intTwo === 0) {
            Board.canceled.push([intOne,intTwo]);
            Board.InfiniteAddApple();
            return
        }

        // If the position was already denied relaunch the methods
        for (let i = 0; i < Board.canceled.length; i++) {
            if (Board.canceled[i][0] === intOne && Board.canceled[i][1] === intTwo) {
                Board.InfiniteAddApple();
                return
            }
        }

        // If the position has no problem add the apple and say that the apple of the board is now there again
        if (Board.board[intOne][intTwo].property === "") {
            Board.canceled = [];
            Board.changeACaseContent([intOne, intTwo], new RecoltObject("lootable", true));
            Snake.infiniteRecolted = false;
            return
        } else {
            Board.canceled.push([intOne,intTwo]);
            Board.InfiniteAddApple();
            return
        }
    }

    // Save the state of the game in an array
    static saveForReplay() {
        let board = JSON.parse(JSON.stringify(Board.board));
        PlayerStatus.replay.push({infinite: PlayerStatus.infiniteGame, board: board, speed: PlayerStatus.infiniteGame ? Snake.infiniteSpeed : PlayerStatus.winstreak});
    }

    // Show all the replay of the last game
    static showReplay() {
        Utility.modalHide();

        // If no replay tell it to the user
        if(PlayerStatus.replay.length <= 0) {
            alert("Aucun replay sauvegardé");
            return;
        }
        // Recreate the board like it was at the moment of the game
        Board.board = PlayerStatus.replay[PlayerStatus.replayState].board;

        // Reinitialize the Board
        document.getElementsByTagName("table")[0].innerHTML = "<tbody></tbody>";
        for (let i = 0; i < 10; i++) {
            // Create a new row
            document.getElementsByTagName("tbody")[0].innerHTML = document.getElementsByTagName("tbody")[0].innerHTML + "<tr id='r"+i+"'></tr>";
            for (let j = 0; j < 10; j++) {
                document.getElementById("r"+i).innerHTML = document.getElementById("r"+i).innerHTML + "<td id='r"+ i + "l" + j + "' >" + (Board.board[i][j].visual != "empty" ? "<img src='src/img/" + Board.board[i][j].visual + ".png' class='w-100'></img>" : "") + "</td>";
            }
        }

        // Change the board depending on the speed it had in the last game
        setTimeout(() => {
            // Change the state of the board to the next one like ion the last game
            // Or end the replay if there's nothing left to see
            if (PlayerStatus.replay.length-1 > PlayerStatus.replayState) {
                PlayerStatus.replayState++;
                Board.showReplay();
            } else {
                document.querySelectorAll(".gameStarter").forEach((elt) => {
                    elt.removeAttribute("disabled");
                    elt.classList.remove("disabled")
                });
                PlayerStatus.initPage();
                Board.emptyAllBoard();
            }
        }, PlayerStatus.replay[PlayerStatus.replayState].infinite ? (PlayerStatus.replay[PlayerStatus.replayState].speed) : (500 - (PlayerStatus.replay[PlayerStatus.replayState].speed > 24 ? 24 * 20 : PlayerStatus.replay[PlayerStatus.replayState].speed * 20)))
    }

    // Method to change the difficulty in a normal game
    static changeDiff(how) {
        if(how !== "more" && how !== "less") {
            console.error("An error occurred while changing the difficulty of the normal game.");
            return;
        }
        if((how === "more" && Board.lvl >= 10) || (how === "less" && Board.lvl <= 1)) {
            return;
        }
        document.getElementById("difficulty").value = how === "more" ? (Board.lvl + 1).toString() : (Board.lvl - 1).toString();
    }
}
