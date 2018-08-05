// ==============================================================================
// Set Global Variables
// ==============================================================================

var carousel;
var modalOpen = false;
var openModalName = '';

// ==============================================================================
// functions for displaying the container and switch div when the page loads
// ==============================================================================

// display the main container
function displayContainer() {
    $('.container').fadeIn(750);
}

// display the switch div
function displaySwitch() {
    $('#switch-container').fadeIn(1500);
}

// display the worlds container div
function displayWorlds() {
    setTimeout(function() {
        $('#worlds-container').fadeTo(750, 1);
    }, 1000);
}

// hide the worlds container div
function hideWorlds() {
    $('#worlds-container').fadeTo(500, 0);
}

// on the page load, call display functions
$(function() {
    setTimeout(displayContainer, 1000);
    setTimeout(displaySwitch, 2000);
    initializeCarousel();
});

// ==============================================================================
// Carousel Controls
// Initialize the flickity carousel, populate it and restart it
// ==============================================================================

function initializeCarousel() {
    carousel = $(".worlds-carousel").flickity({
        freeScroll: true,
        wrapAround: true,
        autoPlay: 1500,
        imagesLoaded: true,
        pageDots: false,
        prevNextButtons: false,
        pauseAutoPlayOnHover: true,
        draggable: false
    });

    getWorldImages();
}

function getWorldImages() {

    // get the worlds data
    $.get('/api/images', function (worlds) {

        // clear the flickity container before populating it
        carousel.flickity('remove', $('.carousel-cell'));

        // display the container
        displayWorlds();

        // for each world, check if the world was destroyed.  
        // if not, create the carousel container for the image and add it to the carousel
        for (var i = 0; i < worlds.length; i++) {

            if (! worlds[i].destroyed) {
                var carouselCell = $('<div class="carousel-cell">');
                var carouselImage = $('<img class="world-image">');
                carouselImage.attr('src', '/assets/images/' + worlds[i].image_slug + '.jpg');
                carouselImage.attr('data-id', worlds[i].id);
                carouselImage.appendTo(carouselCell);
                carousel.flickity('append', carouselCell);
            }
        }
    });
}

function restartCarousel() {
    carousel.flickity('playPlayer');
}

// ==============================================================================
// Displaying world data side modals
// ==============================================================================

function openSideData() {

    modalOpen = true;
    var currentModal = document.getElementById(openModalName + "-data-modal");
    
    // set the width of the side modal so that it is displayed
    currentModal.style.left = "0";

    // add the sidemodal-backdrop class to create a dark opaque background behind the side modal
    $(".side-modal-bg").addClass("side-modal-backdrop");

    // add focus to the open modal
    currentModal.focus();

    // prevent body from being scrollable
    $("body").addClass('lock-scroll');

}

function closeSideData() {

    modalOpen = false;
    var currentModal = document.getElementById(openModalName + "-data-modal");

    // move the side modal so that it is off the screen. The number of pixels must be equal to or greater than what is set in the styles.css
    currentModal.style.left = "-350px";
    $(".side-modal-bg").removeClass("side-modal-backdrop");

    // remove the lock-scroll class
    $("body").removeClass('lock-scroll');

    // carousel autoplay stops when an image has been clicked and needs to be restarted
    restartCarousel();

    // reset the openModalName
    openModalName = "";
}

// ==============================================================================
// Event Listeners
// ==============================================================================

// create world listener
$(document).on('click', '#create-button', function() {

    $.post('/api/create', function(response) {

        // page has to be reloaded so that the new world data modal is created
        location.reload();
    });
});

// destroy world button listener
$(document).on('click', '.destroy-button', function() {

    // store the id for the button
    var id = $(this).data('id');

    var newDestroyedState = {
        destroyed: true
    }

    $.ajax('/api/world/' + id, {
        type: "PUT",
        data: newDestroyedState
    }).then(function() {
        console.log('destroyed world: ' + id);

        // close the side modal
        closeSideData();

        // hide the worlds container
        hideWorlds();

        // load the updated worlds
        getWorldImages();
    })
    
});

// open world data side modal listener
$(document).on('click', '.world-image', function() {

    // get the id for the image
    var worldId = $(this).attr('data-id');

    openModalName = worldId;

    // pass the id into the openSideData function
    openSideData();
});

// close world data side modal keyCode listener
$(document).keyup(function(e) {
    if (modalOpen && e.keyCode === 27) {
        closeSideData();
    }
});

// close world data side modal on esc. key click
$('.side-modal-bg').mousedown(function(e) {

    var currentModal = document.getElementById(openModalName + "-data-modal");

    if (! $(e.target).is(currentModal)) {
        closeSideData();
    } 
});