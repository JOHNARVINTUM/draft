<?php
/**
 * Final DRAFT single article body.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_post_id   = get_the_ID();
$draft_mid_image = function_exists( 'draft_theme_get_article_mid_image' ) ? draft_theme_get_article_mid_image( $draft_post_id, 'large' ) : array();
$draft_content = apply_filters( 'the_content', get_the_content() );
$draft_parts   = preg_split( '/(<\/(?:p|blockquote|ul|ol|figure|h[2-6])>)/i', $draft_content, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY );
$draft_blocks  = array();

for ( $draft_i = 0; $draft_i < count( $draft_parts ); $draft_i += 2 ) {
	$draft_block = $draft_parts[ $draft_i ] . ( $draft_parts[ $draft_i + 1 ] ?? '' );
	if ( '' !== trim( wp_strip_all_tags( $draft_block ) ) || preg_match( '/<(?:img|figure|iframe|video|audio|embed|object)\\b/i', $draft_block ) ) {
		$draft_blocks[] = $draft_block;
	}
}

if ( empty( $draft_blocks ) ) {
	$draft_blocks = array( $draft_content );
}

$draft_mid_index = (int) ceil( count( $draft_blocks ) / 2 );
$draft_logo      = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
?>
<div class="draft-single-detail__content">
	<div class="draft-single-body draft-single-detail__body">
		<?php foreach ( $draft_blocks as $draft_index => $draft_block ) : ?>
			<?php echo wp_kses_post( $draft_block ); ?>
			<?php if ( ! empty( $draft_mid_image['attachment_id'] ) && $draft_index + 1 === $draft_mid_index ) : ?>
				<figure class="draft-single-detail__image draft-single-detail__image--mid">
					<?php echo wp_get_attachment_image( $draft_mid_image['attachment_id'], 'large', false, array( 'alt' => $draft_mid_image['alt'] ) ); ?>
					<div class="draft-single-detail__image-shade" aria-hidden="true"></div>
					<img class="draft-single-detail__image-logo" src="<?php echo esc_url( $draft_logo ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
					<?php if ( ! empty( $draft_mid_image['caption'] ) ) : ?>
						<figcaption><?php echo esc_html( $draft_mid_image['caption'] ); ?></figcaption>
					<?php endif; ?>
				</figure>
			<?php endif; ?>
		<?php endforeach; ?>
	</div>
</div>
