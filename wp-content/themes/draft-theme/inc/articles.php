<?php
/**
 * Article template helpers for DRAFT.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function draft_theme_get_article_archive_url( $args = array() ) {
	$url = home_url( '/articles/' );

	if ( ! empty( $args ) ) {
		$url = add_query_arg( $args, $url );
	}

	return $url;
}

function draft_theme_get_article_categories() {
	$names = array( 'Fashion', 'Beauty', 'Lifestyle', 'Sports', 'Business' );
	$items = array();

	foreach ( $names as $name ) {
		$term = get_term_by( 'name', $name, 'category' );

		if ( ! $term ) {
			$term = get_term_by( 'slug', sanitize_title( $name ), 'category' );
		}

		$slug = $term instanceof WP_Term ? $term->slug : sanitize_title( $name );

		$items[] = array(
			'name' => $name,
			'slug' => $slug,
			'url'  => draft_theme_get_article_archive_url( array( 'category' => $slug ) ),
			'term' => $term instanceof WP_Term ? $term : null,
		);
	}

	return $items;
}

function draft_theme_get_selected_article_category() {
	if ( empty( $_GET['category'] ) ) {
		return null;
	}

	$raw  = sanitize_text_field( wp_unslash( $_GET['category'] ) );
	$term = get_term_by( 'slug', sanitize_title( $raw ), 'category' );

	if ( ! $term ) {
		$term = get_term_by( 'name', $raw, 'category' );
	}

	return $term instanceof WP_Term ? $term : null;
}

function draft_theme_get_article_search_query() {
	if ( ! empty( $_GET['search'] ) ) {
		return sanitize_text_field( wp_unslash( $_GET['search'] ) );
	}

	return get_search_query( false );
}

function draft_theme_get_article_read_time( $post_id = null ) {
	$post_id = $post_id ? absint( $post_id ) : get_the_ID();
	$content = get_post_field( 'post_content', $post_id );
	$words   = str_word_count( wp_strip_all_tags( strip_shortcodes( (string) $content ) ) );
	$minutes = max( 1, (int) ceil( $words / 220 ) );

	return sprintf(
		/* translators: %d: estimated reading time in minutes. */
		_n( '%d min read', '%d min read', $minutes, 'draft-theme' ),
		$minutes
	);
}

function draft_theme_get_author_role_label( $author_profile ) {
	if ( ! empty( $author_profile['description'] ) ) {
		return wp_trim_words( $author_profile['description'], 8, '' );
	}

	return __( 'Contributing Writer', 'draft-theme' );
}

function draft_theme_magazine_core_required_message() {
	return __( 'Magazine Core must be active to render article data.', 'draft-theme' );
}

function draft_theme_filter_article_permalink( $permalink, $post ) {
	if ( $post instanceof WP_Post && 'post' === $post->post_type && 'publish' === $post->post_status ) {
		return home_url( user_trailingslashit( 'articles/' . $post->post_name ) );
	}

	return $permalink;
}
add_filter( 'post_link', 'draft_theme_filter_article_permalink', 10, 2 );

function draft_theme_add_article_rewrite_rules() {
	add_rewrite_rule( '^articles/([^/]+)/?$', 'index.php?name=$matches[1]', 'top' );
}
add_action( 'init', 'draft_theme_add_article_rewrite_rules' );

function draft_theme_flush_article_rewrite_rules() {
	draft_theme_add_article_rewrite_rules();
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'draft_theme_flush_article_rewrite_rules' );
function draft_theme_get_article_mid_image( $post_id = null, $size = 'large' ) {
	$post_id       = $post_id ? absint( $post_id ) : get_the_ID();
	$attachment_id = absint( get_post_meta( $post_id, '_draft_article_mid_image', true ) );

	if ( ! $attachment_id ) {
		return array(
			'attachment_id' => 0,
			'url'           => '',
			'alt'           => '',
			'width'         => 0,
			'height'        => 0,
			'caption'       => '',
		);
	}

	$image = wp_get_attachment_image_src( $attachment_id, $size );
	$alt   = trim( (string) get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ) );
	$file  = wp_get_attachment_metadata( $attachment_id );

	return array(
		'attachment_id' => $attachment_id,
		'url'           => $image ? $image[0] : '',
		'alt'           => '' !== $alt ? $alt : get_the_title( $post_id ),
		'width'         => $image ? (int) $image[1] : (int) ( $file['width'] ?? 0 ),
		'height'        => $image ? (int) $image[2] : (int) ( $file['height'] ?? 0 ),
		'caption'       => wp_get_attachment_caption( $attachment_id ),
	);
}

function draft_theme_register_article_mid_image_meta() {
	register_post_meta(
		'post',
		'_draft_article_mid_image',
		array(
			'type'              => 'integer',
			'single'            => true,
			'sanitize_callback' => 'absint',
			'auth_callback'     => static function () {
				return current_user_can( 'edit_posts' );
			},
			'show_in_rest'      => true,
		)
	);
}
add_action( 'init', 'draft_theme_register_article_mid_image_meta' );

function draft_theme_add_article_mid_image_metabox() {
	add_meta_box(
		'draft-article-mid-image',
		__( 'Article Mid Image', 'draft-theme' ),
		'draft_theme_render_article_mid_image_metabox',
		'post',
		'side',
		'low'
	);
}
add_action( 'add_meta_boxes_post', 'draft_theme_add_article_mid_image_metabox' );

function draft_theme_render_article_mid_image_metabox( $post ) {
	$mid_image = draft_theme_get_article_mid_image( $post->ID, 'medium' );
	wp_nonce_field( 'draft_article_mid_image_save', 'draft_article_mid_image_nonce' );
	?>
	<div class="draft-admin-mid-image" data-draft-admin-mid-image>
		<p><?php esc_html_e( 'Optional portrait image displayed within the article detail layout.', 'draft-theme' ); ?></p>
		<input type="hidden" name="draft_article_mid_image" value="<?php echo esc_attr( (string) $mid_image['attachment_id'] ); ?>" data-draft-admin-mid-image-input>
		<div class="draft-admin-mid-image__preview" data-draft-admin-mid-image-preview>
			<?php if ( $mid_image['attachment_id'] ) : ?>
				<?php echo wp_get_attachment_image( $mid_image['attachment_id'], 'medium', false, array( 'style' => 'max-width:100%;height:auto;display:block;' ) ); ?>
			<?php endif; ?>
		</div>
		<p>
			<button type="button" class="button" data-draft-admin-mid-image-select><?php esc_html_e( 'Select Image', 'draft-theme' ); ?></button>
			<button type="button" class="button" data-draft-admin-mid-image-remove<?php echo $mid_image['attachment_id'] ? '' : ' hidden'; ?>><?php esc_html_e( 'Remove', 'draft-theme' ); ?></button>
		</p>
	</div>
	<?php
}

function draft_theme_save_article_mid_image_meta( $post_id ) {
	if ( ! isset( $_POST['draft_article_mid_image_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['draft_article_mid_image_nonce'] ) ), 'draft_article_mid_image_save' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$attachment_id = isset( $_POST['draft_article_mid_image'] ) ? absint( $_POST['draft_article_mid_image'] ) : 0;

	if ( $attachment_id ) {
		update_post_meta( $post_id, '_draft_article_mid_image', $attachment_id );
	} else {
		delete_post_meta( $post_id, '_draft_article_mid_image' );
	}
}
add_action( 'save_post_post', 'draft_theme_save_article_mid_image_meta' );

