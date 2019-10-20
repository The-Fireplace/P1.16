let newsImages = [];
let newsHeadlines = [];
let newsIndex = 0;

function loadNews() {
  newsImages[0] = loadImage('https://i.kinja-img.com/gawker-media/image/upload/akmrnqyxg8ng7wwybg6n.jpg');
  newsHeadlines[0] = 'Mark Zuckerberg Announces All Of Facebook’s Future Decisions Will Be Made By The Cube Of Justice';
  newsImages[1] = loadImage('https://i.kinja-img.com/gawker-media/image/upload/wj8l0iiafty0kbchqcvi.jpg');
  newsHeadlines[1] = 'New Crest Sweepstakes Offers Chance To Win 10 Million Teeth';
  newsImages[2] = loadImage('https://i.kinja-img.com/gawker-media/image/upload/rrnk5fpblh4ofh47n0gz.jpg');
  newsHeadlines[2] = 'Halloween Pop-Up Store Has Pick Of Every Storefront In Rust Belt Town';
  newsImages[3] = loadImage('https://i.kinja-img.com/gawker-media/image/upload/g6nea2j0huesh0fqw2ku.jpg');
  newsHeadlines[3] = 'Bounty Unveils New Ultra-Thin Paper Towels For More Natural Feeling While Wiping Up Spills';
  newsImages[4] = loadImage('https://i.kinja-img.com/gawker-media/image/upload/zsflmrvezfn6l6rtuaif.jpg');
  newsHeadlines[4] = 'PG&E Makes Amends For Power Outages By Pumping Wires Full Of So Much Electricity That Plugging In Lamp Will Kill You';
}

function cycleNews() {
  if(++newsIndex > newsImages.length - 1) {
    newsIndex = 0;
  }
}
function cycleNewsBack() {
  if(--newsIndex < 0) {
    newsIndex = newsImages.length - 1;
  }
}

let tick = 0;

function newsDraw(x, y, w, h) {
  textSize(12);
  fill(0);
  textAlign(LEFT, TOP);
  //Cycle news every five seconds
  if(++tick % 300 === 0) {
    tick = 0;
    cycleNews();
  }
  
  //Display current news article
  image(newsImages[newsIndex], x+25, y+2, w-50, 3*h/4-2);
  text(newsHeadlines[newsIndex], x+25, y+3*h/4+2, w-50, h/4-2);
  //Left and right arrows: background
  fill('rgba(255,255,255, 0.2)');
  rect(x, y, 25, h);
  rect(x+w-25, y, 25, h);
  //left and right arrows
  textSize(24);
  fill(0);
  textAlign(CENTER, CENTER);
  text('<', x, y, 25, h);
  text('>', x+w-25, y, 25, h);
}

function newsClick(x, y, w, h) {
  if(x < 25) {
    cycleNewsBack();
    tick = 0;
  } else if(x > w-25) {
    cycleNews();
    tick = 0;
  }
  //TODO link to articles instead?
  //window.open("https://local.theonion.com/halloween-pop-up-store-has-pick-of-every-storefront-in-1839165592");
}
