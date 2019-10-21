let w = 100;
let h = 100;
let x = 0;
let y =0;
let stocks = ["NAQ", "APP", "PENI", "SAN", "DVAG",];
let upDown = ["+","-","","+","+",];
let percent = ["0.5","102","626","14","52.2",];
let value = ["50","12","626.24","25","19.25",];
let selectedStock = -1;

let stock0 = [2, 9, 8, 7, 6, 6, 1,];
let stock1 = [8, 5, 8, 3, 10, 5, 10,];
let stock2 = [2, 2, 9, 3, 2, 8, 1,];
let stock3 = [4, 9, 9, 9, 5, 4, 3,];
let stock4 = [7, 8, 4, 5, 9, 9, 1,];

let stockp = [stock0, stock1, stock2, stock3, stock4,];

function setup(){
  createCanvas(w,h);
  background(200);
}

function draw(){
  clear();
  if (selectedStock == -1){
    stockTable();
  }
  if (selectedStock == 0){
    graph(0);
  }
  if (selectedStock == 1){
    graph(1);
  }
  if (selectedStock == 2){
    graph(2);
  }
  if (selectedStock == 3){
    graph(3);
  }
  if (selectedStock == 4){
    graph(4);
  }
}

function mousePressed(){
  mx = mouseX;
  my = mouseY;

  yHeight = h/(stocks.length +1);

  if (selectedStock == -1){
    if ((my >= yHeight) && (my <= yHeight*2)) {selectedStock = 0;}
    if ((my >= yHeight*2) && (my <= yHeight*3)) {selectedStock = 1;}
    if ((my >= yHeight*3) && (my <= yHeight*4)) {selectedStock = 2;}
    if ((my >= yHeight*4) && (my <= yHeight*5)) {selectedStock = 3;}
    if ((my >= yHeight*5) && (my <= w)) {selectedStock = 4;}
  }

  else {
    if (((my >= y) && (my <= yHeight)) && ((mx >= x) && (mx <= w/4))) {selectedStock = -1;}
  }
}

function stockTable(){
  lineHeight = h/(stocks.length +1);
  text("test");
  fill(102, 255, 178);
  rect(x, y, w, lineHeight);
  fill(0);
  textSize(w/4);
  textAlign(CENTER);
  text('Stock', w/2, y+lineHeight);
  fill(255);
  for (var i in stocks){
    i = Number(i);
    yHeight = ((i+1)*lineHeight);
    fill(255);
    rect(x, yHeight, w, lineHeight);

    yHeight = ((i+2)*lineHeight);
    textSize(w/10);

    fill(0);
    textAlign(LEFT);
    text(stocks[i], x, y+yHeight);

    fill(0);
    textAlign(CENTER);
    dolVal = '$'+value[i];
    text(dolVal, w/2, y+yHeight);

    textAlign(RIGHT);
    percentVal = upDown[i]+percent[i]+'%';
    if (upDown[i] == "+"){fill(0,180,0);}
    else if (upDown[i] == "-"){fill(220,0,0);}
    else {fill(0); percentVal = '0.00%';}
    text(percentVal, w, y+yHeight);
  }
}

 function graph(stockArrPos){
   console.log(stockp[stockArrPos]);
   lineHeight = h/(stocks.length +1);
     fill(102, 255, 178);
     rect(x, y, w, lineHeight);
     fill(0);
     textSize(w/4);
     textAlign(CENTER);
     text('Stock', w/2, y+lineHeight);
     textAlign(LEFT);
     fill(255,0,0);
     text('<', x, y+lineHeight);
     fill(255);

    i = stockArrPos;
    yHeight = (lineHeight);
    fill(255);
    rect(x, yHeight, w, lineHeight);

    yHeight = (2*lineHeight);
    textSize(w/10);

    fill(0);
    textAlign(LEFT);
    text(stocks[i], x, y+yHeight);

    fill(0);
    textAlign(CENTER);
    dolVal = '$'+value[i];
    text(dolVal, w/2, y+yHeight);

    textAlign(RIGHT);
    percentVal = upDown[i]+percent[i]+'%';
    if (upDown[i] == "+"){fill(0,180,0);stroke(0,180,0);}
    else if (upDown[i] == "-"){fill(220,0,0);stroke(220,0,0);}
    else {fill(0); percentVal = '0.00%';stroke(0);}
    text(percentVal, w, y+yHeight);

    gH = lineHeight*4;
    gx = x + (w/20);
    gy = lineHeight*2 ;
    gw = w;
    gh = gH;
    ghH = h - (h/30);

    strokeWeight(5);
    fill(0);

    for (i=0; i<7; i++){
      p1 = point((gw/7)*(i+1), gy+((gh/10)*stockp[stockArrPos][i]));
      p1x = (gw/7)*(i+1);
      p1y = gy+((gh/10)*stockp[stockArrPos][i]);
      j = i+1;
      p2 = point((gw/7)*(j+1), gy+((gh/10)*stockp[stockArrPos][j]));
      p2x = (gw/7)*(j+1);
      p2y = gy+((gh/10)*stockp[stockArrPos][j]);
      line(p1x, p1y, p2x, p2y);
    }

    stroke(0);
    line(gx, ghH, gw, ghH);
    line(gx, gy+(h/30), gx, ghH);

    strokeWeight(1);

}
