let notificationDiv;
let settingDiv;
let notiContentDiv = [];
let settingContentDiv = [];
let radiusSet = true;
let radius = 100;
let opened = false;
let isRead = false;
let contentShow = 'notification';
let notificationContent = [];
let settingConent = [];
let notificationNum = 3;

notificationContent[0] = newContent('twitter', 'Someone @ you.', "2:34 PM");
notificationContent[1] = newContent('facebook', 'Someone poked you.', "2:32 PM");
notificationContent[2] = newContent('messages', 'So-and-So texted you', "1:56 PM");

settingConent[0] = newContent('wifi', '', '');
settingConent[1] = newContent('bluetooth', '', '');
settingConent[2] = newContent('privacy', '', '');
settingConent[3] = newContent('setting', '', '');

function notificationDraw(x, y, w, h) {
    x = x - 8;
    y = y - 8;
    w = w + 16;
    h = h + 16;

    if (!opened){
        fill('rgba(255,255,255, 0.1)');
    }
    else {
        fill('rgba(255,255,255, 0.4)');
    }
    
    rect(x, y, w, h, radius);

    fill(0);
    notificationDiv.position(x+13.5, y+12);

    if (selectedWidget != null) {
       opened = false;
    }

    if (!opened && !isRead){
        fill(255, 0, 0);
        circle(x+35, y+15, 8);
        fill(250);
        textAlign(CENTER, CENTER);
        textSize(14);
        text(notificationNum, x+35, y+16);
    }
    
    if (!opened) {
        for (let index in notiContentDiv){
            notiContentDiv[index].style('display', 'none');
        }  
        for (let index in settingContentDiv){
            settingContentDiv[index].style('display', 'none');
        }    
    }
    rectRadiusChange();
    if (opened){
        for (let index in notiContentDiv) {    
            notiContentDiv[index].style('display', 'block');
        }
        for (let index in settingContentDiv) {    
            settingContentDiv[index].style('display', 'block');
        }
        settingRect(x, y, w, h);
        fill('rgba(255,255,255, 0.1)');

        if (x+251 > 1000 && y - 401 < 0) {
            widgets[7].posX = 750;
            widgets[7].posY = 0;
            rect(x, y + 51, 250, 400, 10);
            fillContent(x, y+451);
        }
        else if (x+250 < 1000 && y - 401 > 0) {
            rect(x, y-401, 250, 450, 10);
            fillContent(x, y);
        }
        else {
            if (x+251 > 1000){
                widgets[7].posX = 750;
                rect(x, y-401, 250, 450, 10);
                fillContent(x, y);
            }
            if (y - 401 < 0){
                widgets[7].posY = 0;
                rect(x, y + 51, 250, 400, 10);
                fillContent(x, y+451);
            }
        }
        isRead = true;
    }
}

function settingRect(x, y, w, h){
    fill('rgba(255,255,255, 0.2)');
    rect(x+50, y, w, h, radius);
    settingContentDiv[0].position(x+58.5, y+12);
    rect(x+100, y, w, h, radius);
    settingContentDiv[1].position(x+117, y+12);
    rect(x+150, y, w, h, radius);
    settingContentDiv[2].position(x+159, y+12);
    rect(x+200, y, w, h, radius);
    settingContentDiv[3].position(x+212, y+13);
}

function rectRadiusChange(){
    if (opened && radiusSet){
        if (radius > 10) {
            radius -= 30;
        }
        else {
            radiusSet = false;
        }
    }
    if (!opened && !radiusSet){
        if (radius < 100) {
            radius += 30;
        }
        else {
            radiusSet = true;
        }
    }
}

function fillContent(x, y) {
    fill(0);
    for (let content in notificationContent) {                
        textAlign(LEFT);
        notiContentDiv[content].position(x+8, y-(385 - 50 * Number(content)));
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
    let twit = "<i class=\"fab fa-twitter\"></i>";
    let facebook = "<i class=\"fab fa-facebook-f\"></i>";
    let messages = "<i class=\"fab fa-facebook-messenger\"></i>";
    let wifi = "<i class=\"fas fa-wifi\"></i>";
    let bluetooth = "<i class=\"fab fa-bluetooth-b\"></i>";
    let privacy = "<i class=\"fas fa-user-lock\"></i>";
    let setting = "<i class=\"fas fa-cog\"></i>";
    for (let content in notificationContent) {
        if (notificationContent[content].app == "twitter") {
            notiContentDiv[content] = createDiv(twit);
            notiContentDiv[content].style('color', '#4267B2');
            notiContentDiv[content].style('font-size', '22px');
        }
        if (notificationContent[content].app == "facebook") {
            notiContentDiv[content] = createDiv(facebook);
            notiContentDiv[content].style('color', '#4267B2');
            notiContentDiv[content].style('font-size', '22px');
        }
        if (notificationContent[content].app == "messages") {
            notiContentDiv[content] = createDiv(messages);
            notiContentDiv[content].style('color', '#4267B2');
            notiContentDiv[content].style('font-size', '22px');
        }
    }
    for (let content in settingConent) {
        if (settingConent[content].app == "wifi"){
            settingContentDiv[content] = createDiv(wifi);
            settingContentDiv[content].style('color', 'black');
            settingContentDiv[content].style('font-size', '26px');
        }
        if (settingConent[content].app == "bluetooth"){
            settingContentDiv[content] = createDiv(bluetooth);
            settingContentDiv[content].style('color', 'black');
            settingContentDiv[content].style('font-size', '26px');
        }
        if (settingConent[content].app == "privacy"){
            settingContentDiv[content] = createDiv(privacy);
            settingContentDiv[content].style('color', 'black');
            settingContentDiv[content].style('font-size', '26px');
        }
        if (settingConent[content].app == "setting"){
            settingContentDiv[content] = createDiv(setting);
            settingContentDiv[content].style('color', 'black');
            settingContentDiv[content].style('font-size', '26px');
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
}

function notificationClick(x, y, w, h){
    opened = !opened;    
}