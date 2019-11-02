let selectedWidget = null;
let widgets = [];
let capture;
const width = 1000, height = 1000;

function setup() {
  createCanvas(width, height);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
  widgets[0] = newWidget(0, 0, 300, 200, newsDraw, newsClick);
  widgets[1] = newWidget(width - 200, 320, 200, 200, healthDraw, healthClick);
  widgets[2] = newWidget(width - 200, 210, 200, 100, calendarDraw, calendarClick);
  widgets[3] = newWidget(100, height - 50, 200, 60, musicWidgetDraw, musicWidgetClick);
  widgets[4] = newWidget(0, 210, 200, 200, stockDraw, stockClick);
  widgets[5] = newWidget(750, 0, 250, 200, weatherWidgetDraw, noClick);
  widgets[6] = newWidget(450, 0, 125, 150, lbDraw, lbClick, lbDrag);
  widgets[7] = newWidget(0, 950, 50, 50, notificationDraw, notificationClick, noDragOverride, false);

  notificationIcon();
  weatherSun();
  loadNews();
  setupHealthWidget(widgets[1].w, widgets[1].h);
  lbsetup();
  randomSeed(new Date().getMilliseconds());
}

//Creates a new widget object with the specified initial position, size, and function for draw and click.
//drawFunc(int x, int y, int width, int height) where x,y is the top left corner of the widget
//clickFunc(int x, int y, int width, int height) where x,y is the position within the widget that was clicked, so the top left corner of the widget is 0,0 and the bottom right is the widget's width,height.
function newWidget(x, y, w, h, drawFunc, clickFunc, dragOverrideFunc=noDragOverride, makeRect=true) {
  return {posX:x,posY:y,w:w,h:h,oX:0,oY:0,draw:drawFunc,click:clickFunc,dragOverride:dragOverrideFunc,makeRect:makeRect};
}
function mouseDragged() {
  if(selectedWidget == null) {
    for (let r in widgets) {
      r = widgets[r];
      if (mouseX > r.posX && mouseX < r.posX + r.w && mouseY > r.posY && mouseY < r.posY + r.h && !r.dragOverride(r.posX, r.posY, r.w, r.h)) {
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
        break;
      }
    }
  } else {
    selectedWidget = null;
  }
}

function draw() {
  background(200);
  image(capture, 0, 0, width, height);
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
  let count = 0;
  for(let r in widgets) {
    count++;
    r = widgets[r];
    //Give the widget background some transparency for a more mirror-like look. Make it less transparent if being dragged.
    if(selectedWidget === r) {
      fill('rgba(255,255,255, 0.4)');
    } else {
      fill('rgba(255,255,255, 0.1)');
    }
    if(count == 7){
      fill('rgba(255,255,255, 0.0)');
    }
    noStroke();
    //draw background
    if(r.makeRect)
      rect(r.posX, r.posY, r.w, r.h, 16);
    //call widget's draw for the foreground
    r.draw(r.posX + 8, r.posY + 8, r.w - 16, r.h - 16);
  }
}

function noClick(x, y, w, h) {

}

function noDragOverride(x, y, w, h) {
  return false;
}

function touchStarted() {
  return false;
}