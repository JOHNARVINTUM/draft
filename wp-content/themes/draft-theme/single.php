<?php
/**
 * Single article template.
 *
 * @package Draft_Theme
 */

get_header();

if ( have_posts() ) :
	while ( have_posts() ) :
		the_post();
		?>
		<article <?php post_class( 'draft-single draft-single-detail' ); ?>>
			<?php get_template_part( 'template-parts/single/article-header' ); ?>
			<?php get_template_part( 'template-parts/single/article-hero' ); ?>
			<?php get_template_part( 'template-parts/single/article-body' ); ?>
		</article>
		<?php get_template_part( 'template-parts/single/related-posts' ); ?>
		<?php
	endwhile;
endif;

get_footer();
