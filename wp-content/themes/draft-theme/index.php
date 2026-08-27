<?php
/**
 * Default fallback template.
 *
 * @package Draft_Theme
 */

get_header();
?>
<section class="draft-placeholder">
	<div class="draft-placeholder__inner">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<h1><?php the_title(); ?></h1>
				<div class="draft-placeholder__content">
					<?php the_content(); ?>
				</div>
			<?php endwhile; ?>
		<?php else : ?>
			<h1><?php esc_html_e( 'DRAFT', 'draft-theme' ); ?></h1>
			<p><?php esc_html_e( 'No content found.', 'draft-theme' ); ?></p>
		<?php endif; ?>
	</div>
</section>
<?php
get_footer();
