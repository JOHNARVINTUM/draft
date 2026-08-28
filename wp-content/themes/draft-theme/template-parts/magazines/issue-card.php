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
$draft_logo  = $args['logo'] ?? DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
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
<article class="draft-magazine-final-card" data-draft-magazines-card="<?php echo esc_attr( (string) $draft_index ); ?>" data-issue-id="<?php echo esc_attr( (string) $draft_data['id'] ); ?>">
	<a href="<?php echo esc_url( get_permalink( $draft_data['post'] ) ); ?>">
		<figure class="draft-magazine-final-card__image">
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
			<span class="draft-magazine-final-card__shade" aria-hidden="true"></span>
			<img class="draft-magazine-final-card__logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
		</figure>
		<h3><?php echo esc_html( $draft_data['title'] ); ?></h3>
		<?php if ( $draft_data['subtitle'] ) : ?>
			<p><?php echo esc_html( $draft_data['subtitle'] ); ?></p>
		<?php endif; ?>
	</a>
</article>
