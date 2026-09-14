<?php
/**
 * DRAFT cover priority management and ordering.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const DRAFT_COVER_PRIORITY_META_KEY = '_draft_cover_priority';

/**
 * Add the DRAFT-only Cover display priority field.
 */
function draft_theme_add_cover_priority_meta_box() {
	add_meta_box(
		'draft-cover-priority',
		__( 'Cover Display Priority', 'draft-theme' ),
		'draft_theme_render_cover_priority_meta_box',
		'magazine_issue',
		'side',
		'default'
	);
}
add_action( 'add_meta_boxes_magazine_issue', 'draft_theme_add_cover_priority_meta_box' );

/**
 * Render the Cover display priority field.
 *
 * @param WP_Post $post Current Magazine Issue post.
 */
function draft_theme_render_cover_priority_meta_box( $post ) {
	$priority = get_post_meta( $post->ID, DRAFT_COVER_PRIORITY_META_KEY, true );

	wp_nonce_field( 'draft_theme_save_cover_priority', 'draft_cover_priority_nonce' );
	?>
	<p>
		<label for="draft-cover-priority"><strong><?php esc_html_e( 'Display Priority', 'draft-theme' ); ?></strong></label><br>
		<input id="draft-cover-priority" name="draft_cover_priority" type="number" min="1" step="1" value="<?php echo esc_attr( $priority ); ?>" class="small-text">
	</p>
	<p class="description"><?php esc_html_e( 'Lower numbers appear first. 1 is the first cover. Leave blank to place this cover after prioritized covers.', 'draft-theme' ); ?></p>
	<?php
}

/**
 * Save the optional positive integer Cover display priority.
 *
 * @param int $post_id Saved Magazine Issue ID.
 */
function draft_theme_save_cover_priority( $post_id ) {
	if ( ! isset( $_POST['draft_cover_priority_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['draft_cover_priority_nonce'] ) ), 'draft_theme_save_cover_priority' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$value = isset( $_POST['draft_cover_priority'] ) ? trim( sanitize_text_field( wp_unslash( $_POST['draft_cover_priority'] ) ) ) : '';

	if ( '' === $value ) {
		delete_post_meta( $post_id, DRAFT_COVER_PRIORITY_META_KEY );
		return;
	}

	if ( ctype_digit( $value ) && (int) $value > 0 ) {
		update_post_meta( $post_id, DRAFT_COVER_PRIORITY_META_KEY, (int) $value );
	}
}
add_action( 'save_post_magazine_issue', 'draft_theme_save_cover_priority' );

/**
 * Return query arguments for a DRAFT Cover collection.
 *
 * @param array $args Additional WP_Query arguments.
 * @return array
 */
function draft_theme_get_cover_query_args( $args = array() ) {
	return wp_parse_args(
		$args,
		array(
			'post_type'                   => 'magazine_issue',
			'post_status'                 => 'publish',
			'draft_cover_priority_order' => true,
			'suppress_filters'            => false,
		)
	);
}

/**
 * Apply priority ordering only to opt-in DRAFT Cover queries.
 *
 * Unprioritized Covers sort after every positive priority. Duplicate or
 * missing priorities use post ID ascending as the deterministic tie-breaker.
 *
 * @param array    $clauses SQL clauses.
 * @param WP_Query $query Current query.
 * @return array
 */
function draft_theme_order_covers_by_priority( $clauses, $query ) {
	if ( ! $query->get( 'draft_cover_priority_order' ) ) {
		return $clauses;
	}

	global $wpdb;

	$alias = 'draft_cover_priority_meta';
	$join  = " LEFT JOIN {$wpdb->postmeta} AS {$alias} ON ({$wpdb->posts}.ID = {$alias}.post_id AND {$alias}.meta_key = '" . esc_sql( DRAFT_COVER_PRIORITY_META_KEY ) . "')";

	if ( false === strpos( $clauses['join'], $alias ) ) {
		$clauses['join'] .= $join;
	}

	$clauses['orderby'] = "CASE WHEN {$alias}.meta_value REGEXP '^[1-9][0-9]*$' THEN 0 ELSE 1 END ASC, CAST({$alias}.meta_value AS UNSIGNED) ASC, {$wpdb->posts}.ID ASC";

	return $clauses;
}
add_filter( 'posts_clauses', 'draft_theme_order_covers_by_priority', 10, 2 );
