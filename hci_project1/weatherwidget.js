//div used as the created div for font awesome
let Div;

//url used for weather api
const url = "http://api.weatherstack.com/current?access_key=d5e66f1a3c3ac4b54e586d0e6029e877&query=Lubbock&units=f";

//the following 2 variables are just initializations to catch errors
let weatherNum = 0;
let weatherDesc = 'Sunny';

//standard draw functions that needs to be used in the newwidget function call
function weatherWidgetDraw(x, y, w, h) {
    x = x - 8;
    y = y - 8;
    fill(0);
    textAlign(CENTER, BOTTOM);

    // setting time size and time location
    textSize(36);
    text(weatherTime(), x+125, y+165);

    // setting date size and date location
    textSize(24);
    text(weatherDate(), x+125, y+195);

    // setting city text size and location
    textSize(24);
    text('LUBBOCK', x+125, y+32);
    textSize(22);
    text('Texas', x+125, y+55);

    textAlign(CENTER, CENTER);

    // setting font awesome, temp, and weather description size and location
    textSize(40);
    Div.position(x+40,y+57);
    text(weatherNum + '\xB0F', x+175, y+87);
    textSize(16);
    text(weatherDesc, x+174, y+110);
}

//font awesome initialization and weather api url
function weatherSun() {
    // loadJSON used for weather api url
    loadJSON(url, gotWeather);

    Div = createDiv("<i class='fas fa-sun '></i>");
    Div.style('font-size', '60px');
}

//used for weather api callback, as well as setting all info from the callback
function gotWeather(weather) {
    weatherNum = Number(weather.current.temperature);
    const weatherCode = Number(weather.current.weather_code);
    weatherDesc = String(weather.current.weather_descriptions[0]);

    //the following is setting the Div to different font awesome icons based on weatherCode (weatherCode can be found on line weatherstack.com)
    if (weatherCode == 113){
        Div.html("<i class='fas fa-sun slow-spin'></i>", false);
    }
    else if (weatherCode == 116){
        Div.html("<i class='fas fa-cloud-sun'></i>", false);
    }
    else if (weatherCode == 119 || weatherCode == 122){
        Div.html("<i class='fas fa-cloud'></i>", false);
    }
    else if (weatherCode == 266 || weatherCode == 296) {
        Div.html("<i class='fas fa-cloud-rain'></i>", false);
    }
    else if (weatherCode == 302 || weatherCode == 308){
        Div.html("<i class='fas fa-cloud-showers-heavy'></i>", false);
    }
    else {
        Div.html("<i class='fas fa-sun slow-spin'></i>", false);
    }
}

//creates and returns the current time in hh:mm am/pm format
function weatherTime() {
    let h = hour();
    let m = minute();
    let amPM = 'am';
    if (h > 11) {
        amPM = 'pm';
    }
    if (h%12 == 0) {
        h = 12;
    }
    else {
        h = h % 12;
    }
    if (m < 10) {
        m = '0' + minute();
    }
    return h + ':' + m + ' ' + amPM;
}

//creates and returns the current date in EEE, MMM dd, YYYY (Sun, Oct 2, 2019) format
function weatherDate() {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString("en-US", options);
}
