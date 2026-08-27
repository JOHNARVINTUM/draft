<?php
/**
 * Featured article rotator slide.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_post_id = get_the_ID();
$draft_media   = function_exists( 'magazine_core_get_post_media' ) ? magazine_core_get_post_media( $draft_post_id, 'large' ) : array();
$draft_cat     = function_exists( 'magazine_core_get_display_category' ) ? magazine_core_get_display_category( $draft_post_id ) : null;
?>
<article class="draft-featured-article" data-draft-featured-slide>
	<div class="draft-featured-article__image">
		<?php if ( ! empty( $draft_media['has_thumbnail'] ) ) : ?>
			<?php echo get_the_post_thumbnail( $draft_post_id, 'large', array( 'alt' => $draft_media['alt'] ?? get_the_title() ) ); ?>
		<?php else : ?>
			<span><?php esc_html_e( 'Article', 'draft-theme' ); ?></span>
		<?php endif; ?>
	</div>
	<div class="draft-featured-article__content">
		<h2><?php the_title(); ?></h2>
		<div class="draft-featured-article__excerpt"><?php the_excerpt(); ?></div>
		<p><?php esc_html_e( 'Published on', 'draft-theme' ); ?> <?php echo esc_html( get_the_date( 'F j Y' ) ); ?></p>
		<?php if ( $draft_cat instanceof WP_Term ) : ?>
			<p><?php echo esc_html( $draft_cat->name ); ?></p>
		<?php endif; ?>
		<div class="draft-featured-article__link"><a href="<?php the_permalink(); ?>"><?php esc_html_e( 'Read Full Article', 'draft-theme' ); ?> -&gt;</a></div>
	</div>
</article>
