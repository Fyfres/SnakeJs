class Board {
    static board = [];
    static lvl = 1;

    //Launch or Relaunch the board with the choosed difficulty
    static initBoard() {
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
        if(PlayerStatus.currentGameTotalApple < 1) {
            Board.initBoard(Board.lvl);
            return;
        }
        AbstractSnake.init();
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

    // Change the value of a case in the board
    static changeACaseContent(pos,object) {
        Board.board[pos[0]][pos[1]] = object;
        document.getElementById("r" + pos[0] + "l" + pos[1]).innerHTML = (Board.board[pos[0]][pos[1]].visual != "empty" ? "<img src='src/img/" + Board.board[pos[0]][pos[1]].visual + ".png' class='w-100'></img>" : "");
    }
}
