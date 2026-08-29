<?php
/**
 * Template Name: Articles
 *
 * DRAFT article archive.
 *
 * @package Draft_Theme
 */

get_header();

$draft_selected_category = draft_theme_get_selected_article_category();
$draft_search_query      = draft_theme_get_article_search_query();
$draft_is_results_mode   = $draft_selected_category instanceof WP_Term || '' !== $draft_search_query;
$draft_paged             = max( 1, (int) get_query_var( 'paged' ), (int) get_query_var( 'page' ) );
$draft_query_args        = array(
	'post_type'           => 'post',
	'post_status'         => 'publish',
	'posts_per_page'      => 9,
	'paged'               => $draft_paged,
	'ignore_sticky_posts' => true,
);

if ( $draft_selected_category instanceof WP_Term ) {
	$draft_query_args['cat'] = (int) $draft_selected_category->term_id;
}

if ( '' !== $draft_search_query ) {
	$draft_query_args['s'] = $draft_search_query;
}

$draft_articles = new WP_Query( $draft_query_args );
$draft_featured = function_exists( 'magazine_core_get_hero_posts' ) ? magazine_core_get_hero_posts( 9 ) : array();
?>
<section class="draft-articles-page<?php echo $draft_is_results_mode ? ' is-results-mode' : ''; ?>">
	<div class="draft-articles-page__inner">
		<header class="draft-articles-header">
			<div class="draft-articles-header__title-row">
				<img src="<?php echo esc_url( DRAFT_THEME_URI . '/assets/images/draft-logo-green.png' ); ?>" alt="<?php esc_attr_e( 'DRAFT', 'draft-theme' ); ?>">
				<h1><?php esc_html_e( 'Articles', 'draft-theme' ); ?></h1>
			</div>
			<p><?php esc_html_e( 'Explore the most talked-about articles, exclusive interviews, and trending insights curated by our editors. From fashion and beauty to lifestyle, sports, and business, discover content that inspires, informs, and captivates', 'draft-theme' ); ?></p>
		</header>

		<?php if ( ! $draft_is_results_mode && ! empty( $draft_featured ) ) : ?>
			<section class="draft-featured-rotator" data-draft-featured-rotator>
				<div class="draft-featured-rotator__row">
					<button class="draft-featured-rotator__arrow" type="button" data-draft-featured-prev aria-label="<?php esc_attr_e( 'Previous', 'draft-theme' ); ?>">&lt;</button>
					<div class="draft-featured-rotator__viewport">
						<?php foreach ( $draft_featured as $index => $featured_post ) : ?>
							<?php
							global $post;
							$post = $featured_post;
							setup_postdata( $post );
							?>
							<div class="draft-featured-rotator__slide<?php echo 0 === $index ? ' is-active' : ''; ?>" data-draft-featured-index="<?php echo esc_attr( (string) $index ); ?>">
								<?php get_template_part( 'template-parts/articles/featured-article' ); ?>
							</div>
						<?php endforeach; ?>
						<?php wp_reset_postdata(); ?>
					</div>
					<button class="draft-featured-rotator__arrow" type="button" data-draft-featured-next aria-label="<?php esc_attr_e( 'Next', 'draft-theme' ); ?>">&gt;</button>
				</div>
				<div class="draft-featured-rotator__dots" role="tablist" aria-label="<?php esc_attr_e( 'Featured articles', 'draft-theme' ); ?>">
					<?php foreach ( $draft_featured as $index => $featured_post ) : ?>
						<button type="button" class="<?php echo 0 === $index ? 'is-active' : ''; ?>" data-draft-featured-dot="<?php echo esc_attr( (string) $index ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Go to featured article %d', 'draft-theme' ), $index + 1 ) ); ?>"></button>
					<?php endforeach; ?>
				</div>
			</section>
		<?php elseif ( ! $draft_is_results_mode && ! function_exists( 'magazine_core_get_hero_posts' ) ) : ?>
			<p class="draft-articles-page__notice"><?php echo esc_html( draft_theme_magazine_core_required_message() ); ?></p>
		<?php endif; ?>

		<nav class="draft-article-nav<?php echo $draft_is_results_mode ? ' is-results-mode' : ''; ?>" aria-label="<?php esc_attr_e( 'Article categories', 'draft-theme' ); ?>">
			<div class="draft-article-nav__cats">
				<?php foreach ( draft_theme_get_article_categories() as $draft_category_item ) : ?>
					<?php $draft_is_active_cat = $draft_selected_category instanceof WP_Term && $draft_selected_category->term_id === ( $draft_category_item['term'] instanceof WP_Term ? $draft_category_item['term']->term_id : 0 ); ?>
					<a class="<?php echo $draft_is_active_cat ? 'is-active' : ''; ?>" href="<?php echo esc_url( add_query_arg( 'category', $draft_category_item['slug'], draft_theme_get_article_archive_url() ) ); ?>"><?php echo esc_html( $draft_category_item['name'] ); ?></a>
				<?php endforeach; ?>
			</div>
			<form class="draft-article-nav__search" action="<?php echo esc_url( draft_theme_get_article_archive_url() ); ?>" method="get">
				<?php if ( $draft_selected_category instanceof WP_Term ) : ?>
					<input type="hidden" name="category" value="<?php echo esc_attr( $draft_selected_category->slug ); ?>">
				<?php endif; ?>
				<label class="screen-reader-text" for="draft-article-search"><?php esc_html_e( 'Search articles', 'draft-theme' ); ?></label>
				<input id="draft-article-search" type="search" name="search" value="<?php echo esc_attr( $draft_search_query ); ?>" placeholder="<?php esc_attr_e( 'Search Articles...', 'draft-theme' ); ?>">
				<button type="submit" aria-label="<?php esc_attr_e( 'Search', 'draft-theme' ); ?>">
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.4"/><path d="M10.5 10.5L13 13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
				</button>
			</form>
		</nav>

		<section class="draft-articles-grid-wrap">
			<?php if ( $draft_articles->have_posts() ) : ?>
				<div class="draft-articles-grid" data-draft-articles-grid>
					<?php while ( $draft_articles->have_posts() ) : ?>
						<?php $draft_articles->the_post(); ?>
						<?php get_template_part( 'template-parts/articles/article-card' ); ?>
					<?php endwhile; ?>
				</div>

				<?php
				$draft_pagination_args = array();
				if ( $draft_selected_category instanceof WP_Term ) {
					$draft_pagination_args['category'] = $draft_selected_category->slug;
				}
				if ( '' !== $draft_search_query ) {
					$draft_pagination_args['search'] = $draft_search_query;
				}

				$draft_pagination = paginate_links(
					array(
						'total'     => $draft_articles->max_num_pages,
						'current'   => $draft_paged,
						'prev_text' => __( 'Previous', 'draft-theme' ),
						'next_text' => __( 'Next', 'draft-theme' ),
						'add_args'  => $draft_pagination_args,
					)
				);
				?>
				<?php if ( $draft_pagination ) : ?>
					<nav class="draft-pagination" aria-label="<?php esc_attr_e( 'Articles pagination', 'draft-theme' ); ?>"><?php echo wp_kses_post( $draft_pagination ); ?></nav>
				<?php endif; ?>
			<?php else : ?>
				<div class="draft-articles-empty"><?php esc_html_e( 'No articles found.', 'draft-theme' ); ?></div>
			<?php endif; ?>
			<?php wp_reset_postdata(); ?>
		</section>
	</div>
</section>
<?php
get_footer();

