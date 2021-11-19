<?php // Functions

require_once get_template_directory() . '/includes/enqueue-scripts.php';
require_once get_template_directory() . '/includes/theme-support.php';


//This file is needed to be able to use the wp_rss() function.
include_once(ABSPATH.WPINC.'/rss.php');
 
function readRss($atts) {
    extract(shortcode_atts(array(
        "source" => 'http://',
        "posts_limit" => '1',
    ), $atts));

    return wp_rss($source, $posts_limit);
}
 
add_shortcode('rss', 'readRss');