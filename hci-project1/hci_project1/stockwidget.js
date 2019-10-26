let stocks = ["NAQ", "APP", "PENI", "SAN", "DVAG",];
let upDown = ["+","-","","+","+",];
let percent = ["0.5","102","626","14","52.2",];
let value = ["50.02","12.22","626.24","25.76","19.25",];
let selectedStock = -1;

let stock0 = [2, 9, 8, 7, 6, 6, 1,];
let stock1 = [8, 5, 8, 3, 10, 5, 10,];
let stock2 = [2, 2, 9, 3, 2, 8, 1,];
let stock3 = [4, 9, 9, 9, 5, 4, 3,];
let stock4 = [7, 8, 4, 5, 9, 9, 1,];

let stockp = [stock0, stock1, stock2, stock3, stock4,];

function stockDraw(x, y, w, h){
  if (selectedStock == -1){
    stockTable(x, y, w, h);
  }
  if (selectedStock == 0){
    graph(x, y, w, h, 0);
  }
  if (selectedStock == 1){
    graph(x, y, w, h, 1);
  }
  if (selectedStock == 2){
    graph(x, y, w, h, 2);
  }
  if (selectedStock == 3){
    graph(x, y, w, h, 3);
  }
  if (selectedStock == 4){
    graph(x, y, w, h, 4);
  }
}

function stockClick(x, y, w, h){
  mx = x;
  my = y;

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

function stockTable(x, y, w, h){
  lineHeight = h/(stocks.length +1);
  text("test");
  fill('rgba(255, 0, 0, 0.75)');
  rect(x, y, w, lineHeight, 10, 10, 0, 0);
  fill(255);
  textSize(h/6);
  textAlign(CENTER);
  text('Stock', (w/2)+x, y+lineHeight/2);
  fill(255);
  for (let i in stocks){
    i = Number(i);
    yHeight = ((i+1)*lineHeight);
    noFill();
    stroke(0);
    rect(x, yHeight+y, w, lineHeight);

    yHeight = ((i+2)*lineHeight);
    textSize(h/10);

    strokeWeight(1);
    fill(0);
    strokeWeight(1);
    textAlign(LEFT, BOTTOM);
    text(stocks[i], x, y+yHeight);

    fill(0);
    textAlign(CENTER);
    dolVal = '$'+value[i];
    text(dolVal, w/2 +x, y+yHeight);

    textAlign(RIGHT);
    percentVal = upDown[i]+percent[i]+'%';
    if (upDown[i] == "+"){fill(0,102,0);}
    else if (upDown[i] == "-"){fill(220,0,0);}
    else {fill(0); percentVal = '0.00%';}
    text(percentVal, w+x, y+yHeight);
  }
}

 function graph(x, y, w, h, stockArrPos){
   lineHeight = h/(stocks.length +1);
     fill('rgba(255, 0, 0, 0.75)');
     rect(x, y, w, lineHeight, 10, 10, 0, 0);
     fill(255);
     textSize(w/5);
     textAlign(CENTER, TOP);
     text('Stock', w/2+x, y);
     textAlign(LEFT, TOP);
     fill(255);
     text('<', x, y);
     fill(255);
     
     for (let i in stocks){
    i = Number(i);
    yHeight = ((i+1)*lineHeight);
    noFill();
    stroke(0);
    rect(x, yHeight+y, w, lineHeight);
  }

    i = stockArrPos;
    yHeight = (lineHeight);
    fill(255);
    //rect(x, yHeight, w, lineHeight);

    yHeight = (2*lineHeight);
    textSize(w/10);

    fill(0);
    textAlign(LEFT, BOTTOM);
    text(stocks[i], x, y+yHeight);

    fill(0);
    textAlign(CENTER);
    dolVal = '$'+value[i];
    text(dolVal, w/2+x, y+yHeight);

    textAlign(RIGHT);
    percentVal = upDown[i]+percent[i]+'%';
    if (upDown[i] == "+"){fill(0,102,0);stroke(0,180,0);}
    else if (upDown[i] == "-"){fill(220,0,0);stroke(220,0,0);}
    else {fill(0); percentVal = '0.00%';stroke(0);}
    text(percentVal, w+x, y+yHeight);

    gH = lineHeight*4;
    gx =  (w/20);
    gy = y + lineHeight*2 ;
    gw =  w;
    gh = gH;
    ghH = h - (h/30);

    strokeWeight(5);
    fill(0);

    for (let i=0; i<7; i++){
      //p1 = point((gw/7)*(i+1), gy+((gh/10)*stockp[stockArrPos][i]));
      p1x = ((gw/7)*(i+1))+x;
      p1y = gy+((gh/10)*stockp[stockArrPos][i]);
      j = i+1;
      //p2 = point((gw/7)*(j+1), gy+((gh/10)*stockp[stockArrPos][j]));
      p2x = ((gw/7)*(j+1))+x;
      p2y = gy+((gh/10)*stockp[stockArrPos][j]);
      stroke(0,102,0);
      line(p1x, p1y, p2x, p2y);
    }

    stroke(0);
    line(gx+x, y + ghH, gw+x, ghH + y);
    line(gx+x, gy+(h/30), gx+x, ghH + y);

    strokeWeight(1);

}
