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
  widgets[1] = newWidget(width - 200, 300, 200, 200, healthDraw, healthClick);
  widgets[2] = newWidget(width - 200, 200, 200, 100, calendarDraw, calendarClick);
  widgets[3] = newWidget(100, height - 50, 200, 50, musicWidgetDraw, musicWidgetClick);
  widgets[4] = newWidget(0, 200, 300, 300, stockDraw, stockClick);
  widgets[5] = newWidget(750, 0, 250, 200, weatherWidgetDraw, noClick);
  
  weatherSun();
  loadNews();
  setupHealthWidget(widgets[1].w, widgets[1].h);
  randomSeed(new Date().getMilliseconds());
}

//Creates a new widget object with the specified initial position, size, and function for draw and click.
//drawFunc(int x, int y, int width, int height) where x,y is the top left corner of the widget
//clickFunc(int x, int y, int width, int height) where x,y is the position within the widget that was clicked, so the top left corner of the widget is 0,0 and the bottom right is the widget's width,height.
function newWidget(x, y, w, h, drawFunc, clickFunc) {
  return {posX:x,posY:y,w:w,h:h,oX:0,oY:0,draw:drawFunc,click:clickFunc,};
}

function mousePressed() {
  for(let r in widgets) {
      r = widgets[r];
      if(mouseX > r.posX && mouseX < r.posX + r.w && mouseY > r.posY && mouseY < r.posY + r.h) {
        if(selectedWidget == null) {
          selectedWidget = r;
          r.oX = mouseX - r.posX;
          r.oY = mouseY - r.posY;
        }
        //Call the widget's click handler
        r.click(mouseX-r.posX, mouseY-r.posY, r.w, r.h);
        break;
      }
    }
}

function mouseReleased() {
  selectedWidget = null;
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
  for(let r in widgets) {
    r = widgets[r];
    //Give the widget background some transparency for a more mirror-like look. Make it less transparent if being dragged.
    if(selectedWidget === r) {
      fill('rgba(255,255,255, 0.6)');
    } else {
      fill('rgba(255,255,255, 0.4)');
    }
    noStroke();
    //draw background
    rect(r.posX, r.posY, r.w, r.h);
    //call widget's draw for the foreground
    r.draw(r.posX, r.posY, r.w, r.h);
  }
}

function noClick(x, y, w, h) {

}
