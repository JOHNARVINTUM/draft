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

$draft_logo       = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
$draft_about_hero = DRAFT_THEME_URI . '/assets/images/about-hero.png';

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

$draft_strip_issues = get_posts(
	array(
		'post_type'      => 'magazine_issue',
		'post_status'    => 'publish',
		'posts_per_page' => 4,
		'meta_key'       => '_magazine_core_issue_number',
		'orderby'        => 'meta_value_num',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	)
);

$draft_primary_links = array(
	array( 'label' => __( 'Covers', 'draft-theme' ), 'url' => home_url( '/covers/' ) ),
	array( 'label' => __( 'Magazine', 'draft-theme' ), 'url' => home_url( '/magazines/' ) ),
	array( 'label' => __( 'Article', 'draft-theme' ), 'url' => draft_theme_get_article_archive_url() ),
);

$draft_category_links = array( 'Fashion', 'Beauty', 'Lifestyle', 'Sports', 'Business' );
?>
<section class="draft-about-page" aria-labelledby="draft-about-title">
	<div class="draft-about-hero" aria-label="<?php esc_attr_e( 'DRAFT', 'draft-theme' ); ?>">
		<img src="<?php echo esc_url( $draft_about_hero ); ?>" alt="<?php esc_attr_e( 'DRAFT', 'draft-theme' ); ?>">
		<div class="draft-about-hero__overlay" aria-hidden="true"></div>
	</div>

	<section class="draft-about-intro" aria-labelledby="draft-about-title">
		<div class="draft-about-intro__inner">
			<h1 id="draft-about-title"><span><?php esc_html_e( 'About ', 'draft-theme' ); ?></span><?php esc_html_e( 'DRAFT', 'draft-theme' ); ?></h1>
			<p><?php esc_html_e( 'DRAFT is a bold, digital hub serving up stylish, unfiltered stories about the athletes and gamers you love - by fans, for fans. Built for those who live for the game and the personalities behind it, DRAFT connects sports culture with style, attitude, and community.', 'draft-theme' ); ?></p>
		</div>
	</section>

	<section class="draft-about-featured" aria-labelledby="draft-about-featured-title">
		<div class="draft-about-featured__inner">
			<div class="draft-about-featured__copy">
				<h2 id="draft-about-featured-title"><?php esc_html_e( 'Featured', 'draft-theme' ); ?></h2>
				<nav class="draft-about-featured__primary-links" aria-label="<?php esc_attr_e( 'Featured sections', 'draft-theme' ); ?>">
					<?php foreach ( $draft_primary_links as $draft_link_index => $draft_link ) : ?>
						<a href="<?php echo esc_url( $draft_link['url'] ); ?>"><?php echo esc_html( $draft_link['label'] ); ?></a>
						<?php if ( $draft_link_index < count( $draft_primary_links ) - 1 ) : ?><span aria-hidden="true">|</span><?php endif; ?>
					<?php endforeach; ?>
				</nav>
				<p><?php esc_html_e( 'Explore the most talked-about articles, exclusive interviews, and trending insights curated by our editors. From fashion and beauty to lifestyle, sports, and business, discover content that inspires, informs, and captivates.', 'draft-theme' ); ?></p>
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
							<img src="<?php echo esc_url( $draft_about_hero ); ?>" alt="<?php echo esc_attr( $draft_image_alt ); ?>">
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
				<strong><?php esc_html_e( 'draft ph', 'draft-theme' ); ?></strong>
				<span><?php esc_html_e( 'Youth Culture Journal', 'draft-theme' ); ?></span>
			</div>
		</div>
	</section>

	<section class="draft-about-strip" aria-label="<?php esc_attr_e( 'Magazine covers', 'draft-theme' ); ?>">
		<?php foreach ( $draft_strip_issues as $draft_strip_index => $draft_issue ) : ?>
			<?php if ( 3 === $draft_strip_index ) : ?>
				<div class="draft-about-strip__quote">
					<div class="draft-about-strip__mark" aria-hidden="true">&quot;</div>
					<p><?php esc_html_e( 'I TRAIN HARD TO BE THE BEST ME - ALWAYS ONE STEP AHEAD, JUST FOR YOU.', 'draft-theme' ); ?></p>
					<div class="draft-about-strip__bars" aria-hidden="true"><span></span><span></span><span></span></div>
					<img src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
				</div>
			<?php endif; ?>
			<?php
			$draft_issue_data = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issue ) : null;
			$draft_cover_id   = $draft_issue_data ? (int) $draft_issue_data['cover_image_id'] : get_post_thumbnail_id( $draft_issue );
			$draft_title      = $draft_issue_data ? $draft_issue_data['title'] : get_the_title( $draft_issue );
			?>
			<div class="draft-about-strip__image">
				<?php if ( $draft_cover_id ) : ?>
					<?php echo wp_get_attachment_image( $draft_cover_id, 'large', false, array( 'alt' => sprintf( __( '%s cover', 'draft-theme' ), $draft_title ) ) ); ?>
				<?php else : ?>
					<img src="<?php echo esc_url( $draft_about_hero ); ?>" alt="<?php echo esc_attr( $draft_title ); ?>">
				<?php endif; ?>
				<div class="draft-about-strip__shade" aria-hidden="true"></div>
				<img class="draft-about-strip__logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
			</div>
		<?php endforeach; ?>
	</section>

	<section class="draft-about-tagline" aria-label="<?php esc_attr_e( 'DRAFT tagline', 'draft-theme' ); ?>">
		<p><?php esc_html_e( 'Where the Boys Play', 'draft-theme' ); ?></p>
	</section>
</section>
<?php
get_footer();
