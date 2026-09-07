<?php
/**
 * Homepage hero slider.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_sticky_ids = array_filter( array_map( 'absint', (array) get_option( 'sticky_posts', array() ) ) );

$draft_posts = $draft_sticky_ids ? get_posts(
	array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'post__in'       => $draft_sticky_ids,
		'posts_per_page' => -1,
		'orderby'        => 'post__in',
		'no_found_rows'  => true,
	)
	) : array();
$draft_slides = array();

foreach ( $draft_posts as $draft_post ) {
	$draft_image_id = get_post_thumbnail_id( $draft_post );
	$draft_slides[] = array(
		'image_id'  => $draft_image_id,
		'image_url' => $draft_image_id ? '' : DRAFT_THEME_URI . '/assets/images/draft-home-hero.png',
		'url'       => get_permalink( $draft_post ),
		'badge'     => __( 'Article', 'draft-theme' ),
		'title'     => get_the_title( $draft_post ),
		'subtitle'  => get_the_excerpt( $draft_post ),
	);
}
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
