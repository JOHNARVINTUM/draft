<?php
/**
 * Homepage new articles.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_articles = new WP_Query(
	array(
		'post_type'           => 'post',
		'post_status'         => 'publish',
		'posts_per_page'      => 3,
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	)
);
$draft_logo = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
?>
<section class="draft-home-new-articles">
	<div class="draft-home-container">
		<header class="draft-home-section-title">
			<img src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
			<span><?php esc_html_e( 'New Articles', 'draft-theme' ); ?></span>
		</header>

		<?php if ( $draft_articles->have_posts() ) : ?>
			<div class="draft-home-article-grid">
				<?php while ( $draft_articles->have_posts() ) : ?>
					<?php
					$draft_articles->the_post();
					$draft_post_id = get_the_ID();
					$draft_media   = function_exists( 'magazine_core_get_post_media' ) ? magazine_core_get_post_media( $draft_post_id, 'large' ) : array();
					$draft_cat     = function_exists( 'magazine_core_get_display_category' ) ? magazine_core_get_display_category( $draft_post_id ) : null;
					$draft_author  = function_exists( 'magazine_core_get_author_profile' ) ? magazine_core_get_author_profile( (int) get_post_field( 'post_author', $draft_post_id ) ) : array();
					?>
					<a class="draft-home-article-card" href="<?php the_permalink(); ?>">
						<div class="draft-home-article-card__media">
							<?php if ( ! empty( $draft_media['has_thumbnail'] ) ) : ?>
								<?php echo get_the_post_thumbnail( $draft_post_id, 'large', array( 'alt' => $draft_media['alt'] ?? get_the_title() ) ); ?>
							<?php else : ?>
								<span><?php esc_html_e( 'Article', 'draft-theme' ); ?></span>
							<?php endif; ?>
							<div aria-hidden="true"></div>
						</div>
						<div class="draft-home-article-card__body">
							<h2><?php the_title(); ?></h2>
							<p class="draft-home-article-card__byline"><?php esc_html_e( 'Authored by', 'draft-theme' ); ?> <?php echo esc_html( $draft_author['name'] ?? get_the_author() ); ?></p>
							<p class="draft-home-article-card__meta"><?php esc_html_e( 'Published on', 'draft-theme' ); ?> <?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></p>
							<?php if ( $draft_cat instanceof WP_Term ) : ?>
								<p class="draft-home-article-card__meta"><?php echo esc_html( $draft_cat->name ); ?></p>
							<?php endif; ?>
							<div class="draft-home-article-card__excerpt"><?php the_excerpt(); ?></div>
							<span class="draft-home-article-card__link"><?php esc_html_e( 'Read Full Article', 'draft-theme' ); ?> &rarr;</span>
						</div>
					</a>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>
		<?php wp_reset_postdata(); ?>
	</div>
</section>
