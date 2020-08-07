class Board {
    static board = [];
    static lvl = 1;

    static canceled = [];

    //Launch or Relaunch the board with the choosed difficulty
    static initBoard() {
        document.querySelector("#gameStarter").setAttribute("disabled", "");
        document.querySelector("#gameStarter2").setAttribute("disabled", "");
        PlayerStatus.resetForNewGame();
        PlayerStatus.initPage();
        Board.board = [];
        Board.lvl = document.getElementById("difficulty").value;

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
                document.getElementById("r"+i).innerHTML = document.getElementById("r"+i).innerHTML + "<td id='r"+ i + "l" + j + "' >" + (Board.board[i][j].visual != "empty" ? "<img src='src/img/" + Board.board[i][j].visual + ".png' class='w-100'></img>" : "") + "</td>";
            }
        }
        // If by any chance there is no apple on the board relaunch the Board initialization
        if(PlayerStatus.currentGameTotalApple < Board.lvl) {
            Board.initBoard(Board.lvl);
            return;
        }
        Snake.init();
    }

    static initBoardInfinite() {
        document.querySelector("#gameStarter").setAttribute("disabled", "");
        document.querySelector("#gameStarter2").setAttribute("disabled", "");
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
        let intOne = Utility.getRandomInt(9);
        let intTwo = Utility.getRandomInt(9);

        if (start && intOne ===  0 && intTwo === 0) {
            Board.canceled.push([intOne,intTwo]);
            Board.InfiniteAddApple();
            return
        }

        for (let i = 0; i < Board.canceled.length; i++) {
            if (Board.canceled[i][0] === intOne && Board.canceled[i][1] === intTwo) {
                Board.InfiniteAddApple();
                return
            }
        }
        if (Board.board[intOne][intTwo].property === "") {
            Board.canceled = [];
            Board.changeACaseContent([intOne, intTwo], new RecoltObject("lootable", true));
            return
        } else {
            Board.canceled.push([intOne,intTwo]);
            Board.InfiniteAddApple();
            return
        }
    }

    static saveForReplay() {
        let board = JSON.parse(JSON.stringify(Board.board));
        console.log(board);
        console.log(board);
        PlayerStatus.replay.push({infinite: PlayerStatus.infiniteGame, board: board, speed: PlayerStatus.infiniteGame ? Snake.infiniteSpeed : PlayerStatus.winstreak});
    }

    static showReplay() {
        document.querySelector("#gameStarter").setAttribute("disabled", "");
        document.querySelector("#gameStarter2").setAttribute("disabled", "");
        document.querySelector("#replayStarter").setAttribute("disabled", "");
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

        setTimeout(() => {
            if (PlayerStatus.replay.length-1 > PlayerStatus.replayState) {
                PlayerStatus.replayState++;
                Board.showReplay();
            } else {
                document.querySelector("#gameStarter").removeAttribute("disabled");
                document.querySelector("#gameStarter2").removeAttribute("disabled");
                document.querySelector("#replayStarter").removeAttribute("disabled");
                PlayerStatus.initPage();
                Board.emptyAllBoard();
            }
        }, PlayerStatus.replay[PlayerStatus.replayState].infinite ? (PlayerStatus.replay[PlayerStatus.replayState].speed) : (500 - (PlayerStatus.replay[PlayerStatus.replayState].speed > 24 ? 24 * 20 : PlayerStatus.replay[PlayerStatus.replayState].speed * 20)))
    }
}
