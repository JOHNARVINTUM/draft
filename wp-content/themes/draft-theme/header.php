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

$draft_is_articles_area         = is_page( 'articles' ) || is_singular( 'post' );
$draft_selected_cat             = draft_theme_get_selected_article_category();
$draft_search_query             = draft_theme_get_article_search_query();
$draft_is_article_results_mode  = is_page( 'articles' ) && ( $draft_selected_cat instanceof WP_Term || '' !== $draft_search_query );
$logo_url                       = DRAFT_THEME_URI . '/assets/images/draft-logo-green.png';
$draft_categories       = array( 'Fashion', 'Beauty', 'Lifestyle', 'Sports', 'Business' );


$draft_header_search_articles = get_posts(
    array(
        'post_type'           => 'post',
        'post_status'         => 'publish',
        'posts_per_page'      => -1,
        'orderby'             => 'date',
        'order'               => 'DESC',
        'ignore_sticky_posts' => true,
        'no_found_rows'       => true,
    )
);

$draft_header_search_issues = post_type_exists( 'magazine_issue' )
    ? get_posts(
        array(
            'post_type'      => 'magazine_issue',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'orderby'        => 'date',
            'order'          => 'DESC',
            'no_found_rows'  => true,
        )
    )
    : array();
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

				<button class="draft-header__search" type="button" aria-expanded="false" aria-controls="draft-mobile-search" aria-label="<?php esc_attr_e( 'Search articles', 'draft-theme' ); ?>" data-draft-search-toggle>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="10.8" cy="10.8" r="6.6"></circle><path d="m16 16 5 5"></path></svg>
					<span class="screen-reader-text"><?php esc_html_e( 'Search articles', 'draft-theme' ); ?></span>
				</button>
			</div>
		</div>
	</header>

	<section id="draft-mobile-search" class="draft-mobile-search" aria-label="<?php esc_attr_e( 'Search articles', 'draft-theme' ); ?>" hidden data-draft-mobile-search>
		<div class="draft-mobile-search__inner">
			<form class="draft-mobile-search__form" action="" method="get" data-draft-global-search-form>
				<label for="draft-mobile-search-input"><?php esc_html_e( 'Search DRAFT', 'draft-theme' ); ?></label>
				<div class="draft-mobile-search__field">
					<input id="draft-mobile-search-input" type="search" name="search" placeholder="<?php esc_attr_e( 'Search Articles, Covers, Magazines...', 'draft-theme' ); ?>" autocomplete="off" data-draft-global-search-input>
					<button type="submit" aria-label="<?php esc_attr_e( 'Submit search', 'draft-theme' ); ?>">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="10.8" cy="10.8" r="6.6"></circle><path d="m16 16 5 5"></path></svg>
					</button>
				</div>
			</form>
<div class="draft-global-search-results" data-draft-global-search-results>
    <?php global $post; ?>

    <?php foreach ( $draft_header_search_articles as $draft_search_article ) : ?>
        <?php
        $post = $draft_search_article;
        setup_postdata( $post );

        $draft_search_text = strtolower(
            wp_strip_all_tags(
                get_the_title() . ' ' .
                get_the_excerpt() . ' ' .
                get_the_author() . ' article'
            )
        );
        ?>

        <div
            class="draft-global-search-item"
            data-draft-global-search-card
            data-result-label="Article"
            data-search-text="<?php echo esc_attr( $draft_search_text ); ?>"
        >
            <?php get_template_part( 'template-parts/articles/article-card' ); ?>
        </div>
    <?php endforeach; ?>

    <?php wp_reset_postdata(); ?>

    <?php foreach ( $draft_header_search_issues as $draft_search_index => $draft_search_issue ) : ?>
        <?php
        $draft_search_issue_data = function_exists( 'magazine_core_get_magazine_issue' )
            ? magazine_core_get_magazine_issue( $draft_search_issue )
            : null;

        if ( ! $draft_search_issue_data ) {
            continue;
        }

        $draft_search_issue_text = strtolower(
            wp_strip_all_tags(
                $draft_search_issue->post_title . ' ' .
                get_the_excerpt( $draft_search_issue ) . ' ' .
                $draft_search_issue_data['issue_label'] . ' ' .
                $draft_search_issue_data['subtitle'] . ' magazine cover'
            )
        );
        ?>

        <div
            class="draft-global-search-item"
            data-draft-global-search-card
            data-result-label="Cover"
            data-search-text="<?php echo esc_attr( $draft_search_issue_text ); ?>"
        >
            <?php
            get_template_part(
                'template-parts/covers/cover-card',
                null,
                array(
                    'issue' => $draft_search_issue,
                    'index' => $draft_search_index,
                    'logo'  => $logo_url,
                )
            );
            ?>
        </div>

        <div
            class="draft-global-search-item"
            data-draft-global-search-card
            data-result-label="Magazine"
            data-search-text="<?php echo esc_attr( $draft_search_issue_text ); ?>"
        >
            <?php
            get_template_part(
                'template-parts/magazines/issue-card',
                null,
                array(
                    'issue' => $draft_search_issue,
                    'index' => $draft_search_index,
                    'logo'  => $logo_url,
                )
            );
            ?>
        </div>
    <?php endforeach; ?>
</div>

<div class="draft-global-search-empty" hidden data-draft-global-search-empty>
    <span class="draft-articles-empty__icon" aria-hidden="true"></span>
    <h2 class="draft-articles-empty__title">No results found</h2>
    <p class="draft-articles-empty__message" data-draft-global-search-empty-message>
        We couldn’t find any articles, covers, or magazines matching your search.
    </p>
    <button class="draft-articles-empty__clear" type="button" data-draft-global-search-clear>
        Clear Search
    </button>
</div>
			<div class="draft-mobile-search__categories">
				<p><?php esc_html_e( 'Browse by category', 'draft-theme' ); ?></p>
				<?php foreach ( $draft_categories as $draft_category ) : ?>
					<a href="<?php echo esc_url( add_query_arg( 'category', $draft_category, draft_theme_get_article_archive_url() ) ); ?>">
						<span><?php echo esc_html( $draft_category ); ?></span><span aria-hidden="true">&rarr;</span>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

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
