

function setup() { 
    createCanvas(640, 480);
} 
  
function draw() { 
    background(220);
    let h = hour();
    let m = minute();
    let amPM = 'am';
    if (h > 11) {
        amPM = 'pm';
    }
    if (h%12 == 0) {
        h = 12;
    }
    else {
        h = h % 12
    }
    text('Current time: ' + h + ':' + m + ' ' + amPM, 15, 50);
}