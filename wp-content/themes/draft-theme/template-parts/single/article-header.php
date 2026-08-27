<?php
/**
 * Final DRAFT single article header.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_post_id     = get_the_ID();
$draft_author      = function_exists( 'magazine_core_get_author_profile' ) ? magazine_core_get_author_profile( (int) get_post_field( 'post_author', $draft_post_id ) ) : array();
$draft_author_name = $draft_author['name'] ?? get_the_author();
?>
<header class="draft-single-detail__header">
	<h1><?php the_title(); ?></h1>
	<p class="draft-single-detail__byline">
		<?php
		printf(
			/* translators: %s: Article author name. */
			esc_html__( 'by %s', 'draft-theme' ),
			esc_html( $draft_author_name )
		);
		?>
	</p>
	<p class="draft-single-detail__date"><?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></p>
	<?php if ( has_excerpt() ) : ?>
		<p class="draft-single-detail__dek"><?php echo esc_html( get_the_excerpt() ); ?></p>
	<?php endif; ?>
</header>
