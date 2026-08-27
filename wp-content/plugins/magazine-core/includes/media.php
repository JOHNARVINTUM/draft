<?php
/**
 * Shared magazine media helpers.
 *
 * @package Magazine_Core
 */

namespace Magazine_Core {
	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}

	/**
	 * Return normalized post media data without rendering theme markup.
	 *
	 * @param int    $post_id Post ID.
	 * @param string $size Image size.
	 * @return array
	 */
	function get_post_media( $post_id, $size = 'large' ) {
		$post_id      = absint( $post_id );
		$thumbnail_id = get_post_thumbnail_id( $post_id );
		$title_alt    = the_title_attribute(
			array(
				'post' => $post_id,
				'echo' => false,
			)
		);
		$attachment_alt = $thumbnail_id ? trim( (string) get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true ) ) : '';
		$caption        = '';

		if ( $thumbnail_id ) {
			$attachment = get_post( $thumbnail_id );
			$caption    = $attachment ? trim( (string) $attachment->post_excerpt ) : '';
		}

		return array(
			'post_id'             => $post_id,
			'has_thumbnail'       => has_post_thumbnail( $post_id ),
			'thumbnail_id'        => $thumbnail_id ? (int) $thumbnail_id : 0,
			'size'                => $size,
			'title_alt'           => $title_alt,
			'attachment_alt'      => $attachment_alt,
			'alt'                 => '' !== $attachment_alt ? $attachment_alt : $title_alt,
			'caption'             => $caption,
			'fallback_label'      => 'Article',
			'placeholder_class'   => '',
			'placeholder_classes' => array( 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9' ),
		);
	}
}

namespace {
	if ( ! function_exists( 'magazine_core_get_post_media' ) ) {
		function magazine_core_get_post_media( $post_id, $size = 'large' ) {
			return \Magazine_Core\get_post_media( $post_id, $size );
		}
	}
}