class PlayerStatus {
    static currentGameStatus = "unknown";
    static gamesPlayed = 0;
    static winnedGames = 0;
    static currentRecoltedBonusCount = 0;
    static currentRecoltedAppleCount = 0;
    static currentGameTotalApple = 0;
    static currentGameTotalBoost = 0;


    // Change the display of the stats on the page.
    static initPage() {
        Utility.changeInnerHtml("#gamePlayed", PlayerStatus.gamesPlayed);
        Utility.changeInnerHtml("#gameWin", PlayerStatus.winnedGames);
    }

    static setCurrentGameStatus(status) {
        if (status != "lose" && status != "win") {
            Board.initBoard();
            return console.error("Error while setting the party status.\nReceived : \"" + status + "\".");
        }
        PlayerStatus.currentGameStatus = status;
    }

    static resetForNewGame(){
        PlayerStatus.currentGameStatus = "unknown";
        PlayerStatus.currentRecoltedBonusCount = 0;
        PlayerStatus.currentRecoltedAppleCount = 0;
        PlayerStatus.currentGameTotalApple = 0;
        PlayerStatus.currentGameTotalBoost = 0;
    }

    // Test if the game is won add the stats, open the modal and reset the Board. Return true if game won.
    static testWin() {
        if (PlayerStatus.currentRecoltedAppleCount >= PlayerStatus.currentGameTotalApple) {
            PlayerStatus.gamesPlayed++;
            PlayerStatus.winnedGames++;
            PlayerStatus.setCurrentGameStatus("win");
            PlayerStatus.openModal();
            Board.emptyAllBoard();
            document.querySelector("#gameStarter").removeAttribute("disabled");
            return true;
        }
    }

    // Test if the game is lost add the stats, open the modal and reset the Board
    static lose() {
        PlayerStatus.gamesPlayed++;
        PlayerStatus.setCurrentGameStatus("lose");
        PlayerStatus.openModal();
        Board.emptyAllBoard();
        document.querySelector("#gameStarter").removeAttribute("disabled");
    }


    // Test the game status and change the html of the modal before displaying it. If the game status isn't standard create an error.
    static openModal() {
        if (PlayerStatus.currentGameStatus === "win") {
            Utility.changeInnerHtml("#modalTitle", "Gagné !");
            Utility.changeInnerHtml("#modalDesc", "Bravo vous avez gagné votre partie de Snake!\nVous pouvez recommencez une partie au même niveau ou peut-être augmenter la difficulté ?");
        } else if (PlayerStatus.currentGameStatus === "lose") {
            Utility.changeInnerHtml("#modalTitle", "Perdu !");
            Utility.changeInnerHtml("#modalDesc", "Dommage vous avez perdu votre partie de Snake!\nVous pouvez recommencez une partie au même niveau ou peut-être diminuer la difficulté ?");
        } else {
            console.error("Error while checking the game status.");
            return;
        }
        $("#modalGameEnd").modal("show");
    }
}
