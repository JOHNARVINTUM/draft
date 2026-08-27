<?php
/**
 * Final DRAFT homepage.
 *
 * @package Draft_Theme
 */

get_header();
?>
<div class="draft-home-page">
	<?php
	get_template_part( 'template-parts/home/hero' );
	get_template_part( 'template-parts/home/featured' );
	get_template_part( 'template-parts/home/new-articles' );
	get_template_part( 'template-parts/home/new-covers' );
	get_template_part( 'template-parts/home/magazine' );
	?>
</div>
<?php
get_footer();
