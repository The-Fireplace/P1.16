let lb;
let slider;
let dragSlider = false;
let lit = false;

function lbsetup() {
  lb = createButton('').class("graphWidButton").html('<i class="far fa-lightbulb" style="color:black;"><text style="color:white;"></text></i>', true);
  lb.style('border-radius', '50%');

  slider = createSlider(0, 200, 100);
  slider.hide();
}


function lbDraw(x, y, w, h) {
  if (lb.class() != "graphWidButton"){
    fill('rgba(255,255,255,'+slider.value()/255+')');
    rect(0,0,1000,1000);
  }

  lb.position(x, y);
  lb.style('height', (h/20)*17+'px');
  lb.style('width', (w)+'px');
  lb.style('font-size', w/4+'px');
  lb.mouseReleased(opClSettings);

  slider.position(x, (h/20)*18+y);
  slider.style('width', w+'px');
}

function lbClick(x, y, w, h){
  dragSlider = false;
}

function lbDrag(x, y, w, h){
  if (dragSlider || (mouseY <= ((h/20)*18)+15+y) && (mouseY >= ((h/20)*18)-15+y)){
    dragSlider = true;
    return true;
  }
  return false;
  //print(mouseY);
  //console.log(((h/20)*18)+y);
  //print((mouseY <= ((h/20)*18)+5+y));
  //print((mouseY >= ((h/20)*18)-5+y));
}

function opClSettings(){
  if(selectedWidget != null && selectedWidget.draw.name == lbDraw.name)
    return;
  if (!lit){
    lb.class("graphWidButtonYellow");
    slider.show();
  }
  else{
    lb.class("graphWidButton");
    slider.hide();
  }

  lit = !lit;
}
