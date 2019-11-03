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
  widgets[3] = newWidget(100, height - 60, 200, 60, musicWidgetDraw, musicWidgetClick);
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
    //Don't let widgets overlap
    //This will generally put the widget closest to where it was released, but edge cases do exist.
    let shifted = [{x:0,y:0}];
    let shiftCoord = {x:0,y:0};
    while(somethingOverlaps(selectedWidget)) {
      let unfixable = false;
      for(let w in widgets) {
        w = widgets[w];
        if(widgetsOverlap(selectedWidget, w)) {
          const left = cloneWidgetCoords(selectedWidget);
          const right = cloneWidgetCoords(selectedWidget);
          const up = cloneWidgetCoords(selectedWidget);
          const down = cloneWidgetCoords(selectedWidget);
          if(w.posX-left.w > 0) {
            left.posX = w.posX - left.w - 1;
          }
          if(w.posX+w.w+right.w < width) {
            right.posX = w.posX + w.w + 1;
          }
          if(w.posY-up.h > 0) {
            up.posY = w.posY - up.h - 1;
          }
          if(w.posY+w.h+down.h < height) {
            down.posY = w.posY + w.h + 1;
          }

          const leftDist = Math.abs(selectedWidget.posX-left.posX);
          const rightDist = Math.abs(right.posX-selectedWidget.posX);
          const upDist = Math.abs(selectedWidget.posY-up.posY);
          const downDist = Math.abs(down.posY-selectedWidget.posY);
          //If distance is 0 we don't want to use it because that means there was nowhere to move it in that direction.
          //Also, if shifted contains the new coords, don't use it because we could end up in an infinite loop going back and forth between two spots.
          const min = Math.min(
            leftDist > 0 && !hasCoords(shifted, {x:shiftCoord.x-1,y:shiftCoord.y}) ? leftDist : Number.MAX_VALUE,
              rightDist > 0 && !hasCoords(shifted, {x:shiftCoord.x+1,y:shiftCoord.y}) ? rightDist : Number.MAX_VALUE,
              upDist > 0 && !hasCoords(shifted, {x:shiftCoord.x,y:shiftCoord.y-1}) ? upDist : Number.MAX_VALUE,
              downDist > 0 && !hasCoords(shifted, {x:shiftCoord.x,y:shiftCoord.y+1}) ? downDist : Number.MAX_VALUE);
          if(min == Number.MAX_VALUE) {
            unfixable = true;
          }

          switch(min) {
            case leftDist:
              selectedWidget.posX = left.posX;
              shiftCoord.x -= 1;
              break;
            case upDist:
              selectedWidget.posY = up.posY;
              shiftCoord.y -= 1;
              break;
            case rightDist:
              selectedWidget.posX = right.posX;
              shiftCoord.x += 1;
              break;
            case downDist:
              selectedWidget.posY = down.posY;
              shiftCoord.y += 1;
              break;
          }
          shifted[shifted.length] = {x:shiftCoord.x,y:shiftCoord.y};
          break;
        }
      }
      if(unfixable) {
        break;
      }
    }
    selectedWidget = null;
  }
}

function hasCoords(coordArray, coords) {
  for(let coord in coordArray) {
    coord = coordArray[coord];
    if(coord.x == coords.x && coord.y == coords.y) {
      return true;
    }
  }
  return false;
}

function cloneWidgetCoords(widget) {
  return {posX:widget.posX,posY:widget.posY,w:widget.w,h:widget.h};
}

function somethingOverlaps(selectedWidget) {
  for(let w in widgets) {
    w = widgets[w];
    if(widgetsOverlap(selectedWidget, w)) {
      return true;
    }
  }
  return false;
}

function widgetsOverlap(widget1, widget2) {
  //compare draw functions because that is the only way to uniquely identify the widgets
  if(widget1.draw.name == widget2.draw.name) {
    return false;
  }
  return rectanglesOverlap(widget1.posX, widget1.posY, widget1.posX + widget1.w, widget1.posY + widget1.h,
      widget2.posX, widget2.posY, widget2.posX + widget2.w, widget2.posY + widget2.h);
}

function rectanglesOverlap(lx1, ly1, rx1, ry1, lx2, ly2, rx2, ry2) {
  if(lx1 > rx2 || lx2 > rx1) {
    return false;
  }
  if(ly1 > ry2 || ly2 > ry1) {
    return false;
  }
  return true;
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