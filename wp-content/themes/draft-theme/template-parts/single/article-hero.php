<?php
/**
 * Final DRAFT single article hero image.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_post_id = get_the_ID();
$draft_media   = function_exists( 'magazine_core_get_post_media' ) ? magazine_core_get_post_media( $draft_post_id, 'full' ) : array();
$draft_logo    = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
$draft_cat     = function_exists( 'magazine_core_get_display_category' ) ? magazine_core_get_display_category( $draft_post_id ) : null;
?>
<div class="draft-single-detail__hero-wrap">
	<figure class="draft-single-detail__image draft-single-detail__image--hero">
		<?php if ( ! empty( $draft_media['has_thumbnail'] ) ) : ?>
			<?php echo get_the_post_thumbnail( $draft_post_id, 'full', array( 'alt' => $draft_media['alt'] ?? get_the_title() ) ); ?>
		<?php else : ?>
			<span><?php echo esc_html( $draft_cat instanceof WP_Term ? $draft_cat->name : __( 'Article', 'draft-theme' ) ); ?></span>
		<?php endif; ?>
		<div class="draft-single-detail__image-shade" aria-hidden="true"></div>
		<img class="draft-single-detail__image-logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
		<?php if ( ! empty( $draft_media['caption'] ) ) : ?>
			<figcaption><?php echo esc_html( $draft_media['caption'] ); ?></figcaption>
		<?php endif; ?>
	</figure>
</div>
