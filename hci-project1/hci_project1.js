let selectedWidget = null;
let widgets = [];
let capture;

function setup() {
  createCanvas(1000, 1000);
  // capture = createCapture(VIDEO);
  // capture.size(1000, 1000);
  // capture.hide();

  notificationIcon(); 
  widgets[1] = newWidget(0, 950, 50, 50, notificationDraw, notificationClick, false);
}

//Creates a new widget object with the specified initial position, size, and function for draw and click.
//drawFunc(int x, int y, int width, int height) where x,y is the top left corner of the widget
//clickFunc(int x, int y, int width, int height) where x,y is the position within the widget that was clicked, so the top left corner of the widget is 0,0 and the bottom right is the widget's width,height.
function newWidget(x, y, w, h, drawFunc, clickFunc, makeRect=true) {
  return {posX:x,posY:y,w:w,h:h,oX:0,oY:0,draw:drawFunc,click:clickFunc,makeRect:makeRect};
}

// new mouse events copy till...

function mouseDragged() {
  if(selectedWidget == null) {
    for (let r in widgets) {
      r = widgets[r];
      if (mouseX > r.posX && mouseX < r.posX + r.w && mouseY > r.posY && mouseY < r.posY + r.h) {
        selectedWidget = r;
        r.oX = mouseX - r.posX;
        r.oY = mouseY - r.posY;
        break;
      }
    }
  }
}

function mouseReleased() {
if(selectedWidget == null) {
  for (let r in widgets) {
    r = widgets[r];
    if (mouseX > r.posX && mouseX < r.posX + r.w && mouseY > r.posY && mouseY < r.posY + r.h) {
      //Call the widget's click handler
      r.click(mouseX - r.posX, mouseY - r.posY, r.w, r.h);
    }
  }
} else {
  selectedWidget = null;
}
}

function touchStarted() {
  return false;
}

// ...here

function draw() {
  background(200);
  // image(capture, 0, 0, width, height);
  //Update dragging rectangle position
  if(selectedWidget != null) {
    if(mouseX - selectedWidget.oX >= 0 && mouseX - selectedWidget.oX + selectedWidget.w <= width) {
      selectedWidget.posX = mouseX - selectedWidget.oX;
    } else if(mouseX - selectedWidget.oX + selectedWidget.w <= width) {
      selectedWidget.posX = 0;
    } else {
      selectedWidget.posX = width - selectedWidget.w;
    }
    if(mouseY - selectedWidget.oY >= 0 && mouseY - selectedWidget.oY + selectedWidget.h <= height) {
      selectedWidget.posY = mouseY - selectedWidget.oY;
    } else if(mouseY - selectedWidget.oY + selectedWidget.h <= height) {
      selectedWidget.posY = 0;
    } else {
      selectedWidget.posY = height - selectedWidget.h;
    }
  }
  //for each widget, we want to draw the background then call the widget's draw function.
  for(let r in widgets) {
    r = widgets[r];
    //Give the widget background some transparency for a more mirror-like look. Make it less transparent if being dragged.
    if(selectedWidget === r) {
      fill('rgba(255,255,255, 0.5)');
    } else {
      fill('rgba(255,255,255, 0.1)');
    }
    noStroke();
    //draw background 
    //only a rect corner rounding added here
    if (r.makeRect) rect(r.posX, r.posY, r.w, r.h, 10);
    //call widget's draw for the foreground
    r.draw(r.posX, r.posY, r.w, r.h);
  }
}

//A simple method to test clicking within widgets
function noClick(x, y, w, h) {
}
