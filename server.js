import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.listen(7777, () => console.log("Server address http://localhost:7777"));

//GET
app.get('/meals', (req, res) => {
    fs.readFile('./meals.json', 'utf8', (err, mealsJson) => {
        if (err) {
            console.log("File read failed in GET /meals: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /meals");
        res.send(mealsJson);
    });
});
//POST
app.post('/meals', (req, res) => {
    fs.readFile('./meals.json', 'utf8', (err, mealsJson) => {
        if (err) {
            console.log("File read failed in POST /orders: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var meals = JSON.parse(mealsJson);
        var meal = meals.find(mealtmp => mealtmp.index_nr == req.body.index_nr);
        if (!meal) {
            meals.push(req.body);
            var newList = JSON.stringify(meals);
            fs.writeFile('./meals.json', newList, err => {
                if (err) {
                    console.log("Error writing file in POST /meals: "+ err);
                    res.status(500).send('Error writing file meals.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file meals.json and added new meal with id = " + req.body.index_nr);
                }
            });
        } else {
            console.log("Meal by id = " + req.body.index_nr + " already exists");
            res.status(500).send('Meal by id = ' + req.body.index_nr + ' already exists');
            return;
        }
    });
});