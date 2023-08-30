import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var time = new Date().getHours();
var day = new Date().getDay();

var week = ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday'];

var weekday = week[day - 1];
var cities = ['delhi',];



app.get('/', async (req, res) => {

    try {

        const result = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + cities[cities.length - 1] + '&appid=170d86d52515b943ca146b51cbcc102d');
        const icons = 'https://openweathermap.org/img/wn/' + result.data.weather[0].icon + '.png';
        const temp = result.data.main.temp;
        const hum = result.data.main.humidity;
        const city = result.data.name;
        const celTemp = Math.floor(temp - 273.15) + 2;
        if (time >= 5 && time < 20) {
            res.render('day.ejs', { ic: icons, te: celTemp, r: result.data.weather, ci: city, we: weekday, hu: hum });
        } else {
            res.render('night.ejs', { ic: icons, te: celTemp, r: result.data.weather, ci: city, we: weekday, hu: hum });
        }
    } catch (error) {
        const result = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=170d86d52515b943ca146b51cbcc102d');
        const icons = 'https://openweathermap.org/img/wn/' + result.data.weather[0].icon + '.png';
        const temp = result.data.main.temp + 1;
        const hum = result.data.main.humidity;
        const city = result.data.name;
        const celTemp = Math.floor(temp - 273.15);
        if (time >= 5 && time < 20) {
            res.render('night.ejs', { ic: icons, te: celTemp, r: result.data.weather, ci: city, we: weekday, hu: hum });
        } else {
            res.render('night.ejs', { ic: icons, te: celTemp, r: result.data.weather, ci: city, we: weekday, hu: hum });
        }
    }

    // const icons = 'https://openweathermap.org/img/wn/04d.png';
    // res.render('night.ejs', { ic: icons, te: '20', ci: 'London&Hoves', we: 'Wednesday', hu: '88' });

});
app.post('/submit', async (req, res) => {
    var city = req.body.cityName;
    cities.push(city);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Running on localhost:${port}`);
});
//{"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":289.64,"feels_like":289.69,"temp_min":288.31,"temp_max":290.45,"pressure":1019,"humidity":90},"visibility":10000,"wind":{"speed":3.09,"deg":250},"clouds":{"all":66},"dt":1692687312,"sys":{"type":2,"id":2075535,"country":"GB","sunrise":1692680198,"sunset":1692731445},"timezone":3600,"id":2643743,"name":"London","cod":200}