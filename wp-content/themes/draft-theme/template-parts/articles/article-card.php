<?php
/**
 * DRAFT article card.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_post_id = get_the_ID();
$draft_media   = function_exists( 'magazine_core_get_post_media' ) ? magazine_core_get_post_media( $draft_post_id, 'large' ) : array();
$draft_cat     = function_exists( 'magazine_core_get_display_category' ) ? magazine_core_get_display_category( $draft_post_id ) : null;
$draft_author  = function_exists( 'magazine_core_get_author_profile' ) ? magazine_core_get_author_profile( (int) get_post_field( 'post_author', $draft_post_id ) ) : array();
?>
<article class="draft-article-card">
	<a class="draft-article-card__media" href="<?php the_permalink(); ?>">
		<?php if ( ! empty( $draft_media['has_thumbnail'] ) ) : ?>
			<?php echo get_the_post_thumbnail( $draft_post_id, 'large', array( 'alt' => $draft_media['alt'] ?? get_the_title() ) ); ?>
		<?php else : ?>
			<span><?php esc_html_e( 'Article', 'draft-theme' ); ?></span>
		<?php endif; ?>
	</a>
	<div class="draft-article-card__body">
		<h2 class="draft-article-card__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<p class="draft-article-card__byline"><?php esc_html_e( 'Authored by', 'draft-theme' ); ?> <?php echo esc_html( $draft_author['name'] ?? get_the_author() ); ?></p>
		<p class="draft-article-card__meta"><?php esc_html_e( 'Published on', 'draft-theme' ); ?> <?php echo esc_html( get_the_date( 'F j Y' ) ); ?></p>
		<?php if ( $draft_cat instanceof WP_Term ) : ?>
			<p class="draft-article-card__meta"><?php echo esc_html( $draft_cat->name ); ?></p>
		<?php endif; ?>
		<div class="draft-article-card__excerpt"><?php the_excerpt(); ?></div>
		<div class="draft-article-card__action">
			<a href="<?php the_permalink(); ?>"><?php esc_html_e( 'Read Full Article', 'draft-theme' ); ?><span aria-hidden="true">-&gt;</span></a>
		</div>
	</div>
</article>
