let button;
  let s = 1;
  let b1 = 8;
  let b2 = 7;
  let b3 = 6.5;
  let b4 = 7;
  let b5 = 7.3;
  let b6 = 8;
  let b7 = 5;
  let col = 'lb';
  let lab = 'hr';
  
  let health;
  let weight;
  let sleep;
  let steps;
  let standing;
  let mirror;

function setupHealthWidget(px, py) {
  health = createButton('').class("graphWidButton").html('<i class="fa fa-heartbeat" style="color:red;"><text style="color:white;"> Exercise</text></i>', true);
  weight = createButton('').class("graphWidButton").html('<i class="fa fa-weight" style="color:#00FF80"><text style="color:white;"> Weight</text></i>', true);
  sleep = createButton('').class("graphWidButton").html('<i class="fa fa-moon" style="color:skyblue"><text style="color:white;"> Sleep</text></i>', true);
  steps = createButton('').class("graphWidButton").html('<i class="fa fa-walking" style="color:orange"><text style="color:white;"> Steps</text></i>', true);
  standing = createButton('').class("graphWidButton").html('<i class="fa fa-male" style="color:#FFFF00"><text style="color:white;"> Standing</text></i>', true);
  mirror = createButton('').class("graphWidButton").html('<i class="fa fa-user" style="color:#FF00FF"><text style="color:white;"> Usage</text></i>', true);
  
  print('made buttons');
  
  const x = px;
  const y = py;
  buttonX = (x/3);
  buttonY = (y/4);
  
  health.style('font-size', (x/22.2)+'px');
  weight.style('font-size', (x/22.2)+'px');
  sleep.style('font-size', (x/22.2)+'px');
  steps.style('font-size', (x/22.2)+'px');
  standing.style('font-size', (x/22.2)+'px');
  mirror.style('font-size', (x/22.2)+'px');
  
  health.style('width', (x/3.2)+'px');
  weight.style('width', (x/3.2)+'px');
  sleep.style('width', (x/3.2)+'px');
  steps.style('width', (x/3.2)+'px');
  standing.style('width', (x/3.2)+'px');
  mirror.style('width', (x/3.2)+'px');
  
  health.style('height', (y/8)+'px');
  weight.style('height', (y/8)+'px');
  sleep.style('height', (y/8)+'px');
  steps.style('height', (y/8)+'px');
  standing.style('height', (y/8)+'px');
  mirror.style('height', (y/8)+'px');
  
  health.mousePressed(genGraphR);
  weight.mousePressed(genGraphG);
  sleep.mousePressed(genGraphLB);
  steps.mousePressed(genGraphO);
  standing.mousePressed(genGraphB);
  mirror.mousePressed(genGraphP);
  
}

function healthDraw(x, y, w, h) {
  const px = w;
  const py = h;
  buttonX = (px/3);
  buttonY = (py/16)+5;
  
  generateGraphWidget(x, y, w, h, s, b1, b2, b3, b4, b5, b6, b7, col, lab);
  
  health.position(0+x+2, buttonY*6+y+4);
  weight.position(0+x+2, buttonY*8+y);
  sleep.position(buttonX+x+2, buttonY*6+y+4);
  steps.position(buttonX+x+2, buttonY*8+y);
  standing.position(buttonX*2+x+2, buttonY*6+y+4);
  mirror.position(buttonX*2+x+2, buttonY*8+y);
}

function healthClick(x, y, w, h) {
}

