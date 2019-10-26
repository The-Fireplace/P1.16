var div;

let opened = false;
let notificationContent = [];

notificationContent[0] = newContent('twitter', 'someone tweeted at you', new Date().toLocaleTimeString());
notificationContent[1] = newContent('facebook', 'someone sent a friend request', new Date().toLocaleTimeString());
notificationContent[2] = newContent('messages', 'so-and-so texted you', new Date().toLocaleTimeString());
notificationContent[3] = newContent('messagess', 'so-and-that texted you', new Date().toLocaleTimeString());

function notificationDraw(x, y, w, h) {
    fill(0);

    div.position(x+13.5, y+12);

    if (dragged) opened = false;

    

    
    text(notificationContent[0].app + ' ' + notificationContent[0].notification + ' ' + notificationContent[0].time, 200, 150);
    text(notificationContent[1].app + ' ' + notificationContent[1].notification + ' ' + notificationContent[1].time, 200, 175);
    text(notificationContent[2].app + ' ' + notificationContent[2].notification + ' ' + notificationContent[2].time, 200, 200);
    
    // stroke(0);

    if (opened){
        
        fill('rgba(255,255,255, 0.4)');
        
        if (x+250 > 1000 && y - 401 < 0) {
            widgets[1].posX = 950;
            widgets[1].posY = 0;
            rect(x - 175, y + 51, 250, 400, 8);
        }
        else if (x+250 < 1000 && y - 401 > 0) {
            rect(x, y-401, 250, 400, 8);
        }
        else {
            if (x+250 > 1000){
                // widgets[1].posX = x - (x + 250 - 1000);
                widgets[1].posX = 950;
                rect(x-175, y-401, 250, 400, 8);
            }
            if (y - 401 < 0){
                // widgets[1].posY = y + (401 - y);
                widgets[1].posY = 0;
                rect(x, y + 51, 250, 400, 8);
            }
        }
        fill(0);
        for (let content in notificationContent) {
            // console.log('content: ', content, '\tlen: ', notificationContent.length);
            if (content < notificationContent.length){
                // console.log('content: ', content);
                
                textAlign(LEFT);
                text(notificationContent[content].app, x + 5, y - (375 - 50 * content));
                text('y: ' + y + '\tline y\'s: ' + ( 50 * (Number(content)+1)), 100, 225 + (25 * content));
                stroke(0);
                line(x, y - 401 + (50 * (Number(content)+1)), x+250, y - 401 + (50 * (Number(content)+1)));
                noStroke();
                if (content == notificationContent.length){
                    break;
                }
            }
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
    div = createDiv("<i class=\"fas fa-bell\"></i>");
    // div.parent('defaultCanvas0');
    div.style('font-size', '26px');
    div.style('color', 'red');
}

function notificationClick(x, y, w, h){
    console.log('clicked');
    opened = !opened;
}