<?php
/**
 * Header template.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$draft_nav_items = array(
	array( 'key' => 'home', 'label' => __( 'Home', 'draft-theme' ), 'url' => home_url( '/' ) ),
	array( 'key' => 'covers', 'label' => __( 'Covers', 'draft-theme' ), 'url' => home_url( '/covers/' ) ),
	array( 'key' => 'magazines', 'label' => __( 'Magazine', 'draft-theme' ), 'url' => home_url( '/magazines/' ) ),
	array( 'key' => 'articles', 'label' => __( 'Articles', 'draft-theme' ), 'url' => draft_theme_get_article_archive_url() ),
	array( 'key' => 'about', 'label' => __( 'About Us', 'draft-theme' ), 'url' => home_url( '/about/' ) ),
);

$current_path = wp_parse_url( esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ?? '/' ) ), PHP_URL_PATH ) ?: '/';
$home_path    = wp_parse_url( home_url( '/' ), PHP_URL_PATH ) ?: '/';

if ( '/' !== $home_path && 0 === strpos( $current_path, $home_path ) ) {
	$current_path = '/' . ltrim( substr( $current_path, strlen( $home_path ) ), '/' );
}

$current_path = '/' . trim( $current_path, '/' );
if ( '/' !== $current_path ) {
	$current_path .= '/';
}
if ( is_front_page() ) {
	$current_path = '/';
}

if ( ! function_exists( 'draft_theme_is_primary_nav_item_active' ) ) {
	/**
	 * Determine the active top-level DRAFT navigation item from the current route.
	 *
	 * @param string $key Navigation item key.
	 * @param string $current_path Current request path with leading/trailing slash.
	 * @return bool
	 */
	function draft_theme_is_primary_nav_item_active( $key, $current_path ) {
		switch ( $key ) {
			case 'home':
				return is_front_page();
			case 'covers':
				return is_page( 'covers' ) || 0 === strpos( $current_path, '/covers/' );
			case 'magazines':
				return is_page( 'magazines' ) || is_singular( 'magazine_issue' ) || 0 === strpos( $current_path, '/magazines/' );
			case 'articles':
				return is_page( 'articles' ) || is_singular( 'post' ) || is_category() || 0 === strpos( $current_path, '/articles/' );
			case 'about':
				return is_page( 'about' ) || 0 === strpos( $current_path, '/about/' );
		}

		return false;
	}
}

