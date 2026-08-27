<?php
/**
 * Magazine issue carousel.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_issues = isset( $args['issues'] ) && is_array( $args['issues'] ) ? $args['issues'] : array();
?>
<?php if ( $draft_issues ) : ?>
	<div class="draft-magazine-carousel" data-draft-magazine-carousel>
		<div class="draft-magazine-carousel__stage">
			<button class="draft-magazine-carousel__arrow draft-magazine-carousel__arrow--prev" type="button" aria-label="<?php esc_attr_e( 'Previous cover', 'draft-theme' ); ?>" data-draft-magazine-prev>
				<span aria-hidden="true">‹</span>
			</button>

			<div class="draft-magazine-carousel__stack">
				<?php foreach ( $draft_issues as $draft_index => $draft_issue ) : ?>
					<?php
					$draft_issue_data = function_exists( 'magazine_core_get_magazine_issue' ) ? magazine_core_get_magazine_issue( $draft_issue ) : null;
					if ( ! $draft_issue_data ) {
						continue;
					}

					$draft_cover_id = (int) $draft_issue_data['cover_image_id'];
					$draft_alt      = sprintf(
						/* translators: %s: magazine issue title. */
						__( '%s cover', 'draft-theme' ),
						$draft_issue_data['title']
					);
					?>
					<div class="draft-magazine-carousel__slide" data-draft-magazine-slide data-index="<?php echo esc_attr( (string) $draft_index ); ?>">
						<?php if ( $draft_cover_id ) : ?>
							<?php
							echo wp_get_attachment_image(
								$draft_cover_id,
								'large',
								false,
								array(
									'alt'       => $draft_alt,
									'draggable' => 'false',
								)
							);
							?>
						<?php else : ?>
							<span class="draft-magazine-cover-placeholder"><?php echo esc_html( $draft_issue_data['issue_label'] ?: $draft_issue_data['title'] ); ?></span>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>

			<button class="draft-magazine-carousel__arrow draft-magazine-carousel__arrow--next" type="button" aria-label="<?php esc_attr_e( 'Next cover', 'draft-theme' ); ?>" data-draft-magazine-next>
				<span aria-hidden="true">›</span>
			</button>
		</div>

		<div class="draft-magazine-carousel__dots" role="tablist" aria-label="<?php esc_attr_e( 'Magazine covers', 'draft-theme' ); ?>">
			<?php foreach ( $draft_issues as $draft_index => $draft_issue ) : ?>
				<button class="draft-magazine-carousel__dot" type="button" aria-label="<?php echo esc_attr( sprintf( __( 'Go to magazine %d', 'draft-theme' ), $draft_index + 1 ) ); ?>" data-draft-magazine-dot data-index="<?php echo esc_attr( (string) $draft_index ); ?>"></button>
			<?php endforeach; ?>
		</div>
	</div>
<?php endif; ?>
