let lb;
let slider;

function lbsetup() {
    lb = createButton('').class("graphWidButton").html('<i class="far fa-lightbulb" style="color:black;"><text style="color:white;"></text></i>', true);
    lb.style('border-radius', '50%');
    
    slider = createSlider(0, 255, 100);
    slider.style('width', '80px');
}


function lbDraw(x, y, w, h) {

  lb.position(x, (h/20)+y);
  lb.style('height', (h/20)*18+'px');
  lb.style('width', (w/20)*18+'px');
  lb.style('font-size', w/4+'px');
  lb.mousePressed(opClSettings);
  
  slider.position((w/3)+x, ((h/10)*6)+y);
}

function lbClick(x, y, w, h){
  

}

function opClSettings(){
  
};
