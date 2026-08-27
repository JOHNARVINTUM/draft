<?php
/**
 * Magazines page template.
 *
 * Template Name: Magazines
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$draft_issue_query = new WP_Query(
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

$draft_issues = $draft_issue_query->posts;
$draft_logo   = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
?>
<section class="draft-magazines-page" aria-labelledby="draft-magazines-title">
	<div class="draft-magazines-hero">
		<div class="draft-magazines-page__inner">
			<img class="draft-magazines-hero__logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'DRAFT', 'draft-theme' ); ?>">
			<h1 id="draft-magazines-title" class="draft-magazines-hero__title"><?php esc_html_e( 'Magazine', 'draft-theme' ); ?></h1>

			<?php get_template_part( 'template-parts/magazines/issue-carousel', null, array( 'issues' => $draft_issues ) ); ?>
		</div>
	</div>

	<div class="draft-magazines-page__inner">
		<div class="draft-magazines-divider" aria-hidden="true"></div>
	</div>

	<div class="draft-magazines-grid-wrap">
		<div class="draft-magazines-page__inner">
			<?php if ( $draft_issues ) : ?>
				<div class="draft-magazines-grid">
					<?php foreach ( $draft_issues as $draft_issue_index => $draft_issue ) : ?>
						<?php
						get_template_part(
							'template-parts/magazines/issue-card',
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
				<p class="draft-magazines-empty"><?php esc_html_e( 'No magazine issues are available yet.', 'draft-theme' ); ?></p>
			<?php endif; ?>
		</div>
	</div>
</section>
<?php
wp_reset_postdata();
get_footer();
