<?php
/**
 * Homepage hero slider.
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
		'posts_per_page' => 3,
		'ignore_sticky_posts' => false,
		'orderby'        => 'date',
		'order'          => 'DESC',
		'meta_query'     => array(
			array(
				'key'     => '_thumbnail_id',
				'compare' => 'EXISTS',
			),
		),
	)
);
$draft_issues     = get_posts(
	array(
		'post_type'      => 'magazine_issue',
		'post_status'    => 'publish',
		'posts_per_page' => 3,
		'meta_key'       => '_magazine_core_issue_number',
		'orderby'        => 'meta_value_num',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	)
);


if ( ! empty( $draft_posts[0] ) ) {
	$draft_slides = array();
	$draft_slides[] = array(
		'image_id'  => get_post_thumbnail_id( $draft_posts[0] ),
		'image_url' => '',
		'url'       => get_permalink( $draft_posts[0] ),
		'badge'     => __( 'Article', 'draft-theme' ),
		'title'     => get_the_title( $draft_posts[0] ),
		'subtitle'  => get_the_excerpt( $draft_posts[0] ),
	);
} else {
	$draft_slides = array();
}

if ( ! empty( $draft_issues[0] ) ) {
	$draft_issue_data = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issues[0] ) : null;
	if ( $draft_issue_data ) {
		$draft_slides[] = array(
			'image_id'  => (int) $draft_issue_data['cover_image_id'],
			'image_url' => '',
			'url'       => home_url( '/covers/' . $draft_issues[0]->post_name . '/' ),
			'badge'     => __( 'Cover', 'draft-theme' ),
			'title'     => $draft_issue_data['title'],
			'subtitle'  => $draft_issue_data['subtitle'] ?: $draft_issue_data['publication_date'],
		);
	}
}

if ( ! empty( $draft_issues[1] ) ) {
	$draft_issue_data = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issues[1] ) : null;
	if ( $draft_issue_data ) {
		$draft_slides[] = array(
			'image_id'  => (int) $draft_issue_data['cover_image_id'],
			'image_url' => '',
			'url'       => get_permalink( $draft_issues[1] ),
			'badge'     => __( 'Magazine', 'draft-theme' ),
			'title'     => $draft_issue_data['title'],
			'subtitle'  => $draft_issue_data['subtitle'] ?: $draft_issue_data['publication_date'],
		);
	}
}

if ( ! empty( $draft_posts[1] ) ) {
	$draft_slides[] = array(
		'image_id'  => get_post_thumbnail_id( $draft_posts[1] ),
		'image_url' => '',
		'url'       => get_permalink( $draft_posts[1] ),
		'badge'     => __( 'Article', 'draft-theme' ),
		'title'     => get_the_title( $draft_posts[1] ),
		'subtitle'  => get_the_excerpt( $draft_posts[1] ),
	);
}

if ( ! empty( $draft_issues[2] ) ) {
	$draft_issue_data = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issues[2] ) : null;
	if ( $draft_issue_data ) {
		$draft_slides[] = array(
			'image_id'  => (int) $draft_issue_data['cover_image_id'],
			'image_url' => '',
			'url'       => home_url( '/covers/' . $draft_issues[2]->post_name . '/' ),
			'badge'     => __( 'Cover', 'draft-theme' ),
			'title'     => $draft_issue_data['title'],
			'subtitle'  => $draft_issue_data['subtitle'] ?: $draft_issue_data['publication_date'],
		);
	}
}
$draft_slides = array_slice( $draft_slides, 0, 6 );
?>
<section class="draft-home-hero" data-draft-home-hero>
	<?php foreach ( $draft_slides as $draft_index => $draft_slide ) : ?>
		<a class="draft-home-hero__slide<?php echo 0 === $draft_index ? ' is-active' : ''; ?>" href="<?php echo esc_url( $draft_slide['url'] ); ?>" data-draft-home-hero-slide>
			<?php if ( ! empty( $draft_slide['image_id'] ) ) : ?>
				<?php echo wp_get_attachment_image( (int) $draft_slide['image_id'], 'full', false, array( 'alt' => '' ) ); ?>
			<?php else : ?>
				<img src="<?php echo esc_url( $draft_slide['image_url'] ); ?>" alt="">
			<?php endif; ?>
			<div class="draft-home-hero__shade draft-home-hero__shade--side" aria-hidden="true"></div>
			<div class="draft-home-hero__shade draft-home-hero__shade--bottom" aria-hidden="true"></div>
			<div class="draft-home-hero__content">
				<div class="draft-home-container">
					<div class="draft-home-hero__copy">
						<span><?php echo esc_html( $draft_slide['badge'] ); ?></span>
						<h1><?php echo esc_html( $draft_slide['title'] ); ?></h1>
						<p><?php echo esc_html( wp_strip_all_tags( $draft_slide['subtitle'] ) ); ?></p>
						<span class="draft-home-hero__cta"><?php esc_html_e( 'Explore Articles', 'draft-theme' ); ?><svg class="draft-home-cta-arrow draft-home-cta-arrow--hero" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></span>
					</div>
				</div>
			</div>
		</a>
	<?php endforeach; ?>
	<div class="draft-home-hero__dots" role="tablist" aria-label="<?php esc_attr_e( 'Featured homepage slides', 'draft-theme' ); ?>">
		<?php foreach ( $draft_slides as $draft_index => $draft_slide ) : ?>
			<button class="<?php echo 0 === $draft_index ? 'is-active' : ''; ?>" type="button" aria-label="<?php echo esc_attr( sprintf( __( 'Go to slide %d', 'draft-theme' ), $draft_index + 1 ) ); ?>" data-draft-home-hero-dot="<?php echo esc_attr( (string) $draft_index ); ?>"></button>
		<?php endforeach; ?>
	</div>
</section>
