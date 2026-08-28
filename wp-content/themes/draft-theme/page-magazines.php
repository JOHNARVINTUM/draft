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

if ( ! function_exists( 'draft_theme_get_magazine_issue_description' ) ) {
	/**
	 * Return archive-safe magazine issue description text.
	 *
	 * @param WP_Post $issue Magazine issue post.
	 * @return string
	 */
	function draft_theme_get_magazine_issue_description( $issue ) {
		$description = get_the_excerpt( $issue );

		if ( ! $description ) {
			$description = wp_trim_words( wp_strip_all_tags( $issue->post_content ), 42, '' );
		}

		return $description;
	}
}
?>
<section class="draft-magazines-final" aria-labelledby="draft-magazines-title" data-draft-magazines-featured>
	<header class="draft-magazines-final__header">
		<p><?php esc_html_e( 'Where the Boys Play', 'draft-theme' ); ?></p>
		<img src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'DRAFT', 'draft-theme' ); ?>">
		<h1 id="draft-magazines-title"><?php esc_html_e( 'Magazine', 'draft-theme' ); ?></h1>
	</header>

	<?php if ( $draft_issues ) : ?>
		<div class="draft-magazines-final__feature">
			<div class="draft-magazines-final__cover-stage">
				<?php foreach ( $draft_issues as $draft_issue_index => $draft_issue ) : ?>
					<?php
					$draft_data = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issue ) : null;
					if ( ! $draft_data ) {
						continue;
					}

					$draft_cover_id    = (int) $draft_data['cover_image_id'];
					$draft_description = draft_theme_get_magazine_issue_description( $draft_issue );
					$draft_permalink   = get_permalink( $draft_issue );
					$draft_alt         = sprintf(
						/* translators: %s: magazine issue title. */
						__( '%s cover', 'draft-theme' ),
						$draft_data['title']
					);
					?>
					<a
						class="draft-magazines-final__cover<?php echo 0 === $draft_issue_index ? ' is-active' : ''; ?>"
						href="<?php echo esc_url( $draft_permalink ); ?>"
						data-draft-magazines-slide
						data-index="<?php echo esc_attr( (string) $draft_issue_index ); ?>"
						data-title="<?php echo esc_attr( $draft_data['title'] ); ?>"
						data-subtitle="<?php echo esc_attr( $draft_data['subtitle'] ); ?>"
						data-description="<?php echo esc_attr( $draft_description ); ?>"
						data-url="<?php echo esc_url( $draft_permalink ); ?>"
						aria-hidden="<?php echo 0 === $draft_issue_index ? 'false' : 'true'; ?>"
					>
						<?php if ( $draft_cover_id ) : ?>
							<?php
							echo wp_get_attachment_image(
								$draft_cover_id,
								'large',
								false,
								array(
									'alt'       => $draft_alt,
									'loading'   => 0 === $draft_issue_index ? 'eager' : 'lazy',
									'draggable' => 'false',
								)
							);
							?>
						<?php else : ?>
							<span class="draft-magazine-cover-placeholder"><?php echo esc_html( $draft_data['issue_label'] ?: $draft_data['title'] ); ?></span>
						<?php endif; ?>
						<span class="draft-magazines-final__cover-shade" aria-hidden="true"></span>
						<img class="draft-magazines-final__cover-logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
						<?php if ( $draft_data['issue_label'] ) : ?>
							<span class="draft-magazines-final__issue-label"><?php echo esc_html( $draft_data['issue_label'] ); ?></span>
						<?php endif; ?>
					</a>
				<?php endforeach; ?>
			</div>

			<div class="draft-magazines-final__dots" role="tablist" aria-label="<?php esc_attr_e( 'Magazine issues', 'draft-theme' ); ?>">
				<?php foreach ( $draft_issues as $draft_issue_index => $draft_issue ) : ?>
					<button class="<?php echo 0 === $draft_issue_index ? 'is-active' : ''; ?>" type="button" data-draft-magazines-dot="<?php echo esc_attr( (string) $draft_issue_index ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Show magazine issue %d', 'draft-theme' ), $draft_issue_index + 1 ) ); ?>" aria-selected="<?php echo 0 === $draft_issue_index ? 'true' : 'false'; ?>"></button>
				<?php endforeach; ?>
			</div>

			<?php
			$draft_first_issue = $draft_issues[0];
			$draft_first_data  = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_first_issue ) : null;
			?>
			<?php if ( $draft_first_data ) : ?>
				<a class="draft-magazines-final__intro" href="<?php echo esc_url( get_permalink( $draft_first_issue ) ); ?>" data-draft-magazines-current-link>
					<h2 data-draft-magazines-current-title><?php echo esc_html( $draft_first_data['title'] ); ?></h2>
					<?php if ( $draft_first_data['subtitle'] ) : ?>
						<p class="draft-magazines-final__subtitle" data-draft-magazines-current-subtitle><?php echo esc_html( $draft_first_data['subtitle'] ); ?></p>
					<?php else : ?>
						<p class="draft-magazines-final__subtitle" data-draft-magazines-current-subtitle></p>
					<?php endif; ?>
					<p class="draft-magazines-final__description" data-draft-magazines-current-description><?php echo esc_html( draft_theme_get_magazine_issue_description( $draft_first_issue ) ); ?></p>
					<span class="draft-magazines-final__cta">
						<?php esc_html_e( 'Read Full Issue', 'draft-theme' ); ?>
						<svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</span>
				</a>
			<?php endif; ?>
		</div>

		<section class="draft-magazines-final__more" aria-labelledby="draft-magazines-more-title">
			<header class="draft-magazines-final__more-header">
				<h2 id="draft-magazines-more-title"><?php esc_html_e( 'View More Magazine', 'draft-theme' ); ?></h2>
				<nav aria-label="<?php esc_attr_e( 'Magazine related links', 'draft-theme' ); ?>">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'draft-theme' ); ?></a>
					<span>|</span>
					<a href="<?php echo esc_url( home_url( '/articles/' ) ); ?>"><?php esc_html_e( 'Article', 'draft-theme' ); ?></a>
					<span>|</span>
					<a href="<?php echo esc_url( home_url( '/covers/' ) ); ?>"><?php esc_html_e( 'Cover', 'draft-theme' ); ?></a>
				</nav>
			</header>
			<div class="draft-magazines-final__rule" aria-hidden="true"></div>
			<div class="draft-magazines-final__grid">
				<?php foreach ( $draft_issues as $draft_issue_index => $draft_issue ) : ?>
					<?php
					get_template_part(
						'template-parts/magazines/issue-card',
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
		</section>
	<?php else : ?>
		<p class="draft-magazines-empty"><?php esc_html_e( 'No magazine issues are available yet.', 'draft-theme' ); ?></p>
	<?php endif; ?>
</section>
<?php
wp_reset_postdata();
get_footer();
