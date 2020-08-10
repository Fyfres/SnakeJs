class PlayerStatus {

    //general
    static currentGameStatus = "unknown";
    static totalGamesPlayed = 0;
    static currentRecoltedBonusCount = 0;
    static currentRecoltedAppleCount = 0;
    static replay = [];
    static replayState = 0;

    //normal
    static normalGamesPlayed = 0;
    static winnedGames = 0;
    static winstreak = 0;
    static bestWinStreak = 0;
    static currentGameTotalApple = 0;
    static currentGameTotalBoost = 0;

    //infinite
    static infiniteGame = false;
    static infiniteGamesPlayed = 0;
    static infiniteMaxRecoltedApple = 0;
    static infiniteTotalRecoltedApple = 0;


    // Change the display of the stats.
    static initPage() {
        Utility.changeInnerHtml("#totalGamesPlayed", PlayerStatus.totalGamesPlayed.toString());
        Utility.changeInnerHtml("#normalGamesPlayed", PlayerStatus.normalGamesPlayed.toString());
        Utility.changeInnerHtml("#winnedGames", PlayerStatus.winnedGames.toString());
        Utility.changeInnerHtml("#winStreak", PlayerStatus.winstreak.toString());
        Utility.changeInnerHtml("#bestWinStreak", PlayerStatus.bestWinStreak.toString());
        Utility.changeInnerHtml("#infiniteGamesPlayed", PlayerStatus.infiniteGamesPlayed.toString());
        Utility.changeInnerHtml("#infiniteMaxRecoltedApple", PlayerStatus.infiniteMaxRecoltedApple.toString());
        Utility.changeInnerHtml("#infiniteTotalRecoltedApple", PlayerStatus.infiniteTotalRecoltedApple.toString());
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
        PlayerStatus.replay = [];
        PlayerStatus.replayState = 0;
    }

    // Test if the game is won add the stats, open the modal and reset the Board. Return true if game won.
    static testWin() {
        if (PlayerStatus.currentRecoltedAppleCount >= PlayerStatus.currentGameTotalApple) {
            PlayerStatus.totalGamesPlayed++;
            PlayerStatus.normalGamesPlayed++;
            PlayerStatus.winnedGames++;
            PlayerStatus.winstreak++;
            PlayerStatus.bestWinStreak = PlayerStatus.winstreak > PlayerStatus.bestWinStreak ? PlayerStatus.winstreak : PlayerStatus.bestWinStreak;
            PlayerStatus.setCurrentGameStatus("win");
            PlayerStatus.initPage();
            Board.emptyAllBoard();
            document.querySelectorAll(".gameStarter").forEach((elt) => {
                elt.removeAttribute("disabled");
                elt.classList.remove("disabled");
            });
            PlayerStatus.openEndModal();
            PlayerStatus.setAllCookies();
            return true;
        }
    }

    // Test if the game is lost add the stats, open the modal and reset what needs to be
    static lose() {
        PlayerStatus.totalGamesPlayed++;
        PlayerStatus.infiniteGame ? PlayerStatus.infiniteGamesPlayed++ : PlayerStatus.normalGamesPlayed++;
        PlayerStatus.winstreak = 0;
        PlayerStatus.setCurrentGameStatus("lose");
        PlayerStatus.initPage();
        Snake.infiniteSpeed = 500;
        Board.emptyAllBoard();
        document.querySelectorAll(".gameStarter").forEach((elt) => {
            elt.removeAttribute("disabled");
            elt.classList.remove("disabled");
        });
        PlayerStatus.openEndModal();
        PlayerStatus.setAllCookies();
    }


    // Test the game status and change the html of the modal before displaying it. If the game status isn't standard create an error.
    static openEndModal() {
        if (PlayerStatus.currentGameStatus === "win") {
            Utility.changeInnerHtml("#modalTitle", "Gagné !");
            Utility.changeInnerHtml("#modalDesc", "Bravo vous avez gagné votre partie de Snake!\nVous pouvez recommencez une partie au même niveau ou peut-être augmenter la difficulté ?");
        } else if (PlayerStatus.currentGameStatus === "lose") {
            if (!PlayerStatus.infiniteGame) {
                Utility.changeInnerHtml("#modalTitle", "Perdu !");
                Utility.changeInnerHtml("#modalDesc", "Dommage vous avez perdu votre partie de Snake!\nVous pouvez recommencez une partie au même niveau ou peut-être diminuer la difficulté ?");
            } else {
                Utility.changeInnerHtml("#modalInfiniteTitle", "Fini !");
                Utility.changeInnerHtml("#modalInfiniteDesc", "Votre partie de Snake est terminé !\nVous avez récolté " + PlayerStatus.currentRecoltedAppleCount + " pomme" + (PlayerStatus.currentRecoltedAppleCount > 1 ? "s" : "") + " bravo à vous !");
            }

        } else {
            console.error("Error while checking the game status.");
            return;
        }
        if (!PlayerStatus.infiniteGame) {
            $("#modalGameEnd").modal("show");
        } else {
            $("#modalInfiniteGameEnd").modal("show");
        }
    }

    static setAllCookies() {
        Utility.setCookie("totalGamesPlayed", PlayerStatus.totalGamesPlayed);
        Utility.setCookie("replay", PlayerStatus.replay);
        Utility.setCookie("normalGamesPlayed", PlayerStatus.normalGamesPlayed);
        Utility.setCookie("winnedGames", PlayerStatus.winnedGames);
        Utility.setCookie("winstreak", PlayerStatus.winstreak);
        Utility.setCookie("bestWinStreak", PlayerStatus.bestWinStreak);
        Utility.setCookie("infiniteGamesPlayed", PlayerStatus.infiniteGamesPlayed);
        Utility.setCookie("infiniteMaxRecoltedApple", PlayerStatus.infiniteMaxRecoltedApple);
        Utility.setCookie("infiniteTotalRecoltedApple", PlayerStatus.infiniteTotalRecoltedApple);
    }

    static getAllCookies() {
        PlayerStatus.totalGamesPlayed = Utility.getCookie("totalGamesPlayed");
        PlayerStatus.replay = Utility.getCookie("replay");
        PlayerStatus.normalGamesPlayed = Utility.getCookie("normalGamesPlayed");
        PlayerStatus.winnedGames = Utility.getCookie("winnedGames");
        PlayerStatus.winstreak = Utility.getCookie("winstreak");
        PlayerStatus.bestWinStreak = Utility.getCookie("bestWinStreak");
        PlayerStatus.infiniteGamesPlayed = Utility.getCookie("infiniteGamesPlayed");
        PlayerStatus.infiniteMaxRecoltedApple = Utility.getCookie("infiniteMaxRecoltedApple");
        PlayerStatus.infiniteTotalRecoltedApple = Utility.getCookie("infiniteTotalRecoltedApple");
    }
}
