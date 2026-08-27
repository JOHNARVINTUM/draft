<?php
/**
 * Theme setup.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function draft_theme_setup() {
	load_theme_textdomain( 'draft-theme', DRAFT_THEME_PATH . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo' );

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'draft-theme' ),
			'footer'  => __( 'Footer Menu', 'draft-theme' ),
		)
	);
}
add_action( 'after_setup_theme', 'draft_theme_setup' );
