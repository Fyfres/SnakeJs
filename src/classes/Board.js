class Board {
    static board = [];
    static lvl = 1;

    //Launch or Relaunch the board with the setted difficulty
    static initBoard() {
        this.lvl = document.getElementById("difficulty").value;

        let apple = 0;
        let boost = 0;

        // Initializing 2D Array
        for (let i = 0; i < 10; i++) {
            this.board.push([]);
        }
        // Reinitialize the Board
        document.getElementsByTagName("table")[0].innerHTML = "<tbody></tbody>";
        for (let i = 0; i < 10; i++) {
            // Create a new row
            document.getElementsByTagName("tbody")[0].innerHTML = document.getElementsByTagName("tbody")[0].innerHTML + "<tr id='r"+i+"'></tr>";
            for (let j = 0; j < 10; j++) {
                let temp = Board.randomCase(apple,boost,i,j);
                apple = temp.apple;
                boost = temp.boost;
                document.getElementById("r"+i).innerHTML = document.getElementById("r"+i).innerHTML + "<td id='r"+ i + "l" + j + "' class='" + this.board[i][j].visual + "'>" + (this.board[i][j].visual != "empty" ? this.board[i][j].visual : "") + "</td>";
            }
        }
        // If by any chance there is no apple on the board relaunch the Board initialization
        if(apple < 1) {
            this.initBoard(Board.lvl);
            return;
        }
        console.log(this.board);
        AbstractSnake.init();
    }


    static randomCase(apple, boost, i ,j) {
        // Randomize a number to test
        let rdmNbr = Utility.getRandomInt(20);
        // The first case will always be empty to let the snake spawn
        if( i == 0 && j == 0) {
            this.board[i][j] = new Objects("empty", false, "empty");
            // The difficulty tell how much apple we can have it can still be lower than it
        } else if(rdmNbr == 1 && this.lvl > apple) {
            this.board[i][j] = new RecoltObject("lootable", true, "apple");
            apple++;
            // There can't be more boost than apple on the board
        } else if(rdmNbr == 2 && boost < apple && this.lvl > 1) {
            this.board[i][j] = new Boost("lootable", true, "boost");
            boost++;
            // By default the case will be empty
        } else {
            this.board[i][j] = new Objects("empty", false, "empty");
        }
        return {boost:boost, apple:apple};
    }
}
