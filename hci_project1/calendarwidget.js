let date = new Date();

function calendarDraw(x, y, w, h) {
  //Draw top line with the date and arrows
  textAlign(CENTER, CENTER);
  fill('rgba(255, 0, 0, 0.75)');
  stroke(0);
  rect(x, y, w, h/4, 5, 5, 0, 0);
  fill(255);
  noStroke();
  textSize(h/4);
  text(date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' }), x+w/8, y+2, w-w/4, h/4);
  //Draw arrows
  text('<', x, y+2, w/8, h/4);
  text('>', x+w-w/8, y+2, w/8, h/4);
  //Draw tasks
  const tasks = getTasks(date);
  if(tasks.length > 0) {
    for (let t in tasks) {
      const task = tasks[t];
      //Convert t to int because it was a string
      t = Number(t);
      stroke(0);
      noFill();
      rect(x, y+(h/4)*(t+1), w, h/4);
      noStroke();
      fill(0);
      textSize(16);
      text(task.desc, x, y+(h/4)*(t+1), 3*w/4, h/4);
      text(task.time, x+3*w/4, y+(h/4)*(t+1), w/4, h/4);
    }
  } else {
    text('No tasks', x, y+(h/4), w, h/4);
  }
}

function getTasks(d) {
  if(d.getDay() === new Date().getDay()) {
    return [{desc:'Lunch', time:'1:00', color:'rgba(0,150,0, 0.5)',},
      {desc:'Presentation Prep', time:'2:00', color:'rgba(150,0,0, 0.5)',},
      {desc:'HCI', time:'3:00', color:'rgba(250,150,0, 0.5)',},];
  } else {
    return [];
  }
}

function calendarClick(x, y, w, h) {
  if(y < h/4) {
    if(x < w/8) {
      date.setDate(date.getDate()-1);
    } else if(x > 7*w/8) {
      date.setDate(date.getDate()+1);
    }
  }
}
