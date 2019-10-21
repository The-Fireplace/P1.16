let w = 1000;
let h   = 1000;
let x = 0;
let y =0;
let stocks = ["NAQ", "APP", "PENI", "SAN", "DVAG",];

function setup(){
  createCanvas(w,h);
}

function draw(){
  stockTable();
  
}

function stockTable(){
  line(x, y, w, y);
  line(x, h, w, h);
}