function generateGraphWidget(corX, corY, x, y, scale, v1, v2, v3, v4, v5, v6, v7, bcolor, label) {
  graphWidth = (x/8);
  graphHeight = (y/1000);
  barHeight = (y/20);
  textSize(x/30);
  barWidth = (x/20);
  let r, g, b;
  switch(bcolor){
    case 'r':
    r = 255;
    g = 0;
    b = 0;
    break;
    
    case 'g':
    r = 0;
    g = 255;
    b = 128;
    break;
    
    case 'b':
    r = 255;
    g = 255;
    b = 0;
    break;
    
    case 'lb':
    r = 0;
    g = 255;
    b = 255;
    break;
    
    case 'o':
    r = 204;
    g = 102;
    b = 0;
    break;
    
    case 'p':
    r = 255;
    g = 0;
    b = 255;
    break;
  }
  
  textAlign(LEFT, TOP);
  
  for (i=10; i>=0; i--){
    yVal = ((y/10)*i)/2;
    fill(0);
    stroke(0);
    line(corX+2, yVal+corY, corX+x, yVal+corY);
    noStroke();
    textSize(x/30);
    text(scale*i + label, corX+graphWidth*7, corY+(y/2)-yVal+1);
  }
  
  fill(r,g,b);
  rect(((graphWidth)*0)+corX, (y/2)+corY, barWidth, -(v1*barHeight));
  fill(0);
  text('M', (graphWidth*0)+corX, (y/2)+corY+1);
  
  fill(r,g,b);
  rect(((graphWidth)*1)+corX, (y/2)+corY, barWidth, -(v2*barHeight));
  fill(0);
  text('Tu', (graphWidth*1)+corX, (y/2)+corY+1);
  
  fill(r,g,b);
  rect(((graphWidth)*2)+corX, (y/2)+corY, barWidth, -(v3*barHeight));
  fill(0);
  text('W', (graphWidth*2)+corX, (y/2)+corY+1);
  
  fill(r,g,b);
  rect(((graphWidth)*3)+corX, (y/2)+corY, barWidth, -(v4*barHeight));
  fill(0);
  text('Th', (graphWidth*3)+corX, (y/2)+corY+1);
  
  fill(r,g,b);
  rect(((graphWidth)*4)+corX, (y/2)+corY, barWidth, -(v5*barHeight));
  fill(0);
  text('Fr', (graphWidth*4)+corX, (y/2)+corY+1);
  
  fill(r,g,b);
  rect(((graphWidth)*5)+corX, (y/2)+corY, barWidth, -(v6*barHeight));
  fill(0);
  text('Sa', (graphWidth*5)+corX, (y/2)+corY+1);
  
  fill(r,g,b);
  rect(((graphWidth)*6)+corX, (y/2)+corY, barWidth, -(v7*barHeight));
  fill(0);
  text('Su', (graphWidth*6)+corX, (y/2)+corY+1);
  
}

//function genGraphR(){
  //generateGraphWidget(750, 750, 10, 6, 3.5, 6, 4, 8, 1, 0.5, 'r', "min");
//}
function genGraphR(){
  s = 10;
  b1 = 6;
  b2 = 2;
  b3 = 6;
  b4 = 1;
  b5 = 7;
  b6 = 0;
  b7 =10;
  col = 'r';
  lab = 'min';
}
function genGraphG(){
  s = 50;
  b1 = 3;
  b2 = 3.2;
  b3 = 3.1;
  b4 = 3.3;
  b5 = 3;
  b6 = 3.3;
  b7 =3.3;
  col = 'g';
  lab = 'lbs';
}
function genGraphLB(){
  s = 1;
  b1 = 8;
  b2 = 7;
  b3 = 6.5;
  b4 = 7;
  b5 = 7.3;
  b6 = 8;
  b7 = 5;
  col = 'lb';
  lab = 'hr';
}
function genGraphO(){
  s = 500;
  b1 = 6;
  b2 = 5;
  b3 = 5.8;
  b4 = 6;
  b5 = 3.8;
  b6 = 3;
  b7 = 2.5;
  col = 'o';
  lab = 'steps';
}
function genGraphB(){
  s = 10;
  b1 = 5;
  b2 = 4;
  b3 = 3.5;
  b4 = 4.3;
  b5 = 5;
  b6 = 6;
  b7 = 6;
  col = 'b';
  lab = 'min';
}
function genGraphP(){
  s = 10;
  b1 = 1;
  b2 = 2;
  b3 = 1;
  b4 = 4;
  b5 = 3.8;
  b6 = 3;
  b7 = 2.5;
  col = 'p';
  lab = 'min';
}
