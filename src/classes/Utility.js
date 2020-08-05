class Utility {
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static changeInnerHtml(toSearch, toWrite) {
        document.querySelector(toSearch).innerHTML = toWrite;
    }
}
