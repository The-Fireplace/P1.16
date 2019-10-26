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
  //Cycle news every five seconds
  if(++tick % 300 === 0) {
    tick = 0;
    cycleNews();
  }
  //Draw top line with the title and arrows
  textAlign(CENTER, CENTER);
  fill('rgba(255, 0, 0, 0.75)');
  stroke(0);
  rect(x, y, w-1, 25, 5, 5, 0, 0);
  fill(255);
  noStroke();
  textSize(24);
  text('News', x+w/8, y+2, w-w/4, 25);
  //Draw arrows
  text('<', x, y+2, w/8, 25);
  text('>', x+w-w/8, y+2, w/8, 25);

  textSize(12);
  fill(0);
  textAlign(LEFT, TOP);
  //Display current news article
  image(newsImages[newsIndex], x, y+25, w, 3*h/4-25);
  text(newsHeadlines[newsIndex], x, y+3*h/4+2, w, h/4);
}

function newsClick(x, y, w, h) {
  if(x <= w/8) {
    cycleNewsBack();
    tick = 0;
  } else if(x >= w-w/8) {
    cycleNews();
    tick = 0;
  }
  //TODO link to articles instead?
  //window.open("https://local.theonion.com/halloween-pop-up-store-has-pick-of-every-storefront-in-1839165592");
}
