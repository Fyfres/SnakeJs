class Board {
    static board = [];
    static lvl = 1;

    static initBoard() {
        this.lvl = document.getElementById("difficulty").value;
        AbstractSnake.bodies.push(new Body(true));

        let apple = 0;
        let boost = 0;

        for (let i = 0; i < 10; i++) {
            this.board.push([]);
        }
        document.getElementsByTagName("table")[0].innerHTML = "<tbody></tbody>";
        for (let i = 0; i < 10; i++) {
            document.getElementsByTagName("tbody")[0].innerHTML = document.getElementsByTagName("tbody")[0].innerHTML + "<tr id='r"+i+"'></tr>";
            for (let j = 0; j < 10; j++) {
                let rdmNbr = Utility.getRandomInt(20);
                if( i == 0 && j == 0) {
                    this.board[i][j] = new Objects("empty", false, "empty");
                } else if(rdmNbr == 1 && this.lvl > apple) {
                    this.board[i][j] = new RecoltObject("lootable", true, "apple");
                    apple++;
                } else if(rdmNbr == 2 && boost < apple && this.lvl > 1) {
                    this.board[i][j] = new Boost("lootable", true, "boost");
                    boost++;
                } else {
                    this.board[i][j] = new Objects("empty", false, "empty");
                }
                document.getElementById("r"+i).innerHTML = document.getElementById("r"+i).innerHTML + "<td id='r"+ i + "l" + j + "' class='" + this.board[i][j].visual + "'>" + (this.board[i][j].visual != "empty" ? this.board[i][j].visual : "") + "</td>";
            }
        }
        if(apple < 1) {
            this.initBoard(lvl);
            return;
        }
        console.log(this.board);
    }
}
