var switchNum = 0;

function switchStock() {
    if (switchNum == 1) {
        switchBase();
    }
    else {
        document.getElementById("body").style.setProperty("--back-url", "url(\"assets/Sketch-selectStock-1.jpg\")");
        switchNum = 1;
    }
}

function switchNotification() {
    if (switchNum == 2) {
        switchBase();
    }
    else {
        document.getElementById("body").style.setProperty("--back-url", "url(\"assets/Sketch-selectNotifications-1.jpg\")");
        switchNum = 2;
    }
}

function switchLight() {
    if (switchNum == 3) {
        switchBase();
    }
    else {
        document.getElementById("body").style.setProperty("--back-url", "url(\"assets/Sketch-lighting-1.jpg\")");
        switchNum = 3;
    }
}

function switchGraph() {
    if (switchNum == 4) {
        switchBase();
    }
    else {
        document.getElementById("body").style.setProperty("--back-url", "url(\"assets/Sketch-selectHealth-1.jpg\")");
        switchNum = 4;
    }
}

function switchDrag() {
    if (switchNum == 5) {
        switchBase();
    }
    else {
        document.getElementById("body").style.setProperty("--back-url", "url(\"assets/Sketch-dragAndDrop.jpg\")");
        switchNum = 5;
    }
}

function switchBase() {
    document.getElementById("body").style.setProperty("--back-url", "url(\"assets/Sketch-lay1-1.jpg\")");
    switchNum = 0;
}
