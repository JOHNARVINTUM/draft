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
		$draft_content_type = function_exists( 'draft_theme_get_selected_content_type' ) ? draft_theme_get_selected_content_type( get_the_ID() ) : 'article';
		?>
		<article <?php post_class( 'draft-single draft-single-detail' ); ?>>
			<?php get_template_part( 'template-parts/single/article-header' ); ?>
			<?php get_template_part( 'template-parts/single/article-hero' ); ?>
			<?php get_template_part( 'template-parts/single/article-body' ); ?>
		</article>
		<?php get_template_part( 'template-parts/single/related-posts', null, array( 'content_type' => $draft_content_type ) ); ?>
		<?php
	endwhile;
endif;

get_footer();
