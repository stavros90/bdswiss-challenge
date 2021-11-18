<?php 

// Load Stylesheets
function load_stylesheets() {
    // wp_enqueue_style( 'bdswiss-style', get_stylesheet_uri() );
    wp_enqueue_style( 'google-font', 'https://fonts.googleapis.com/css?family=Montserrat:100,300,400,500,700,800,900&display=swap');
}
add_action('wp_enqueue_scripts', 'load_stylesheets');



// Load Javascripts
function load_javascripts() {
    wp_enqueue_script( 'bdswiss-script', 'http://localhost:8080/app.js', [], '1', true );  
}
add_action('wp_enqueue_scripts', 'load_javascripts');

