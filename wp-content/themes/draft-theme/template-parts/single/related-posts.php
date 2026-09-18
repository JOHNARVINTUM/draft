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
$draft_content_type = isset( $args['content_type'] ) ? $args['content_type'] : 'article';
$draft_is_article = 'article' === $draft_content_type;
$draft_related    = $draft_is_article && function_exists( 'magazine_core_get_related_posts' ) ? magazine_core_get_related_posts( $draft_current_id, 3 ) : array();
$draft_logo       = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';

if ( 'cover' === $draft_content_type ) {
	$draft_related = get_posts(
		draft_theme_get_cover_query_args(
			array(
				'posts_per_page' => 3,
				'post__not_in'   => array( $draft_current_id ),
				'no_found_rows'  => true,
			)
		)
	);
} elseif ( ! $draft_is_article ) {
	$draft_related = get_posts(
		array(
			'post_type'      => 'magazine',
			'post_status'    => 'publish',
			'posts_per_page' => 3,
			'post__not_in'   => array( $draft_current_id ),
			'orderby'        => 'date',
			'order'          => 'DESC',
			'no_found_rows'  => true,
		)
	);
}

$draft_heading = array(
	'article'  => __( 'Read More Article', 'draft-theme' ),
	'magazine' => __( 'Read More Magazine', 'draft-theme' ),
	'cover'    => __( 'Read More Cover', 'draft-theme' ),
)[ $draft_content_type ] ?? __( 'Read More Article', 'draft-theme' );
$draft_context_links = array(
	array( 'label' => __( 'Home', 'draft-theme' ), 'url' => home_url( '/' ) ),
);

if ( 'article' !== $draft_content_type ) {
	$draft_context_links[] = array( 'label' => __( 'Articles', 'draft-theme' ), 'url' => draft_theme_get_article_archive_url() );
}
if ( 'magazine' !== $draft_content_type ) {
	$draft_context_links[] = array( 'label' => __( 'Magazine', 'draft-theme' ), 'url' => home_url( '/magazines/' ) );
}
if ( 'cover' !== $draft_content_type ) {
	$draft_context_links[] = array( 'label' => __( 'Cover', 'draft-theme' ), 'url' => home_url( '/covers/' ) );
}

if ( empty( $draft_related ) ) {
	return;
}
?>
<section class="draft-related draft-related-final">
	<div class="draft-related-final__inner">
		<header class="draft-related-final__header">
			<h2><?php echo esc_html( $draft_heading ); ?></h2>
			<nav aria-label="<?php esc_attr_e( 'Related content links', 'draft-theme' ); ?>">
				<?php foreach ( $draft_context_links as $draft_link_index => $draft_context_link ) : ?>
					<a href="<?php echo esc_url( $draft_context_link['url'] ); ?>"><?php echo esc_html( $draft_context_link['label'] ); ?></a>
					<?php if ( $draft_link_index < count( $draft_context_links ) - 1 ) : ?><span>|</span><?php endif; ?>
				<?php endforeach; ?>
			</nav>
		</header>
		<div class="draft-related-final__rule" aria-hidden="true"></div>
		<div class="draft-related-final__grid">
			<?php foreach ( $draft_related as $draft_related_item ) : ?>
				<?php
				$draft_related_post = get_post( $draft_related_item );
				if ( ! $draft_related_post instanceof WP_Post ) {
					continue;
				}
				$draft_media  = function_exists( 'magazine_core_get_post_media' ) ? magazine_core_get_post_media( $draft_related_post->ID, 'large' ) : array();
				$draft_author = 'cover' !== $draft_content_type && function_exists( 'magazine_core_get_author_profile' ) ? magazine_core_get_author_profile( (int) get_post_field( 'post_author', $draft_related_post->ID ) ) : array();
				$draft_issue  = 'cover' === $draft_content_type && function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_related_post ) : null;
				$draft_url    = function_exists( 'draft_theme_get_contextual_content_url' ) ? draft_theme_get_contextual_content_url( $draft_related_post, $draft_content_type ) : get_permalink( $draft_related_post );
				?>
				<a class="draft-related-final-card" href="<?php echo esc_url( $draft_url ); ?>">
					<figure>
						<?php if ( ! empty( $draft_media['has_thumbnail'] ) ) : ?>
							<?php echo get_the_post_thumbnail( $draft_related_post->ID, 'large', array( 'alt' => $draft_media['alt'] ?? get_the_title( $draft_related_post ) ) ); ?>
						<?php else : ?>
							<span><?php echo esc_html( ucfirst( $draft_content_type ) ); ?></span>
						<?php endif; ?>
						<div class="draft-related-final-card__shade" aria-hidden="true"></div>
						<img class="draft-related-final-card__logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
					</figure>
					<h3><?php echo esc_html( get_the_title( $draft_related_post ) ); ?></h3>
					<p class="draft-related-final-card__byline">
						<?php if ( 'cover' !== $draft_content_type ) : ?>
							<?php
							printf(
								/* translators: %s: Content author name. */
								esc_html__( 'by %s', 'draft-theme' ),
								esc_html( $draft_author['name'] ?? get_the_author_meta( 'display_name', (int) get_post_field( 'post_author', $draft_related_post->ID ) ) )
							);
							?>
						<?php elseif ( $draft_issue ) : ?>
							<?php echo esc_html( implode( ' | ', array_filter( array( $draft_issue['issue_label'], $draft_issue['type'] ) ) ) ); ?>
						<?php endif; ?>
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
