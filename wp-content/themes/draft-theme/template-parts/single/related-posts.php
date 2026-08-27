<?php
/**
 * Final DRAFT related posts block.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_current_id = get_the_ID();
$draft_related    = function_exists( 'magazine_core_get_related_posts' ) ? magazine_core_get_related_posts( $draft_current_id, 3 ) : array();
$draft_logo       = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';

if ( empty( $draft_related ) ) {
	return;
}
?>
<section class="draft-related draft-related-final">
	<div class="draft-related-final__inner">
		<header class="draft-related-final__header">
			<h2><?php esc_html_e( 'Read More Article', 'draft-theme' ); ?></h2>
			<nav aria-label="<?php esc_attr_e( 'Related article links', 'draft-theme' ); ?>">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'draft-theme' ); ?></a>
				<span>|</span>
				<a href="<?php echo esc_url( home_url( '/magazines/' ) ); ?>"><?php esc_html_e( 'Magazine', 'draft-theme' ); ?></a>
				<span>|</span>
				<a href="<?php echo esc_url( home_url( '/covers/' ) ); ?>"><?php esc_html_e( 'Cover', 'draft-theme' ); ?></a>
			</nav>
		</header>
		<div class="draft-related-final__rule" aria-hidden="true"></div>
		<div class="draft-related-final__grid">
			<?php foreach ( $draft_related as $draft_related_id ) : ?>
				<?php
				$draft_related_post = get_post( $draft_related_id );
				if ( ! $draft_related_post instanceof WP_Post ) {
					continue;
				}
				$draft_media  = function_exists( 'magazine_core_get_post_media' ) ? magazine_core_get_post_media( $draft_related_post->ID, 'large' ) : array();
				$draft_author = function_exists( 'magazine_core_get_author_profile' ) ? magazine_core_get_author_profile( (int) get_post_field( 'post_author', $draft_related_post->ID ) ) : array();
				?>
				<a class="draft-related-final-card" href="<?php echo esc_url( get_permalink( $draft_related_post ) ); ?>">
					<figure>
						<?php if ( ! empty( $draft_media['has_thumbnail'] ) ) : ?>
							<?php echo get_the_post_thumbnail( $draft_related_post->ID, 'large', array( 'alt' => $draft_media['alt'] ?? get_the_title( $draft_related_post ) ) ); ?>
						<?php else : ?>
							<span><?php esc_html_e( 'Article', 'draft-theme' ); ?></span>
						<?php endif; ?>
						<div class="draft-related-final-card__shade" aria-hidden="true"></div>
						<img class="draft-related-final-card__logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
					</figure>
					<h3><?php echo esc_html( get_the_title( $draft_related_post ) ); ?></h3>
					<p class="draft-related-final-card__byline">
						<?php
						printf(
							/* translators: %s: Article author name. */
							esc_html__( 'by %s', 'draft-theme' ),
							esc_html( $draft_author['name'] ?? get_the_author_meta( 'display_name', (int) get_post_field( 'post_author', $draft_related_post->ID ) ) )
						);
						?>
					</p>
					<p class="draft-related-final-card__date">
						<?php
						printf(
							/* translators: %s: Article publication date. */
							esc_html__( 'Published on %s', 'draft-theme' ),
							esc_html( get_the_date( 'F j, Y', $draft_related_post ) )
						);
						?>
					</p>
					<p class="draft-related-final-card__excerpt"><?php echo esc_html( get_the_excerpt( $draft_related_post ) ); ?></p>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>
