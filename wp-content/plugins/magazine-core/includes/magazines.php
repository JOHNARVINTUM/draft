<?php
/**
 * Shared Magazine content model.
 *
 * @package Magazine_Core
 */

namespace Magazine_Core {

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Register the independent Magazine post type. */
function register_magazine_post_type() {
	$labels = array(
		'name'                  => _x( 'Magazines', 'post type general name', 'magazine-core' ),
		'singular_name'         => _x( 'Magazine', 'post type singular name', 'magazine-core' ),
		'menu_name'             => _x( 'Magazines', 'admin menu', 'magazine-core' ),
		'name_admin_bar'        => _x( 'Magazine', 'add new on admin bar', 'magazine-core' ),
		'add_new_item'          => __( 'Add New Magazine', 'magazine-core' ),
		'new_item'              => __( 'New Magazine', 'magazine-core' ),
		'edit_item'             => __( 'Edit Magazine', 'magazine-core' ),
		'view_item'             => __( 'View Magazine', 'magazine-core' ),
		'all_items'             => __( 'All Magazines', 'magazine-core' ),
		'search_items'          => __( 'Search Magazines', 'magazine-core' ),
		'not_found'             => __( 'No magazines found.', 'magazine-core' ),
		'not_found_in_trash'    => __( 'No magazines found in Trash.', 'magazine-core' ),
		'featured_image'        => __( 'Magazine Image', 'magazine-core' ),
		'set_featured_image'    => __( 'Set magazine image', 'magazine-core' ),
		'remove_featured_image' => __( 'Remove magazine image', 'magazine-core' ),
		'use_featured_image'    => __( 'Use as magazine image', 'magazine-core' ),
	);

	register_post_type(
		'magazine',
		array(
			'labels'              => $labels,
			'public'              => true,
			'publicly_queryable'  => true,
			'exclude_from_search' => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_rest'        => true,
			'menu_position'       => 21,
			'menu_icon'           => 'dashicons-book-alt',
			'query_var'           => true,
			'rewrite'             => array( 'slug' => 'magazines' ),
			'capability_type'     => 'post',
			'has_archive'         => false,
			'hierarchical'        => false,
			'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'author' ),
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\\register_magazine_post_type' );

/**
 * Return normalized Magazine data without Cover-only metadata.
 *
 * @param int|\WP_Post $magazine Magazine post or ID.
 * @return array|null
 */
function get_magazine( $magazine ) {
	$post = get_post( $magazine );

	if ( ! $post instanceof \WP_Post || 'magazine' !== $post->post_type ) {
		return null;
	}

	return array(
		'id'               => $post->ID,
		'post'             => $post,
		'title'            => get_the_title( $post ),
		'description'      => get_the_excerpt( $post ),
		'publication_date' => get_the_date( 'F Y', $post ),
		'year'             => (int) get_the_date( 'Y', $post ),
		'image_id'         => get_post_thumbnail_id( $post ),
	);
}

/** Flush rewrites once when this content model version is deployed. */
function maybe_flush_magazine_rewrite_rules() {
	$version = '1';

	if ( $version === get_option( 'magazine_core_content_rewrite_version' ) ) {
		return;
	}

	flush_rewrite_rules( false );
	update_option( 'magazine_core_content_rewrite_version', $version, false );
}
add_action( 'init', __NAMESPACE__ . '\\maybe_flush_magazine_rewrite_rules', 99 );
}

namespace {
	if ( ! function_exists( 'magazine_core_get_magazine' ) ) {
		function magazine_core_get_magazine( $magazine ) {
			return \Magazine_Core\get_magazine( $magazine );
		}
	}
}
