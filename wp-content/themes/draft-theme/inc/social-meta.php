<?php
/**
 * Social metadata for DRAFT singular content.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Do not compete with a known SEO plugin when one owns social metadata.
 *
 * @return bool
 */
function draft_theme_has_external_social_metadata_owner() {
	return defined( 'WPSEO_VERSION' )
		|| defined( 'RANK_MATH_VERSION' )
		|| defined( 'AIOSEO_VERSION' )
		|| defined( 'SEOPRESS_VERSION' );
}

/**
 * Return a concise social description for a content record.
 *
 * @param WP_Post $post Content record.
 * @return string
 */
function draft_theme_get_social_description( $post ) {
	$description = has_excerpt( $post ) ? get_the_excerpt( $post ) : $post->post_content;
	$description = wp_strip_all_tags( strip_shortcodes( (string) $description ) );

	return wp_trim_words( $description, 35, '' );
}

/**
 * Output one Open Graph and Twitter card metadata set for singular DRAFT content.
 */
function draft_theme_output_social_metadata() {
	if ( draft_theme_has_external_social_metadata_owner() || ! is_singular( array( 'post', 'magazine_issue', 'magazine' ) ) ) {
		return;
	}

	$post = get_queried_object();
	if ( ! $post instanceof WP_Post ) {
		return;
	}

	$content_type = function_exists( 'draft_theme_get_selected_content_type' ) ? draft_theme_get_selected_content_type( $post ) : 'article';
	$url          = function_exists( 'draft_theme_get_contextual_content_url' ) ? draft_theme_get_contextual_content_url( $post, $content_type ) : get_permalink( $post );
	$image_id     = get_post_thumbnail_id( $post );
	$image        = $image_id ? wp_get_attachment_image_src( $image_id, 'full' ) : false;
	$image_url    = $image ? $image[0] : DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
	$title        = get_the_title( $post );
	$description  = draft_theme_get_social_description( $post );

	if ( '' === $description ) {
		$description = get_bloginfo( 'description' );
	}
	?>
	<meta property="og:type" content="article">
	<meta property="og:title" content="<?php echo esc_attr( $title ); ?>">
	<meta property="og:description" content="<?php echo esc_attr( $description ); ?>">
	<meta property="og:url" content="<?php echo esc_url( $url ); ?>">
	<meta property="og:image" content="<?php echo esc_url( $image_url ); ?>">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="<?php echo esc_attr( $title ); ?>">
	<meta name="twitter:description" content="<?php echo esc_attr( $description ); ?>">
	<meta name="twitter:image" content="<?php echo esc_url( $image_url ); ?>">
	<?php
}
add_action( 'wp_head', 'draft_theme_output_social_metadata', 5 );
