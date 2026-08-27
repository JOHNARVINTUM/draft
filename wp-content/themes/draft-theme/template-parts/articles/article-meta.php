<?php
/**
 * Single article meta bar.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_author = function_exists( 'magazine_core_get_author_profile' ) ? magazine_core_get_author_profile( (int) get_post_field( 'post_author', get_the_ID() ) ) : array();
$draft_role   = draft_theme_get_author_role_label( $draft_author );
?>
<div class="draft-single-meta">
	<div class="draft-single-meta__item">
		<span aria-hidden="true">U</span>
		<div>
			<div class="draft-single-meta__primary"><?php echo esc_html( $draft_author['name'] ?? get_the_author() ); ?></div>
			<div class="draft-single-meta__secondary"><?php echo esc_html( $draft_role ); ?></div>
		</div>
	</div>
	<div class="draft-single-meta__item"><span aria-hidden="true">C</span><span><?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></span></div>
	<div class="draft-single-meta__item"><span aria-hidden="true">T</span><span><?php echo esc_html( draft_theme_get_article_read_time() ); ?></span></div>
	<div class="draft-single-meta__actions">
		<button type="button"><?php esc_html_e( 'Share', 'draft-theme' ); ?></button>
		<button type="button"><?php esc_html_e( 'Save', 'draft-theme' ); ?></button>
	</div>
</div>
