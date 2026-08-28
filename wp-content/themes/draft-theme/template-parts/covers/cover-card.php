<?php
/**
 * Magazine issue cover card for the Covers archive.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_issue = $args['issue'] ?? null;
$draft_index = isset( $args['index'] ) ? (int) $args['index'] : 0;
$draft_logo  = $args['logo'] ?? DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
$draft_data  = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issue ) : null;

if ( ! $draft_data ) {
	return;
}

$draft_post     = $draft_data['post'];
$draft_cover_id = (int) $draft_data['cover_image_id'];
$draft_summary  = function_exists( 'draft_theme_get_cover_summary' ) ? draft_theme_get_cover_summary( $draft_post ) : get_the_excerpt( $draft_post );
$draft_label    = $draft_data['issue_label'] ?: $draft_data['title'];
$draft_url      = function_exists( 'draft_theme_get_cover_detail_url' ) ? draft_theme_get_cover_detail_url( $draft_post ) : get_permalink( $draft_post );
$draft_alt      = sprintf(
	/* translators: %s: magazine issue title. */
	__( '%s cover', 'draft-theme' ),
	$draft_data['title']
);
?>
<article class="draft-cover-card" data-issue-id="<?php echo esc_attr( (string) $draft_data['id'] ); ?>">
	<a href="<?php echo esc_url( $draft_url ); ?>">
		<span class="draft-cover-card__image">
			<?php if ( $draft_cover_id ) : ?>
				<?php
				echo wp_get_attachment_image(
					$draft_cover_id,
					'large',
					false,
					array(
						'alt'       => $draft_alt,
						'loading'   => 0 === $draft_index ? 'eager' : 'lazy',
						'draggable' => 'false',
					)
				);
				?>
			<?php else : ?>
				<span class="draft-cover-placeholder"><?php echo esc_html( $draft_label ); ?></span>
			<?php endif; ?>
			<span class="draft-cover-card__shade" aria-hidden="true"></span>
			<img class="draft-cover-card__logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="" aria-hidden="true" loading="lazy">
		</span>

		<span class="draft-cover-card__body">
			<strong><?php echo esc_html( $draft_label ); ?></strong>
			<span><?php echo esc_html( wp_trim_words( $draft_summary, 12, '...' ) ); ?></span>
		</span>
	</a>
</article>