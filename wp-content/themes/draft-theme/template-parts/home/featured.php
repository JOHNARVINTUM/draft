<?php
/**
 * Homepage featured editorial block.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_posts = get_posts(
	array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'posts_per_page' => 2,
		'meta_query'     => array(
			array(
				'key'     => '_thumbnail_id',
				'compare' => 'EXISTS',
			),
		),
	)
);
$draft_issue = get_posts(
	array(
		'post_type'      => 'magazine_issue',
		'post_status'    => 'publish',
		'posts_per_page' => 1,
		'meta_key'       => '_magazine_core_issue_number',
		'orderby'        => 'meta_value_num',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	)
);
$draft_primary = array(
	array( 'label' => __( 'Covers', 'draft-theme' ), 'url' => home_url( '/covers/' ) ),
	array( 'label' => __( 'Magazine', 'draft-theme' ), 'url' => home_url( '/magazines/' ) ),
	array( 'label' => __( 'Articles', 'draft-theme' ), 'url' => draft_theme_get_article_archive_url() ),
);
$draft_categories = array( 'Fashion', 'Beauty', 'Lifestyle', 'Sports', 'Business' );
$draft_tiles = array();
if ( ! empty( $draft_posts[0] ) ) {
	$draft_tiles[] = array( 'url' => get_permalink( $draft_posts[0] ), 'image_id' => get_post_thumbnail_id( $draft_posts[0] ), 'title' => get_the_title( $draft_posts[0] ), 'class' => 'draft-home-featured__tile--large' );
}
if ( ! empty( $draft_issue[0] ) ) {
	$draft_issue_data = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issue[0] ) : null;
	$draft_tiles[] = array( 'url' => home_url( '/covers/' . $draft_issue[0]->post_name . '/' ), 'image_id' => $draft_issue_data ? (int) $draft_issue_data['cover_image_id'] : get_post_thumbnail_id( $draft_issue[0] ), 'title' => get_the_title( $draft_issue[0] ), 'class' => '' );
}
if ( ! empty( $draft_posts[1] ) ) {
	$draft_tiles[] = array( 'url' => get_permalink( $draft_posts[1] ), 'image_id' => get_post_thumbnail_id( $draft_posts[1] ), 'title' => get_the_title( $draft_posts[1] ), 'class' => '' );
}
?>
<section class="draft-home-featured">
	<div class="draft-home-container">
		<div class="draft-home-featured__grid">
			<div class="draft-home-featured__copy">
				<div class="draft-home-featured__top">
					<h2><?php esc_html_e( 'Featured', 'draft-theme' ); ?></h2>
					<nav class="draft-home-featured__links" aria-label="<?php esc_attr_e( 'Featured sections', 'draft-theme' ); ?>">
						<?php foreach ( $draft_primary as $draft_index => $draft_link ) : ?>
							<a href="<?php echo esc_url( $draft_link['url'] ); ?>"><?php echo esc_html( $draft_link['label'] ); ?></a><?php if ( $draft_index < count( $draft_primary ) - 1 ) : ?><span>|</span><?php endif; ?>
						<?php endforeach; ?>
					</nav>
					<p><?php esc_html_e( 'Explore the most talked-about articles, exclusive interviews, and trending insights curated by our editors. From fashion and beauty to lifestyle, sports, and business, discover content that inspires, informs, and captivates.', 'draft-theme' ); ?></p>
				</div>
				<nav class="draft-home-featured__cats" aria-label="<?php esc_attr_e( 'Article categories', 'draft-theme' ); ?>">
					<?php foreach ( $draft_categories as $draft_index => $draft_category ) : ?>
						<a href="<?php echo esc_url( add_query_arg( 'category', $draft_category, draft_theme_get_article_archive_url() ) ); ?>"><?php echo esc_html( $draft_category ); ?></a><?php if ( $draft_index < count( $draft_categories ) - 1 ) : ?><span>|</span><?php endif; ?>
					<?php endforeach; ?>
				</nav>
			</div>
			<div class="draft-home-featured__images">
				<?php foreach ( $draft_tiles as $draft_tile ) : ?>
					<a class="draft-home-featured__tile <?php echo esc_attr( $draft_tile['class'] ); ?>" href="<?php echo esc_url( $draft_tile['url'] ); ?>">
						<?php if ( ! empty( $draft_tile['image_id'] ) ) : ?>
							<?php echo wp_get_attachment_image( (int) $draft_tile['image_id'], 'large', false, array( 'alt' => $draft_tile['title'] ) ); ?>
						<?php else : ?>
							<span><?php echo esc_html( $draft_tile['title'] ); ?></span>
						<?php endif; ?>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</section>
