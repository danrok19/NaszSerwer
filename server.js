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


//DO REACT------------------------------------------------------------------------
//GET
app.get('/react', (req, res) => {
    fs.readFile('./react.json', 'utf8', (err, reactJson) => {
        if (err) {
            res.status(500).send('File read React failed');
            return;
        }
        res.send(reactJson);
    });
});

app.post('/react', (req, res) => {
    fs.readFile('./react.json', 'utf8', (err, reactJson) => {
        if (err) {
            res.status(500).send('File read failed');
            return;
        }
        var reactlocal = JSON.parse(reactJson);
        var react = reactlocal.find(reacttmp => reacttmp.Id == req.body.Id);
        if (!react) {
            reactlocal.push(req.body);
            var newList = JSON.stringify(reactlocal);
            fs.writeFile('./react.json', newList, err => {
                if (err) {
                    res.status(500).send('Error writing file react.json');
                } else {
                    res.status(201).send(req.body);
                }
            });
        } else {
            res.status(500).send('Question by Id = ' + req.body.Id + ' already exists');
            return;
        }
    });
});

app.put('/react/:Id', (req, res) => {
    fs.readFile('./react.json', 'utf8', (err, reactJson) => {
        if (err) {
            res.status(500).send('File read failed');
            return;
        }
        var reactlocal = JSON.parse(reactJson);
        var reactBody = reactlocal.find(reacttmp => reacttmp.Id == req.body.Id);
        if (reactBody && reactBody.Id != req.params.Id) {
            res.status(500).send('Question by Id = ' + reactBody.Id + ' already exists');
            return;
        }
        var react = reactlocal.find(reacttmp => reacttmp.Id == req.params.Id);
        if (!react) {
            reactlocal.push(req.body);
            var newList = JSON.stringify(reactlocal);
            fs.writeFile('./react.json', newList, err => {
                if (err) {
                    res.status(500).send('Error writing file react.json');
                } else {
                    res.status(201).send(req.body);
                }
            });
        } else {
            for (var i = 0; i < reactlocal.length; i++) {
                if (reactlocal[i].Id == react.Id) {
                    reactlocal[i] = req.body;
                }
            }
            var newList = JSON.stringify(reactlocal);
            fs.writeFile('./react.json', newList, err => {
                if (err) {
                    res.status(500).send('Error writing file react.json');
                } else {
                    res.status(200).send(req.body);
                }
            });
        }
    });
});

app.delete('/react/:Id', (req, res) => {
    fs.readFile('./react.json', 'utf8', (err, reactJson) => {
        if (err) {
            res.status(500).send('File read failed');
            return;
        }
        var react = JSON.parse(reactJson);
        var reactIndex = react.findIndex(reacttmp => reacttmp.Id == req.params.Id);
        if (reactIndex != -1) {
            react.splice(reactIndex, 1);
            var newList = JSON.stringify(react);
            fs.writeFile('./react.json', newList, err => {
                if (err) {
                    res.status(500).send('Error writing file react.json');
                } else {
                    res.status(204).send();
                }
            });
        } else {
            res.status(500).send('Question by Id = ' + req.params.Id + ' does not exists');
            return;
        }
    });
});



//DO angular------------------------------------------------------------------------
app.get('/angular', (req, res) => {
    fs.readFile('./angular.json', 'utf8', (err, angularJson) => {
        if (err) {
            console.log("File read failed in GET /angular: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /angular");
        res.send(angularJson);
    });
});

app.post('/angular', (req, res) => {
    fs.readFile('./angular.json', 'utf8', (err, angularJson) => {
        if (err) {
            console.log("File read failed in POST: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var angularlocal = JSON.parse(angularJson);
        var angular = angularlocal.find(angulartmp => angulartmp.Id == req.body.Id);
        if (!angular) {
            angularlocal.push(req.body);
            var newList = JSON.stringify(angularlocal);
            fs.writeFile('./angular.json', newList, err => {
                if (err) {
                    console.log("Error writing file in POST /angular: "+ err);
                    res.status(500).send('Error writing file angular.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file angular.json and added new react with id = " + req.body.Id);
                }
            });
        } else {
            console.log("angular by id = " + req.body.Id + " already exists");
            res.status(500).send('angular by id = ' + req.body.Id + ' already exists');
            return;
        }
    });
});

app.delete('/angular/:Id', (req, res) => {
    fs.readFile('./angular.json', 'utf8', (err, angularJson) => {
        if (err) {
            console.log("File read failed in DELETE /angular: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var angular = JSON.parse(angularJson);
        var angularIndex = angular.findIndex(angulartmp => angulartmp.Id == req.params.Id);
        if (angularIndex != -1) {
            angular.splice(angularIndex, 1);
            var newList = JSON.stringify(angular);
            fs.writeFile('./angular.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /angular/" + req.params.Id+": "+ err);
                    res.status(500).send('Error writing file angular.json');
                } else {
                    res.status(204).send();
                    console.log("Successfully deleted angular with Id = " + req.params.Id);
                }
            });
        } else {
            console.log("Order by Id = " + req.params.Id + " does not exists");
            res.status(500).send('Order by Id = ' + req.params.Id + ' does not exists');
            return;
        }
    });
});

app.put('/angular/:Id', (req, res) => {
    fs.readFile('./angular.json', 'utf8', (err, angularJson) => {
        if (err) {
            console.log("File read failed in PUT /angular/" + req.params.Id+": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var angularlocal = JSON.parse(angularJson);
        var angularBody = angularlocal.find(angulartmp => angulartmp.Id == req.body.Id);
        if (angularBody && angularBody.Id != req.params.Id) {
            console.log("angular by Id = " + angularBody.Id + " already exists");
            res.status(500).send('angular by Id = ' + angularBody.Id + ' already exists');
            return;
        }
        var angular = angularlocal.find(angulartmp => angulartmp.Id == req.params.Id);
        if (!angular) {
            angularlocal.push(req.body);
            var newList = JSON.stringify(angularlocal);
            fs.writeFile('./angular.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /angular/" + req.params.Id+": "+err);
                    res.status(500).send('Error writing file angular.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file angular.json and added new angular with Id = " + req.body.Id);
                }
            });
        } else {
            for (var i = 0; i < angularlocal.length; i++) {
                if (angularlocal[i].Id == angular.Id) {
                    angularlocal[i] = req.body;
                }
            }
            var newList = JSON.stringify(angularlocal);
            fs.writeFile('./angular.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /angular/" + req.params.Id+": "+ err);
                    res.status(500).send('Error writing file orders.json');
                } else {
                    res.status(200).send(req.body);
                    console.log("Successfully wrote file angular.json and edit order with old Id = " + req.params.Id);
                }
            });
        }
    });
});