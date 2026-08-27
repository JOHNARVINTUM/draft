<?php
/**
 * Covers page template.
 *
 * Template Name: Covers
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$draft_cover_query = new WP_Query(
	array(
		'post_type'      => 'magazine_issue',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'meta_key'       => '_magazine_core_issue_number',
		'orderby'        => 'meta_value_num',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	)
);

$draft_issues        = $draft_cover_query->posts;
$draft_current_issue = $draft_issues && function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issues[0] ) : null;
?>
<section class="draft-covers-page" aria-labelledby="draft-covers-title">
	<div class="draft-covers-hero">
		<div class="draft-covers-page__inner">
			<div class="draft-covers-hero__grid">
				<div class="draft-covers-hero__copy">
					<h1 id="draft-covers-title"><?php esc_html_e( 'The Covers', 'draft-theme' ); ?></h1>
					<p><?php esc_html_e( 'A curated archive of visual narratives. Explore the evolution of DRAFT through our definitive collection of printed editions and special digital releases.', 'draft-theme' ); ?></p>
				</div>
				<?php if ( $draft_current_issue ) : ?>
					<div class="draft-covers-current" aria-label="<?php esc_attr_e( 'Current edition', 'draft-theme' ); ?>">
						<p><?php esc_html_e( 'Current Edition', 'draft-theme' ); ?></p>
						<strong><?php echo esc_html( $draft_current_issue['title'] ); ?></strong>
						<span><?php echo esc_html( trim( $draft_current_issue['issue_label'] . ' / ' . $draft_current_issue['publication_date'] ) ); ?></span>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</div>

	<div class="draft-covers-page__inner">
		<div class="draft-covers-divider" aria-hidden="true"></div>
	</div>

	<div class="draft-covers-grid-wrap">
		<div class="draft-covers-page__inner">
			<?php if ( $draft_issues ) : ?>
				<div class="draft-covers-grid">
					<?php foreach ( $draft_issues as $draft_issue_index => $draft_issue ) : ?>
						<?php
						get_template_part(
							'template-parts/covers/cover-card',
							null,
							array(
								'issue' => $draft_issue,
								'index' => $draft_issue_index,
							)
						);
						?>
					<?php endforeach; ?>
				</div>
			<?php else : ?>
				<p class="draft-covers-empty"><?php esc_html_e( 'No covers are available yet.', 'draft-theme' ); ?></p>
			<?php endif; ?>
		</div>
	</div>
</section>
<?php
wp_reset_postdata();
get_footer();
