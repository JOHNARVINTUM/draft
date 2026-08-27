<?php
/**
 * Homepage new covers.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_issues = get_posts(
	array(
		'post_type'      => 'magazine_issue',
		'post_status'    => 'publish',
		'posts_per_page' => 6,
		'meta_key'       => '_magazine_core_issue_number',
		'orderby'        => 'meta_value_num',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	)
);

if ( ! $draft_issues ) {
	return;
}

$draft_logo       = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
$draft_hero_issue = $draft_issues[0];
$draft_hero_data  = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_hero_issue ) : null;
$draft_hero_id    = $draft_hero_data ? (int) $draft_hero_data['cover_image_id'] : get_post_thumbnail_id( $draft_hero_issue );
?>
<section class="draft-home-new-covers">
	<div class="draft-home-covers-inner">
		<div class="draft-home-covers-grid">
			<a class="draft-home-covers-hero" href="<?php echo esc_url( home_url( '/covers/' . $draft_hero_issue->post_name . '/' ) ); ?>">
				<?php if ( $draft_hero_id ) : ?>
					<?php echo wp_get_attachment_image( $draft_hero_id, 'full', false, array( 'alt' => get_the_title( $draft_hero_issue ) ) ); ?>
				<?php else : ?>
					<span><?php echo esc_html( get_the_title( $draft_hero_issue ) ); ?></span>
				<?php endif; ?>
			</a>

			<div class="draft-home-covers-copy">
				<img src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
				<h2><?php esc_html_e( 'New Covers', 'draft-theme' ); ?></h2>
				<p><?php esc_html_e( "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.", 'draft-theme' ); ?></p>
				<a class="draft-home-text-link" href="<?php echo esc_url( home_url( '/covers/' ) ); ?>"><?php esc_html_e( 'Browse Covers', 'draft-theme' ); ?> &rarr;</a>

				<div class="draft-home-cover-thumbs">
					<?php foreach ( $draft_issues as $draft_issue ) : ?>
						<?php
						$draft_data     = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issue ) : null;
						$draft_cover_id = $draft_data ? (int) $draft_data['cover_image_id'] : get_post_thumbnail_id( $draft_issue );
						?>
						<a href="<?php echo esc_url( home_url( '/covers/' . $draft_issue->post_name . '/' ) ); ?>">
							<?php if ( $draft_cover_id ) : ?>
								<?php echo wp_get_attachment_image( $draft_cover_id, 'medium', false, array( 'alt' => get_the_title( $draft_issue ) ) ); ?>
							<?php else : ?>
								<span><?php echo esc_html( get_the_title( $draft_issue ) ); ?></span>
							<?php endif; ?>
						</a>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
</section>
