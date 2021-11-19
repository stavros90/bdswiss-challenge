<?php 

// Load Stylesheets
function load_stylesheets() {
    // wp_enqueue_style( 'bdswiss-style', get_stylesheet_uri() );
    wp_enqueue_style( 'google-font', 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
    wp_enqueue_style( 'bootstrap-5', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css', array(), '5');
}
add_action('wp_enqueue_scripts', 'load_stylesheets');



// Load Javascripts
function load_javascripts() {
    wp_enqueue_script( 'bdswiss-script', 'http://localhost:8080/app.js', [], '1', true );  
}
add_action('wp_enqueue_scripts', 'load_javascripts');

