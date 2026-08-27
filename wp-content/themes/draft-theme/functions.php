<?php
/**
 * DRAFT Theme bootstrap.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DRAFT_THEME_VERSION', '0.1.0' );
define( 'DRAFT_THEME_PATH', get_template_directory() );
define( 'DRAFT_THEME_URI', get_template_directory_uri() );

require_once DRAFT_THEME_PATH . '/inc/setup.php';
require_once DRAFT_THEME_PATH . '/inc/enqueue.php';
require_once DRAFT_THEME_PATH . '/inc/articles.php';


/**
 * Return small inline social icons used by the DRAFT frontend shell.
 *
 * @param string $name Icon name.
 * @return string
 */
function draft_theme_get_social_icon( $name ) {
	$icons = array(
		'facebook'  => '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
		'instagram' => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
		'tiktok'    => '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.04-7.13a8.26 8.26 0 0 0 4.83 1.54V6.27a4.85 4.85 0 0 1-1.02-.07z"/></svg>',
	);

	return $icons[ $name ] ?? '';
}
