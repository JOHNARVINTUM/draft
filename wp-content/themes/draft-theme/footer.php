<?php
/**
 * Footer template.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$footer_icon = DRAFT_THEME_URI . '/assets/images/draft-icon-2.png';
$footer_nav_items = array(
	array( 'label' => __( 'Home', 'draft-theme' ), 'url' => home_url( '/' ) ),
	array( 'label' => __( 'Covers', 'draft-theme' ), 'url' => home_url( '/covers/' ) ),
	array( 'label' => __( 'Magazine', 'draft-theme' ), 'url' => home_url( '/magazines/' ) ),
	array( 'label' => __( 'Articles', 'draft-theme' ), 'url' => home_url( '/articles/' ) ),
	array( 'label' => __( 'About Us', 'draft-theme' ), 'url' => home_url( '/about/' ) ),
);
$footer_categories = array( 'Fashion', 'Beauty', 'Business', 'Sports', 'Lifestyle' );
$footer_socials = array(
	array( 'label' => __( 'Facebook', 'draft-theme' ), 'handle' => '@draftmagph', 'url' => 'https://www.facebook.com/draftmagph', 'icon' => 'facebook' ),
	array( 'label' => __( 'Instagram', 'draft-theme' ), 'handle' => '@draftmagazine.ph', 'url' => 'https://www.instagram.com/draftmagazine.ph/', 'icon' => 'instagram' ),
	array( 'label' => __( 'Tiktok', 'draft-theme' ), 'handle' => '@draftmagazineph', 'url' => 'https://www.tiktok.com/@draftmagazineph', 'icon' => 'tiktok' ),
);
?>
	</main>

	<footer class="draft-footer">
		<div class="draft-footer__rule"><span></span><i></i><span></span></div>
		<div class="draft-footer__inner">
			<div class="draft-footer__brand">
				<img src="<?php echo esc_url( $footer_icon ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
				<p class="draft-footer__tagline"><?php esc_html_e( 'Where the Boys Play', 'draft-theme' ); ?></p>
				<p class="draft-footer__dek"><?php esc_html_e( 'The modern voice of fashion, business & lifestyle.', 'draft-theme' ); ?></p>
			</div>

			<div class="draft-footer__columns">
				<section>
					<h2><?php esc_html_e( 'Navigate', 'draft-theme' ); ?></h2>
					<ul>
						<?php foreach ( $footer_nav_items as $item ) : ?>
							<li><a href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</section>

				<section>
					<h2><?php esc_html_e( 'Categories', 'draft-theme' ); ?></h2>
					<ul>
						<?php foreach ( $footer_categories as $category ) : ?>
							<li><a href="<?php echo esc_url( add_query_arg( 'category', $category, home_url( '/articles/' ) ) ); ?>"><?php echo esc_html( $category ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</section>

				<section>
					<h2><?php esc_html_e( 'Follow Us', 'draft-theme' ); ?></h2>
					<div class="draft-footer__socials">
						<?php foreach ( $footer_socials as $social ) : ?>
							<a class="draft-footer__social-link" href="<?php echo esc_url( $social['url'] ); ?>" target="_blank" rel="noopener noreferrer">
								<span class="draft-footer__social-icon"><?php echo draft_theme_get_social_icon( $social['icon'] ); ?></span>
								<span class="draft-footer__social-copy">
									<strong><?php echo esc_html( $social['label'] ); ?></strong>
									<em><?php echo esc_html( $social['handle'] ); ?></em>
								</span>
							</a>
						<?php endforeach; ?>
					</div>
				</section>
			</div>
		</div>
	</footer>
</div>
<?php wp_footer(); ?>
</body>
</html>
