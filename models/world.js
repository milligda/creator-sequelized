// ==============================================================================
// Required files
// ==============================================================================

var orm = require('../config/orm.js');

// ==============================================================================
// world Object
// ==============================================================================

var world = {

    getAll: function(cb) {
        orm.getAll('worlds', function(res) {
            cb(res);
        });
    },

    addWorld: function(cb) {
        var newWorld = this.createWorld();

        orm.add('worlds', newWorld, function(res) {
            cb(res);
        });
    },

    updateWorld: function(update, condition, cb) {

        orm.update('worlds', update, condition, function(res) {
            cb(res);
        });
    },

    classifications: [
        'star',
        'gaseous',
        'icy',
        'terrestrial',
        'oceanic',
        'rocky'
    ],

    createWorld: function() {

        var name = '';
        var worldType = '';
        var classification = '';
        var life = false;
        var intelligentLife = false;
        var imageSlug = '';

        // randomly determine the world type and classification
        var randomType = Math.floor(Math.random() * this.classifications.length);

        // randomly determine if the planet has life
        var randomLife = Math.floor(Math.random() * 100) + 1;

        // randomly determine the number for the world image (between 1 and 2)
        var randomImage = Math.floor(Math.random() * 2) + 1;

        // randomly determine the number for the planet name
        var randomName = Math.floor(Math.random() *  10000) + 1;

        // determine if the world type is a star or planet
        if (randomType === 0) {
            worldType = 'star';
        } else {
            worldType = 'planet';
        }

        // assign the classification
        classification = this.classifications[randomType];

        // assign the name based on the classification and a random number
        name = classification + '_' + randomName;

        // determine if there is life on the planet
        if ((classification === 'terrestrial' || classification === 'oceanic') && (randomLife > 60)) {
            life = true;
        } 

        // determine if there is intelligent life on the planet
        if ((classification === 'terrestrial' || classification === 'oceanic') && (randomLife > 90)) {
            intelligentLife = true;
        }

        // create the image slug
        imageSlug = classification + randomImage;

        // create the newWorld object and return it
        var newWorld = {
            world_name: name,
            world_type: worldType,
            classification: classification,
            life: life,
            intelligent_life: intelligentLife,
            image_slug: imageSlug
        }

        return newWorld;
    }
}

// export the world object
module.exports = world;