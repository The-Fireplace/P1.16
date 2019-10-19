var selectedWidget = null;
var widgets = [];
let capture;

function setup() {
  createCanvas(500, 500);
  capture = createCapture(VIDEO);
  capture.size(500, 500);
  capture.hide();
  widgets[0] = newWidget(50, 50, 80, 80, dummyWidgetDraw);
}

function newWidget(x, y, w, h, drawFunc) {
  return {posX:x,posY:y,w:w,h:h,oX:0,oY:0,draw:drawFunc,};
}

function mousePressed() {
  if(selectedWidget == null) {
    for(let r in widgets) {
      r = widgets[r];
      if(mouseX > r.posX && mouseX < r.posX + r.w && mouseY > r.posY && mouseY < r.posY + r.h) {
        selectedWidget = r;
        r.oX = mouseX - r.posX;
        r.oY = mouseY - r.posY;
        break;
      }
    }
  }
}

function mouseReleased() {
  selectedWidget = null;
}

function draw() {
  background(200);
  image(capture, 0, 0, 500, 500);
  //Update dragging rectangle position
  if(selectedWidget != null) {
    selectedWidget.posX = mouseX - selectedWidget.oX;
    selectedWidget.posY = mouseY - selectedWidget.oY;
  }
  for(let r in widgets) {
    r = widgets[r];
    fill('rgba(255,255,255, 0.4)');
    noStroke();
    rect(r.posX, r.posY, r.w, r.h);
    r.draw(r.posX, r.posY, r.w, r.h);
  }
}

//A simple draw method to test drawing within the rectangle
function dummyWidgetDraw(x, y, w, h) {
  stroke(0);
  textAlign(CENTER, CENTER);
  text('Widget', x+w/2, y+h/2);
}
