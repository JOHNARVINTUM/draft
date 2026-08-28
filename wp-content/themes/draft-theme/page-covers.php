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
$draft_logo          = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';

if ( ! function_exists( 'draft_theme_get_cover_detail_url' ) ) {
	/**
	 * Return the DRAFT cover detail route for a magazine issue.
	 *
	 * @param WP_Post $issue Magazine issue post.
	 * @return string
	 */
	function draft_theme_get_cover_detail_url( $issue ) {
		return home_url( '/covers/' . $issue->post_name . '/' );
	}
}

if ( ! function_exists( 'draft_theme_get_cover_summary' ) ) {
	/**
	 * Return a short cover summary from issue content with a DRAFT fallback.
	 *
	 * @param WP_Post $issue Magazine issue post.
	 * @return string
	 */
	function draft_theme_get_cover_summary( $issue ) {
		$summary = get_the_excerpt( $issue );

		if ( ! $summary ) {
			$summary = wp_strip_all_tags( $issue->post_content );
		}

		if ( ! $summary ) {
			$summary = __( "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.", 'draft-theme' );
		}

		return $summary;
	}
}
?>
<section class="draft-covers-final" aria-labelledby="draft-covers-title">
	<?php if ( $draft_current_issue ) : ?>
		<?php
		$draft_current_post    = $draft_current_issue['post'];
		$draft_current_cover   = (int) $draft_current_issue['cover_image_id'];
		$draft_current_url     = draft_theme_get_cover_detail_url( $draft_current_post );
		$draft_current_alt     = sprintf(
			/* translators: %s: magazine issue title. */
			__( '%s cover', 'draft-theme' ),
			$draft_current_issue['title']
		);
		?>
		<section class="draft-covers-final__hero" aria-label="<?php esc_attr_e( 'Current cover', 'draft-theme' ); ?>">
			<div class="draft-covers-final__hero-inner">
				<a class="draft-covers-final__hero-cover" href="<?php echo esc_url( $draft_current_url ); ?>">
					<?php if ( $draft_current_cover ) : ?>
						<?php
						echo wp_get_attachment_image(
							$draft_current_cover,
							'large',
							false,
							array(
								'alt'       => $draft_current_alt,
								'loading'   => 'eager',
								'draggable' => 'false',
							)
						);
						?>
					<?php else : ?>
						<span><?php echo esc_html( $draft_current_issue['issue_label'] ?: $draft_current_issue['title'] ); ?></span>
					<?php endif; ?>
				</a>

				<div class="draft-covers-final__intro">
					<img src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'DRAFT', 'draft-theme' ); ?>">
					<h1 id="draft-covers-title"><?php esc_html_e( 'Covers', 'draft-theme' ); ?></h1>
					<p><?php esc_html_e( "A curated archive of DRAFT's cover stories, visual narratives, original photography, creative concepts, and the featured personalities that define each issue of the magazine.", 'draft-theme' ); ?></p>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<section class="draft-covers-final__new" aria-labelledby="draft-covers-new-title">
		<div class="draft-covers-final__inner">
			<div class="draft-covers-final__heading">
				<h2 id="draft-covers-new-title"><?php esc_html_e( 'New Covers', 'draft-theme' ); ?></h2>
				<span aria-hidden="true"></span>
			</div>

			<?php if ( $draft_issues ) : ?>
				<div class="draft-covers-featured" data-draft-covers-carousel>
					<div class="draft-covers-featured__viewport">
						<?php foreach ( $draft_issues as $draft_issue_index => $draft_issue ) : ?>
							<?php
							$draft_data = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issue ) : null;
							if ( ! $draft_data ) {
								continue;
							}
							$draft_cover_id = (int) $draft_data['cover_image_id'];
							$draft_alt      = sprintf(
								/* translators: %s: magazine issue title. */
								__( '%s cover', 'draft-theme' ),
								$draft_data['title']
							);
							$draft_summary  = draft_theme_get_cover_summary( $draft_issue );
							$draft_url      = draft_theme_get_cover_detail_url( $draft_issue );
							?>
							<a class="draft-covers-featured__slide<?php echo 0 === $draft_issue_index ? ' is-active' : ''; ?>" href="<?php echo esc_url( $draft_url ); ?>" data-draft-covers-slide>
								<span class="draft-covers-featured__media">
									<?php if ( $draft_cover_id ) : ?>
										<?php
										echo wp_get_attachment_image(
											$draft_cover_id,
											'medium_large',
											false,
											array(
												'alt'       => $draft_alt,
												'loading'   => 0 === $draft_issue_index ? 'eager' : 'lazy',
												'draggable' => 'false',
											)
										);
										?>
									<?php else : ?>
										<span class="draft-cover-placeholder"><?php echo esc_html( $draft_data['issue_label'] ?: $draft_data['title'] ); ?></span>
									<?php endif; ?>
								</span>

								<span class="draft-covers-featured__body">
									<strong><?php echo esc_html( $draft_data['title'] ); ?></strong>
									<span class="draft-covers-featured__description"><?php echo esc_html( $draft_summary ); ?></span>
									<span class="draft-covers-featured__meta">
										<span><?php esc_html_e( 'Read Full Article', 'draft-theme' ); ?> -&gt;</span>
										<time datetime="<?php echo esc_attr( get_the_date( 'Y-m-d', $draft_issue ) ); ?>"><?php echo esc_html( $draft_data['publication_date'] ); ?></time>
									</span>
								</span>
							</a>
						<?php endforeach; ?>
					</div>

					<div class="draft-covers-featured__dots" role="tablist" aria-label="<?php esc_attr_e( 'Select cover', 'draft-theme' ); ?>">
						<?php foreach ( $draft_issues as $draft_issue_index => $draft_issue ) : ?>
							<button class="<?php echo 0 === $draft_issue_index ? 'is-active' : ''; ?>" type="button" data-draft-covers-dot aria-label="<?php echo esc_attr( sprintf( __( 'Show cover %d', 'draft-theme' ), $draft_issue_index + 1 ) ); ?>" aria-selected="<?php echo 0 === $draft_issue_index ? 'true' : 'false'; ?>"></button>
						<?php endforeach; ?>
					</div>
				</div>
			<?php else : ?>
				<p class="draft-covers-empty"><?php esc_html_e( 'No covers are available yet.', 'draft-theme' ); ?></p>
			<?php endif; ?>
		</div>
	</section>

	<section class="draft-covers-final__previous" aria-labelledby="draft-covers-previous-title">
		<div class="draft-covers-final__inner">
			<div class="draft-covers-final__heading">
				<h2 id="draft-covers-previous-title"><?php esc_html_e( 'Previous Covers', 'draft-theme' ); ?></h2>
				<span aria-hidden="true"></span>
			</div>

			<?php if ( $draft_issues ) : ?>
				<div class="draft-covers-previous-grid">
					<?php foreach ( $draft_issues as $draft_issue_index => $draft_issue ) : ?>
						<?php
						get_template_part(
							'template-parts/covers/cover-card',
							null,
							array(
								'issue' => $draft_issue,
								'index' => $draft_issue_index,
								'logo'  => $draft_logo,
							)
						);
						?>
					<?php endforeach; ?>
				</div>
			<?php else : ?>
				<p class="draft-covers-empty"><?php esc_html_e( 'No covers are available yet.', 'draft-theme' ); ?></p>
			<?php endif; ?>
		</div>
	</section>
</section>
<?php
wp_reset_postdata();
get_footer();