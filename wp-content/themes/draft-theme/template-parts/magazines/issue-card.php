<?php
/**
 * Magazine issue grid card.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_issue = $args['issue'] ?? null;
$draft_index = isset( $args['index'] ) ? (int) $args['index'] : 0;
$draft_data  = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issue ) : null;

if ( ! $draft_data ) {
	return;
}

$draft_cover_id = (int) $draft_data['cover_image_id'];
$draft_alt      = sprintf(
	/* translators: %s: magazine issue title. */
	__( '%s cover', 'draft-theme' ),
	$draft_data['title']
);
?>
<article class="draft-magazine-issue-card" data-issue-id="<?php echo esc_attr( (string) $draft_data['id'] ); ?>">
	<div class="draft-magazine-issue-card__image">
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
			<span class="draft-magazine-cover-placeholder"><?php echo esc_html( $draft_data['issue_label'] ?: $draft_data['title'] ); ?></span>
		<?php endif; ?>
	</div>
	<div class="draft-magazine-issue-card__meta">
		<p><?php echo esc_html( trim( $draft_data['issue_label'] . ' / ' . $draft_data['publication_date'] ) ); ?></p>
		<?php if ( $draft_data['type'] ) : ?>
			<span><?php echo esc_html( $draft_data['type'] ); ?></span>
		<?php endif; ?>
	</div>
	<h2><?php echo esc_html( $draft_data['title'] ); ?></h2>
	<?php if ( $draft_data['subtitle'] ) : ?>
		<p class="draft-magazine-issue-card__subtitle"><?php echo esc_html( $draft_data['subtitle'] ); ?></p>
	<?php endif; ?>
</article>
