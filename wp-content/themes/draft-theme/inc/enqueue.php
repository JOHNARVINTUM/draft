<?php
/**
 * Asset loading.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function draft_theme_enqueue_assets() {
	wp_enqueue_style(
		'draft-theme-fonts',
		'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,700&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400;1,500;1,700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Cactus+Classical+Serif&display=swap',
		array(),
		null
	);

	wp_enqueue_style( 'draft-theme-style', get_stylesheet_uri(), array( 'draft-theme-fonts' ), DRAFT_THEME_VERSION );
	wp_enqueue_script( 'draft-theme-script', DRAFT_THEME_URI . '/assets/js/theme.js', array(), DRAFT_THEME_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'draft_theme_enqueue_assets' );
function draft_theme_enqueue_admin_assets( $hook_suffix ) {
	if ( 'post.php' !== $hook_suffix && 'post-new.php' !== $hook_suffix ) {
		return;
	}

	$screen = get_current_screen();
	if ( ! $screen || 'post' !== $screen->post_type ) {
		return;
	}

	wp_enqueue_media();
	wp_enqueue_script(
		'draft-theme-admin-article-mid-image',
		DRAFT_THEME_URI . '/assets/js/admin-article-mid-image.js',
		array( 'jquery' ),
		DRAFT_THEME_VERSION,
		true
	);
	wp_localize_script(
		'draft-theme-admin-article-mid-image',
		'draftArticleMidImage',
		array(
			'title'  => __( 'Select Article Mid Image', 'draft-theme' ),
			'button' => __( 'Use this image', 'draft-theme' ),
		)
	);
}
add_action( 'admin_enqueue_scripts', 'draft_theme_enqueue_admin_assets' );