$draft_is_articles_area = is_page( 'articles' ) || is_singular( 'post' );
$draft_selected_cat     = draft_theme_get_selected_article_category();
$draft_search_query     = draft_theme_get_article_search_query();
$logo_url               = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
$draft_categories       = array( 'Fashion', 'Beauty', 'Lifestyle', 'Sports', 'Business' );
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'draft-site' ); ?>>
<?php wp_body_open(); ?>
<a class="draft-skip-link" href="#primary"><?php esc_html_e( 'Skip to content', 'draft-theme' ); ?></a>
<div class="draft-site-shell<?php echo $draft_is_articles_area ? ' has-article-nav' : ''; ?>">
	<div class="draft-nav-spacer" aria-hidden="true"></div>
	<header class="draft-header<?php echo $draft_is_articles_area ? ' has-article-nav' : ''; ?>" data-draft-header>
		<div class="draft-header__bar">
			<div class="draft-header__inner">
				<a class="draft-header__brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php esc_attr_e( 'DRAFT home', 'draft-theme' ); ?>">
					<img src="<?php echo esc_url( $logo_url ); ?>" alt="<?php esc_attr_e( 'draft', 'draft-theme' ); ?>">
				</a>

				<nav class="draft-nav draft-nav--desktop" aria-label="<?php esc_attr_e( 'Primary navigation', 'draft-theme' ); ?>">
					<?php foreach ( $draft_nav_items as $item ) : ?>
						<?php
						$is_active = draft_theme_is_primary_nav_item_active( $item['key'], $current_path );
						?>
						<a class="draft-nav__link<?php echo $is_active ? ' is-active' : ''; ?>" href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a>
					<?php endforeach; ?>
				</nav>

				<button class="draft-menu-toggle" type="button" aria-expanded="false" aria-controls="draft-mobile-menu" data-draft-menu-toggle>
					<span class="draft-menu-toggle__line"></span>
					<span class="draft-menu-toggle__line"></span>
					<span class="draft-menu-toggle__line"></span>
					<span class="screen-reader-text"><?php esc_html_e( 'Toggle menu', 'draft-theme' ); ?></span>
				</button>
			</div>
		</div>
	</header>

	<?php if ( $draft_is_articles_area ) : ?>
		<div class="draft-article-nav">
			<nav class="draft-article-nav__cats" aria-label="<?php esc_attr_e( 'Article categories', 'draft-theme' ); ?>">
				<?php foreach ( $draft_categories as $category_name ) : ?>
					<?php $is_active_cat = $draft_selected_cat instanceof WP_Term && strtolower( $draft_selected_cat->name ) === strtolower( $category_name ); ?>
					<a class="<?php echo $is_active_cat ? 'is-active' : ''; ?>" href="<?php echo esc_url( add_query_arg( 'category', $category_name, draft_theme_get_article_archive_url() ) ); ?>"><?php echo esc_html( $category_name ); ?></a>
				<?php endforeach; ?>
			</nav>
			<form class="draft-article-nav__search" action="<?php echo esc_url( draft_theme_get_article_archive_url() ); ?>" method="get">
				<label class="screen-reader-text" for="draft-article-search"><?php esc_html_e( 'Search articles', 'draft-theme' ); ?></label>
				<input id="draft-article-search" type="search" name="search" value="<?php echo esc_attr( $draft_search_query ); ?>" placeholder="<?php esc_attr_e( 'Search articles...', 'draft-theme' ); ?>">
				<button type="submit" aria-label="<?php esc_attr_e( 'Search', 'draft-theme' ); ?>">
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.4"/><path d="M10.5 10.5L13 13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
				</button>
			</form>
		</div>
	<?php endif; ?>

	<nav id="draft-mobile-menu" class="draft-mobile-menu" aria-label="<?php esc_attr_e( 'Mobile navigation', 'draft-theme' ); ?>" hidden data-draft-mobile-menu>
		<div class="draft-mobile-menu__links">
			<?php foreach ( $draft_nav_items as $index => $item ) : ?>
				<?php
				$is_active = draft_theme_is_primary_nav_item_active( $item['key'], $current_path );
				?>
				<a class="draft-mobile-menu__link<?php echo $is_active ? ' is-active' : ''; ?>" href="<?php echo esc_url( $item['url'] ); ?>" style="--draft-mobile-delay: <?php echo esc_attr( (string) ( $index * 60 ) ); ?>ms"><?php echo esc_html( $item['label'] ); ?></a>
			<?php endforeach; ?>
		</div>
	</nav>

	<aside class="draft-social-sidebar" aria-label="<?php esc_attr_e( 'Social links', 'draft-theme' ); ?>" data-draft-social-sidebar>
		<a href="https://www.facebook.com/draftmagph" aria-label="<?php esc_attr_e( 'Facebook', 'draft-theme' ); ?>" target="_blank" rel="noopener noreferrer"><?php echo draft_theme_get_social_icon( 'facebook' ); ?></a>
		<a href="https://www.instagram.com/draftmagazine.ph/" aria-label="<?php esc_attr_e( 'Instagram', 'draft-theme' ); ?>" target="_blank" rel="noopener noreferrer"><?php echo draft_theme_get_social_icon( 'instagram' ); ?></a>
		<a href="https://www.tiktok.com/@draftmagazineph" aria-label="<?php esc_attr_e( 'TikTok', 'draft-theme' ); ?>" target="_blank" rel="noopener noreferrer"><?php echo draft_theme_get_social_icon( 'tiktok' ); ?></a>
	</aside>

	<main id="primary" class="draft-main">
