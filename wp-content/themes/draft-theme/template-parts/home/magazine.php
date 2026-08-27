<?php
/**
 * Homepage magazine carousel.
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
		'order'          => 'ASC',
		'no_found_rows'  => true,
	)
);

if ( ! $draft_issues ) {
	return;
}

$draft_logo = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
?>
<section class="draft-home-magazine" data-draft-home-magazine>
	<div class="draft-home-container">
		<header class="draft-home-magazine__title">
			<img src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
			<h2><?php esc_html_e( 'Magazine', 'draft-theme' ); ?></h2>
		</header>

		<div class="draft-home-magazine__stage">
			<button class="draft-home-magazine__arrow draft-home-magazine__arrow--prev" type="button" aria-label="<?php esc_attr_e( 'Previous', 'draft-theme' ); ?>" data-draft-home-magazine-prev>&lsaquo;</button>
			<div class="draft-home-magazine__viewport">
				<?php foreach ( $draft_issues as $draft_index => $draft_issue ) : ?>
					<?php
					$draft_data     = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issue ) : null;
					if ( ! $draft_data ) {
						continue;
					}
					$draft_cover_id = (int) $draft_data['cover_image_id'];
					?>
					<div class="draft-home-magazine__slide" data-draft-home-magazine-slide data-index="<?php echo esc_attr( (string) $draft_index ); ?>">
						<a href="<?php echo esc_url( get_permalink( $draft_issue ) ); ?>">
							<div class="draft-home-magazine__cover">
								<?php if ( $draft_cover_id ) : ?>
									<?php echo wp_get_attachment_image( $draft_cover_id, 'large', false, array( 'alt' => $draft_data['title'] ) ); ?>
								<?php else : ?>
									<span><?php echo esc_html( $draft_data['issue_label'] ); ?></span>
								<?php endif; ?>
								<div class="draft-home-magazine__cover-shade" aria-hidden="true"></div>
								<img class="draft-home-magazine__logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
								<div class="draft-home-magazine__caption">
									<strong><?php echo esc_html( $draft_data['title'] ); ?></strong>
									<span><?php echo esc_html( $draft_data['issue_label'] ); ?></span>
								</div>
							</div>
						</a>
					</div>
				<?php endforeach; ?>
			</div>
			<button class="draft-home-magazine__arrow draft-home-magazine__arrow--next" type="button" aria-label="<?php esc_attr_e( 'Next', 'draft-theme' ); ?>" data-draft-home-magazine-next>&rsaquo;</button>
		</div>

		<div class="draft-home-magazine__dots" role="tablist" aria-label="<?php esc_attr_e( 'Magazine issues', 'draft-theme' ); ?>">
			<?php foreach ( $draft_issues as $draft_index => $draft_issue ) : ?>
				<button class="<?php echo 0 === $draft_index ? 'is-active' : ''; ?>" type="button" aria-label="<?php echo esc_attr( sprintf( __( 'Go to magazine %d', 'draft-theme' ), $draft_index + 1 ) ); ?>" data-draft-home-magazine-dot="<?php echo esc_attr( (string) $draft_index ); ?>"></button>
			<?php endforeach; ?>
		</div>

		<div class="draft-home-magazine__view">
			<a class="draft-home-text-link" href="<?php echo esc_url( get_permalink( $draft_issues[0] ) ); ?>" data-draft-home-magazine-link><?php esc_html_e( 'View Issue', 'draft-theme' ); ?> &rarr;</a>
		</div>
	</div>
</section>
