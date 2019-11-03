let notificationDiv;
let contentDiv = [];
let radiusSet = true;
let radius = 100;
let opened = false;
let notificationContent = [];
let notificationNum = 3;
let notificationRect = [];

notificationContent[0] = newContent('twitter', 'Someone @ you.', "2:34 PM");
notificationContent[1] = newContent('facebook', 'Someone poked you.', "2:32 PM");
notificationContent[2] = newContent('messages', 'So-and-So texted you', "1:56 PM");

function notificationDraw(x, y, w, h) {
    x = x - 8;
    y = y - 8;
    w = w + 16;
    h = h + 16;
    rect(x, y, w, h, radius);

    fill(0);
    notificationDiv.position(x+13.5, y+12);

    if (selectedWidget != null) {
        if (selectedWidget.draw.name == 'notificationDraw') opened = false;
        else opened = false;
    }
    
    fill(255, 0, 0);
    circle(x+35, y+15, 8);
    fill(250);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(notificationNum, x+35, y+16);
    
    if (!opened) {
        for (let index in contentDiv){
            contentDiv[index].style('display', 'none');
        }    
    }
    rectRadiusChange();
    if (opened){
        for (let index in contentDiv) {    
            contentDiv[index].style('display', 'block');
        }
        fill('rgba(255,255,255, 0.1)');
        if (x+250 > 1000 && y - 401 < 0) {
            widgets[1].posX = 950;
            widgets[1].posY = 0;
            rect(x - 175, y + 51, 250, 400, 10);
            fillContent(x-175, y+451);
        }
        else if (x+250 < 1000 && y - 401 > 0) {
            rect(x, y-401, 250, 400, 10);
            fillContent(x, y);
        }
        else {
            if (x+250 > 1000){
                // widgets[1].posX = x - (x + 250 - 1000);
                widgets[1].posX = 950;
                rect(x-175, y-401, 250, 400, 10);
                fillContent(x-175, y);
            }
            if (y - 401 < 0){
                // widgets[1].posY = y + (401 - y);
                widgets[1].posY = 0;
                rect(x, y + 51, 250, 400, 10);
                fillContent(x, y+451);
            }
        }
    }

}

function rectRadiusChange(){
    if (opened && radiusSet && radius == 100){

        for (let i = 100; i >= 10; i--){
            radius = i;
        }
        radiusSet = false;
    }
    if (!opened && !radiusSet && radius == 10){
        for (let j = 10; j <= 100; j++) {
            radius = j;
        }
        radiusSet = true;
    }
}

function fillContent(x, y) {
    fill(0);

    for (let content in notificationContent) {                
        textAlign(LEFT);
        contentDiv[content].position(x+8, y-(385 - 50 * Number(content)));
        textAlign(LEFT, CENTER);
        textSize(14);
        text(notificationContent[content].notification, x + 35, y - (375 - 50 * Number(content)));
        text(notificationContent[content].time, x+193, y - (375 - 50 * Number(content)));
        stroke(0);
        strokeWeight(1);
        line(x, y - 401 + (50 * (Number(content)+1)), x+249, y - 401 + (50 * (Number(content)+1)));
        noStroke();
        if (content == notificationContent.length - 1){
            break;
        }
    }
}

function createContentDiv() {
    let twit = "<i class=\"fab fa-twitter\"></i>"
    let facebook = "<i class=\"fab fa-facebook-f\"></i>";
    let messages = "<i class=\"fab fa-facebook-messenger\"></i>";
    for (let content in notificationContent) {
        if (notificationContent[content].app == "twitter") {
            contentDiv[content] = createDiv(twit);
            contentDiv[content].style('color', '#4267B2');
            contentDiv[content].style('font-size', '22px');
        }
        if (notificationContent[content].app == "facebook") {
            contentDiv[content] = createDiv(facebook);
            contentDiv[content].style('color', '#4267B2');
            contentDiv[content].style('font-size', '22px');
        }
        if (notificationContent[content].app == "messages") {
            contentDiv[content] = createDiv(messages);
            contentDiv[content].style('color', '#4267B2');
            contentDiv[content].style('font-size', '22px');
        }
    }
}

function newContent(app, notification, time){
    return {
        app: app, 
        notification: notification,
        time: time,
    }
}

function notificationIcon() {
    createContentDiv();
    notificationDiv = createDiv("<i class=\"fas fa-bell\"></i>");
    notificationDiv.style('font-size', '26px');
    notificationDiv.style('z-index', '100');
}

function notificationClick(x, y, w, h){
    opened = !opened;
}