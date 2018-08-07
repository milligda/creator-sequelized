// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

var express = require('express');
var router = express.Router();

var db = require('../models');

var newWorld = require('../creator_app/create-world.js');

// ===============================================================================
// Routing
// ===============================================================================

// route to the creator url
router.get('/', function (req, res) {

    // get all the worlds from the database 
    db.World.findAll({}).then(function(data) {

        // create the display object for handlebars
        var displayObj = {
            worlds: data,
        };

        // create the home page using index.handlebars and pass in the displayObj with the world information
        res.render('creator', displayObj);
    });
});

// route to the creator url
router.get('/destroyer', function (req, res) {

    // get all the worlds from the database (via the orm which is called in the world.js file) 
    db.World.findAll({}).then(function(data) {

        // create the display object for handlebars
        var displayObj = {
            worlds: data,
        };

        // create the destroy page using index.handlebars and pass in the displayObj with the world information
        res.render('destroyer', displayObj);
    });
});

// route for creating a new world
router.post('/api/create', function (req, res) {

    db.World.create(newWorld.createWorld()).then(function(data) {
        res.json(data);
    });
});

// route for getting images
router.get('/api/images', function (req, res) {

    db.World.findAll({}).then(function(data) {
        res.json(data);
    });
});

// route for updating world to destroyed
router.put('/api/world/:id', function (req, res) {

    db.World.update({
        destroyed: req.body.destroyed
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;