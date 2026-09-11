<?php
/**
 * About page template.
 *
 * Template Name: About
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$draft_logo                = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
$draft_about_fallback_hero = DRAFT_THEME_URI . '/assets/images/about-hero.png';
$draft_about_page_id       = get_queried_object_id();
$draft_about_content       = draft_theme_get_about_content( $draft_about_page_id );
$draft_about_main_image    = draft_theme_get_about_image( $draft_about_page_id, 'main' );
$draft_about_bottom_images = draft_theme_get_about_bottom_images( $draft_about_page_id );
$draft_about_title_parts   = preg_split( '/\s+/', trim( $draft_about_content['title'] ), 2 );

$draft_feature_posts = get_posts(
	array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'posts_per_page' => 3,
		'meta_query'     => array(
			array(
				'key'     => '_thumbnail_id',
				'compare' => 'EXISTS',
			),
		),
	)
);

$draft_primary_links = array(
	array( 'label' => __( 'Covers', 'draft-theme' ), 'url' => home_url( '/covers/' ) ),
	array( 'label' => __( 'Magazine', 'draft-theme' ), 'url' => home_url( '/magazines/' ) ),
	array( 'label' => __( 'Article', 'draft-theme' ), 'url' => draft_theme_get_article_archive_url() ),
);

$draft_category_links = array( 'Fashion', 'Beauty', 'Lifestyle', 'Sports', 'Business' );

$draft_strip_images = array();
foreach ( $draft_about_bottom_images as $draft_bottom_image ) {
	if ( ! $draft_bottom_image['id'] ) {
		continue;
	}

	$draft_strip_images[] = array(
		'image_id' => $draft_bottom_image['id'],
		'alt'      => $draft_bottom_image['alt'] ?: $draft_about_content['subtitle'],
	);
}
?>
<section class="draft-about-page" aria-labelledby="draft-about-title">
	<?php if ( $draft_about_main_image['id'] || ! $draft_about_main_image['is_set'] ) : ?>
		<div class="draft-about-hero" aria-label="<?php echo esc_attr( $draft_about_content['title'] ); ?>">
			<?php if ( $draft_about_main_image['id'] ) : ?>
				<?php echo wp_get_attachment_image( $draft_about_main_image['id'], 'full', false, array( 'alt' => $draft_about_content['title'] ) ); ?>
			<?php else : ?>
				<img src="<?php echo esc_url( $draft_about_fallback_hero ); ?>" alt="<?php echo esc_attr( $draft_about_content['title'] ); ?>">
			<?php endif; ?>
			<div class="draft-about-hero__overlay" aria-hidden="true"></div>
		</div>
	<?php endif; ?>

	<section class="draft-about-intro" aria-labelledby="draft-about-title">
		<div class="draft-about-intro__inner">
			<h1 id="draft-about-title">
				<?php if ( isset( $draft_about_title_parts[1] ) ) : ?><span><?php echo esc_html( $draft_about_title_parts[0] . ' ' ); ?></span><?php echo esc_html( $draft_about_title_parts[1] ); ?><?php else : ?><?php echo esc_html( $draft_about_content['title'] ); ?><?php endif; ?>
			</h1>
			<div class="draft-about-intro__content"><?php echo apply_filters( 'the_content', $draft_about_content['content'] ); ?></div>
		</div>
	</section>

	<section class="draft-about-featured" aria-labelledby="draft-about-featured-title">
		<div class="draft-about-featured__inner">
			<div class="draft-about-featured__copy">
				<h2 id="draft-about-featured-title"><?php echo esc_html( $draft_about_content['featured_title'] ); ?></h2>
				<nav class="draft-about-featured__primary-links" aria-label="<?php esc_attr_e( 'Featured sections', 'draft-theme' ); ?>">
					<?php foreach ( $draft_primary_links as $draft_link_index => $draft_link ) : ?>
						<a href="<?php echo esc_url( $draft_link['url'] ); ?>"><?php echo esc_html( $draft_link['label'] ); ?></a>
						<?php if ( $draft_link_index < count( $draft_primary_links ) - 1 ) : ?><span aria-hidden="true">|</span><?php endif; ?>
					<?php endforeach; ?>
				</nav>
				<div class="draft-about-featured__description"><?php echo wpautop( wp_kses_post( $draft_about_content['featured_content'] ) ); ?></div>
				<nav class="draft-about-featured__category-links" aria-label="<?php esc_attr_e( 'Article categories', 'draft-theme' ); ?>">
					<?php foreach ( $draft_category_links as $draft_cat_index => $draft_category ) : ?>
						<a href="<?php echo esc_url( add_query_arg( 'category', $draft_category, draft_theme_get_article_archive_url() ) ); ?>"><?php echo esc_html( $draft_category ); ?></a>
						<?php if ( $draft_cat_index < count( $draft_category_links ) - 1 ) : ?><span aria-hidden="true">|</span><?php endif; ?>
					<?php endforeach; ?>
				</nav>
			</div>

			<div class="draft-about-featured__images" aria-label="<?php esc_attr_e( 'Featured editorial images', 'draft-theme' ); ?>">
				<?php for ( $draft_i = 0; $draft_i < 3; $draft_i++ ) : ?>
					<?php
					$draft_post      = $draft_feature_posts[ $draft_i ] ?? null;
					$draft_image_id  = $draft_post instanceof WP_Post ? get_post_thumbnail_id( $draft_post ) : 0;
					$draft_image_alt = $draft_post instanceof WP_Post ? get_the_title( $draft_post ) : __( 'Featured editorial', 'draft-theme' );
					?>
					<div class="draft-about-featured__image draft-about-featured__image--<?php echo esc_attr( (string) ( $draft_i + 1 ) ); ?>">
						<?php if ( $draft_image_id ) : ?>
							<?php echo wp_get_attachment_image( $draft_image_id, 'large', false, array( 'alt' => $draft_image_alt ) ); ?>
						<?php else : ?>
							<img src="<?php echo esc_url( $draft_about_fallback_hero ); ?>" alt="<?php echo esc_attr( $draft_image_alt ); ?>">
						<?php endif; ?>
						<div class="draft-about-image-overlay" aria-hidden="true"></div>
						<img class="draft-about-image-logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
					</div>
				<?php endfor; ?>
			</div>
		</div>
	</section>

	<section class="draft-about-brand" aria-label="<?php esc_attr_e( 'DRAFT identity', 'draft-theme' ); ?>">
		<div class="draft-about-brand__inner">
			<div class="draft-about-brand__logo"><img src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>"></div>
			<div class="draft-about-brand__divider" aria-hidden="true"></div>
			<div class="draft-about-brand__text">
				<strong><?php echo esc_html( $draft_about_content['brand_title'] ); ?></strong>
				<span><?php echo esc_html( $draft_about_content['brand_subtitle'] ); ?></span>
			</div>
		</div>
	</section>

	<section class="draft-about-strip" aria-label="<?php esc_attr_e( 'Magazine covers', 'draft-theme' ); ?>">
		<?php foreach ( $draft_strip_images as $draft_strip_image ) : ?>
			<div class="draft-about-strip__image">
				<?php if ( $draft_strip_image['image_id'] ) : ?>
					<?php echo wp_get_attachment_image( $draft_strip_image['image_id'], 'large', false, array( 'alt' => $draft_strip_image['alt'] ) ); ?>
				<?php else : ?>
					<img src="<?php echo esc_url( $draft_about_fallback_hero ); ?>" alt="<?php echo esc_attr( $draft_strip_image['alt'] ); ?>">
				<?php endif; ?>
				<div class="draft-about-strip__shade" aria-hidden="true"></div>
				<img class="draft-about-strip__logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
			</div>
		<?php endforeach; ?>
	</section>

	<section class="draft-about-tagline" aria-label="<?php esc_attr_e( 'DRAFT tagline', 'draft-theme' ); ?>">
		<p><?php echo esc_html( $draft_about_content['subtitle'] ); ?></p>
	</section>
</section>
<?php
get_footer();
