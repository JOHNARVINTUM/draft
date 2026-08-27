<?php
/**
 * Shared magazine issue content model.
 *
 * @package Magazine_Core
 */

namespace Magazine_Core {

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const ISSUE_META_NUMBER            = '_magazine_core_issue_number';
const ISSUE_META_SUBTITLE          = '_magazine_core_issue_subtitle';
const ISSUE_META_TYPE              = '_magazine_core_issue_type';
const ISSUE_META_FEATURED_POST_IDS = '_magazine_core_featured_article_ids';

/**
 * Register magazine issue post type.
 */
function register_magazine_issue_post_type() {
	$labels = array(
		'name'                  => _x( 'Magazine Issues', 'post type general name', 'magazine-core' ),
		'singular_name'         => _x( 'Magazine Issue', 'post type singular name', 'magazine-core' ),
		'menu_name'             => _x( 'Magazine Issues', 'admin menu', 'magazine-core' ),
		'name_admin_bar'        => _x( 'Magazine Issue', 'add new on admin bar', 'magazine-core' ),
		'add_new'               => _x( 'Add New', 'magazine issue', 'magazine-core' ),
		'add_new_item'          => __( 'Add New Magazine Issue', 'magazine-core' ),
		'new_item'              => __( 'New Magazine Issue', 'magazine-core' ),
		'edit_item'             => __( 'Edit Magazine Issue', 'magazine-core' ),
		'view_item'             => __( 'View Magazine Issue', 'magazine-core' ),
		'all_items'             => __( 'All Magazine Issues', 'magazine-core' ),
		'search_items'          => __( 'Search Magazine Issues', 'magazine-core' ),
		'not_found'             => __( 'No magazine issues found.', 'magazine-core' ),
		'not_found_in_trash'    => __( 'No magazine issues found in Trash.', 'magazine-core' ),
		'featured_image'        => __( 'Cover Image', 'magazine-core' ),
		'set_featured_image'    => __( 'Set cover image', 'magazine-core' ),
		'remove_featured_image' => __( 'Remove cover image', 'magazine-core' ),
		'use_featured_image'    => __( 'Use as cover image', 'magazine-core' ),
	);

	register_post_type(
		'magazine_issue',
		array(
			'labels'             => $labels,
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'show_in_rest'       => true,
			'menu_position'      => 21,
			'menu_icon'          => 'dashicons-book-alt',
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'magazines' ),
			'capability_type'    => 'post',
			'has_archive'        => false,
			'hierarchical'       => false,
			'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'page-attributes' ),
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_magazine_issue_post_type' );

/**
 * Register issue meta for REST/admin consistency.
 */
function register_magazine_issue_meta() {
	register_post_meta(
		'magazine_issue',
		ISSUE_META_NUMBER,
		array(
			'type'              => 'integer',
			'single'            => true,
			'sanitize_callback' => 'absint',
			'show_in_rest'      => true,
			'auth_callback'     => static function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_post_meta(
		'magazine_issue',
		ISSUE_META_SUBTITLE,
		array(
			'type'              => 'string',
			'single'            => true,
			'sanitize_callback' => 'sanitize_text_field',
			'show_in_rest'      => true,
			'auth_callback'     => static function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_post_meta(
		'magazine_issue',
		ISSUE_META_TYPE,
		array(
			'type'              => 'string',
			'single'            => true,
			'sanitize_callback' => __NAMESPACE__ . '\sanitize_magazine_issue_type',
			'show_in_rest'      => true,
			'auth_callback'     => static function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_post_meta(
		'magazine_issue',
		ISSUE_META_FEATURED_POST_IDS,
		array(
			'type'              => 'array',
			'single'            => true,
			'sanitize_callback' => __NAMESPACE__ . '\sanitize_featured_article_ids',
			'show_in_rest'      => array(
				'schema' => array(
					'type'  => 'array',
					'items' => array( 'type' => 'integer' ),
				),
			),
			'auth_callback'     => static function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_magazine_issue_meta' );

/**
 * Allowed issue types.
 *
 * @return string[]
 */
function get_magazine_issue_types() {
	return array( 'Print', 'Digital', 'Special', 'Limited' );
}

/**
 * Sanitize issue type.
 *
 * @param string $value Raw value.
 * @return string
 */
function sanitize_magazine_issue_type( $value ) {
	$value = sanitize_text_field( (string) $value );
	return in_array( $value, get_magazine_issue_types(), true ) ? $value : 'Print';
}

/**
 * Sanitize featured article IDs.
 *
 * @param mixed $value Raw IDs.
 * @return int[]
 */
function sanitize_featured_article_ids( $value ) {
	if ( is_string( $value ) ) {
		$value = preg_split( '/[\s,]+/', $value );
	}

	$ids = array_filter( array_map( 'absint', (array) $value ) );
	return array_values( array_unique( $ids ) );
}

/**
 * Add native issue metadata boxes.
 */
function add_magazine_issue_meta_boxes() {
	add_meta_box(
		'magazine-core-issue-details',
		__( 'Issue Details', 'magazine-core' ),
		__NAMESPACE__ . '\render_magazine_issue_details_meta_box',
		'magazine_issue',
		'normal',
		'high'
	);

	add_meta_box(
		'magazine-core-featured-articles',
		__( 'Featured Articles', 'magazine-core' ),
		__NAMESPACE__ . '\render_featured_articles_meta_box',
		'magazine_issue',
		'normal',
		'default'
	);
}
add_action( 'add_meta_boxes_magazine_issue', __NAMESPACE__ . '\add_magazine_issue_meta_boxes' );

/**
 * Render issue details meta box.
 *
 * @param \WP_Post $post Post object.
 */
function render_magazine_issue_details_meta_box( $post ) {
	wp_nonce_field( 'magazine_core_save_issue_meta', 'magazine_core_issue_meta_nonce' );

	$number = (int) get_post_meta( $post->ID, ISSUE_META_NUMBER, true );
	$subtitle = (string) get_post_meta( $post->ID, ISSUE_META_SUBTITLE, true );
	$type = sanitize_magazine_issue_type( get_post_meta( $post->ID, ISSUE_META_TYPE, true ) ?: 'Print' );
	?>
	<p>
		<label for="magazine-core-issue-number"><strong><?php esc_html_e( 'Issue Number', 'magazine-core' ); ?></strong></label><br>
		<input id="magazine-core-issue-number" name="magazine_core_issue_number" type="number" min="1" step="1" value="<?php echo esc_attr( (string) $number ); ?>" class="small-text">
	</p>
	<p>
		<label for="magazine-core-issue-subtitle"><strong><?php esc_html_e( 'Subtitle', 'magazine-core' ); ?></strong></label><br>
		<input id="magazine-core-issue-subtitle" name="magazine_core_issue_subtitle" type="text" value="<?php echo esc_attr( $subtitle ); ?>" class="widefat">
	</p>
	<p>
		<label for="magazine-core-issue-type"><strong><?php esc_html_e( 'Issue Type', 'magazine-core' ); ?></strong></label><br>
		<select id="magazine-core-issue-type" name="magazine_core_issue_type">
			<?php foreach ( get_magazine_issue_types() as $issue_type ) : ?>
				<option value="<?php echo esc_attr( $issue_type ); ?>" <?php selected( $type, $issue_type ); ?>><?php echo esc_html( $issue_type ); ?></option>
			<?php endforeach; ?>
		</select>
	</p>
	<p class="description"><?php esc_html_e( 'Use the WordPress publish date as the issue publication date and the featured image as the cover image.', 'magazine-core' ); ?></p>
	<?php
}

/**
 * Render featured article relationship box.
 *
 * @param \WP_Post $post Post object.
 */
function render_featured_articles_meta_box( $post ) {
	$ids = get_post_meta( $post->ID, ISSUE_META_FEATURED_POST_IDS, true );
	$ids = sanitize_featured_article_ids( $ids );
	?>
	<p>
		<label for="magazine-core-featured-article-ids"><strong><?php esc_html_e( 'Featured Article IDs', 'magazine-core' ); ?></strong></label><br>
		<textarea id="magazine-core-featured-article-ids" name="magazine_core_featured_article_ids" rows="4" class="widefat"><?php echo esc_textarea( implode( "\n", $ids ) ); ?></textarea>
	</p>
	<p class="description"><?php esc_html_e( 'Enter native WordPress post IDs, one per line or comma-separated. This keeps the relationship simple and avoids requiring ACF.', 'magazine-core' ); ?></p>
	<?php
}

/**
 * Save issue metadata.
 *
 * @param int $post_id Post ID.
 */
function save_magazine_issue_meta( $post_id ) {
	if ( ! isset( $_POST['magazine_core_issue_meta_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['magazine_core_issue_meta_nonce'] ) ), 'magazine_core_save_issue_meta' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$number = isset( $_POST['magazine_core_issue_number'] ) ? absint( wp_unslash( $_POST['magazine_core_issue_number'] ) ) : 0;
	$subtitle = isset( $_POST['magazine_core_issue_subtitle'] ) ? sanitize_text_field( wp_unslash( $_POST['magazine_core_issue_subtitle'] ) ) : '';
	$type = isset( $_POST['magazine_core_issue_type'] ) ? sanitize_magazine_issue_type( wp_unslash( $_POST['magazine_core_issue_type'] ) ) : 'Print';
	$featured_ids = isset( $_POST['magazine_core_featured_article_ids'] ) ? sanitize_featured_article_ids( wp_unslash( $_POST['magazine_core_featured_article_ids'] ) ) : array();

	update_post_meta( $post_id, ISSUE_META_NUMBER, $number );
	update_post_meta( $post_id, ISSUE_META_SUBTITLE, $subtitle );
	update_post_meta( $post_id, ISSUE_META_TYPE, $type );
	update_post_meta( $post_id, ISSUE_META_FEATURED_POST_IDS, $featured_ids );
}
add_action( 'save_post_magazine_issue', __NAMESPACE__ . '\save_magazine_issue_meta' );

/**
 * Return normalized issue data for themes.
 *
 * @param int|\WP_Post $issue Issue post or ID.
 * @return array|null
 */
function get_magazine_issue( $issue ) {
	$post = get_post( $issue );

	if ( ! $post instanceof \WP_Post || 'magazine_issue' !== $post->post_type ) {
		return null;
	}

	$number = (int) get_post_meta( $post->ID, ISSUE_META_NUMBER, true );
	$featured_ids = sanitize_featured_article_ids( get_post_meta( $post->ID, ISSUE_META_FEATURED_POST_IDS, true ) );

	return array(
		'id'                   => $post->ID,
		'post'                 => $post,
		'title'                => get_the_title( $post ),
		'issue_number'         => $number,
		'issue_label'          => $number ? sprintf( __( 'Issue %02d', 'magazine-core' ), $number ) : '',
		'volume_label'         => $number ? sprintf( __( 'Volume %02d', 'magazine-core' ), $number ) : '',
		'subtitle'             => (string) get_post_meta( $post->ID, ISSUE_META_SUBTITLE, true ),
		'type'                 => sanitize_magazine_issue_type( get_post_meta( $post->ID, ISSUE_META_TYPE, true ) ?: 'Print' ),
		'publication_date'     => get_the_date( 'F Y', $post ),
		'year'                 => (int) get_the_date( 'Y', $post ),
		'cover_image_id'       => get_post_thumbnail_id( $post ),
		'featured_article_ids' => $featured_ids,
	);
}
}

namespace {
	if ( ! function_exists( 'magazine_core_get_magazine_issue' ) ) {
		function magazine_core_get_magazine_issue( $issue ) {
			return \Magazine_Core\get_magazine_issue( $issue );
		}
	}
}

