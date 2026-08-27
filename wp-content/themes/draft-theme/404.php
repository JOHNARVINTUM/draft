<?php
/**
 * 404 template.
 *
 * @package Draft_Theme
 */

get_header();
?>
<section class="draft-placeholder">
	<div class="draft-placeholder__inner">
		<p class="draft-placeholder__eyebrow"><?php esc_html_e( '404', 'draft-theme' ); ?></p>
		<h1><?php esc_html_e( 'Page not found', 'draft-theme' ); ?></h1>
		<p><?php esc_html_e( 'The page you are looking for does not exist.', 'draft-theme' ); ?></p>
		<a class="draft-button" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back Home', 'draft-theme' ); ?></a>
	</div>
</section>
<?php
get_footer();
