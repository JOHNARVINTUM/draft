<?php
/**
 * Magazine issue cover card.
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
$draft_type     = $draft_data['type'] ?: __( 'Print', 'draft-theme' );
$draft_type_key = strtolower( preg_replace( '/[^a-z0-9]+/i', '-', $draft_type ) );
$draft_alt      = sprintf(
	/* translators: %s: magazine issue title. */
	__( '%s cover', 'draft-theme' ),
	$draft_data['title']
);
$draft_meta = $draft_data['subtitle']
	? sprintf( '%s / %s', $draft_data['subtitle'], $draft_data['publication_date'] )
	: sprintf( '%s / %s', $draft_data['volume_label'], $draft_data['publication_date'] );
?>
<article class="draft-cover-card" data-issue-id="<?php echo esc_attr( (string) $draft_data['id'] ); ?>">
	<div class="draft-cover-card__image">
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
			<span class="draft-cover-placeholder"><?php echo esc_html( $draft_data['issue_label'] ?: $draft_data['title'] ); ?></span>
		<?php endif; ?>
		<div class="draft-cover-card__overlay" aria-hidden="true">
			<span><?php esc_html_e( 'View Issue', 'draft-theme' ); ?></span>
		</div>
	</div>

	<div class="draft-cover-card__meta-row">
		<h2><?php echo esc_html( $draft_data['title'] ); ?></h2>
		<span class="draft-cover-card__type draft-cover-card__type--<?php echo esc_attr( $draft_type_key ); ?>"><?php echo esc_html( $draft_type ); ?></span>
	</div>
	<p class="draft-cover-card__meta"><?php echo esc_html( $draft_meta ); ?></p>
</article>
