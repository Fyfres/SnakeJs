class Utility {
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static changeInnerHtml(toSearch, toWrite) {
        document.querySelector(toSearch).innerHTML = toWrite;
    }

    static modalHide() {
        document.querySelectorAll(".gameStarter").forEach((elt) => {
            elt.setAttribute("disabled", "");
            elt.classList.add("disabled");
        });
        // Add modal to hide here
        $("#modalNormalGame").modal("hide");
        $("#modalInfiniteGame").modal("hide");
        $("#modalInfiniteGameEnd").modal("hide");
        $("#modalGameEnd").modal("hide");
    }

    static setCookie(name, data) {
        document.cookie = name + "=" + data;
    }

    static getCookie(cname) {
        cname += "=";
        let cookies = document.cookie;
        cookies = cookies.split(';');
        for(let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cname) === 0) {
                return cookie.substring(cname.length, cookie.length);
            }
        }
        return "";
    }
}
