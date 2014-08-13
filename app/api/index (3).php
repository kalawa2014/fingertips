<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'api.php';
require 'Slim/Autoloader.php';
require 'Slim/Slim.php';
\Slim\Autoloader::register();
\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();
$api = new API();
/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

// GET route
$app->contentType('application/json');
$app->get('/', function () { //as closure
    echo 'Hello World';
});
$app->get('/slides', 
        function (){
	    echo 'img';			
            $api->getSlides();
        });
$app->get('/activities/:keyboard',  
        function () {
            $api->getActivities($keyboard);
        });
$app->get('/activities/search/:query', 'findByName');

// POST route
$app->post('/wines', 'addWine');
$app->put('/wines/:id', 'updateWine');
$app->delete('/wines/:id', 'deleteWine');

/*$app->post(
    '/post',
    function () {
        echo 'This is a POST route';
    }
);*/

// PUT route
$app->put(
    '/put',
    function () {
        echo 'This is a PUT route';
    }
);

// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete(
    '/slide',
    function () {
        echo 'This is a DELETE route';
    }
);

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */

$app->run();

