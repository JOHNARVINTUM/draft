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

	const IMAGE_OPTIMIZATION_MAX_DIMENSION = 2560;
	const IMAGE_OPTIMIZATION_QUALITY       = 82;

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

	/**
	 * Get or set the attachment currently in its initial upload generation pass.
	 *
	 * @param int|null $attachment_id New value, or null to read it.
	 * @return int
	 */
	function active_upload_attachment( $attachment_id = null ) {
		static $active_attachment_id = 0;

		if ( null !== $attachment_id ) {
			$active_attachment_id = absint( $attachment_id );
		}

		return $active_attachment_id;
	}

	/**
	 * Start optimization only when WordPress creates a new image attachment.
	 *
	 * @param int $attachment_id New attachment ID.
	 */
	function begin_new_upload_optimization( $attachment_id ) {
		if ( ! wp_attachment_is_image( $attachment_id ) ) {
			return;
		}

		active_upload_attachment( $attachment_id );
		add_filter( 'big_image_size_threshold', __NAMESPACE__ . '\\filter_new_upload_max_dimension', 10, 4 );
		add_filter( 'image_editor_output_format', __NAMESPACE__ . '\\filter_new_upload_output_format', 10, 3 );
		add_filter( 'wp_editor_set_quality', __NAMESPACE__ . '\\filter_new_upload_quality', 10, 2 );
		add_filter( 'wp_generate_attachment_metadata', __NAMESPACE__ . '\\finish_new_upload_optimization', PHP_INT_MAX, 3 );
	}
	add_action( 'add_attachment', __NAMESPACE__ . '\\begin_new_upload_optimization' );

	/**
	 * Limit newly uploaded images to the approved longest-side dimension.
	 *
	 * @return int
	 */
	function filter_new_upload_max_dimension() {
		return IMAGE_OPTIMIZATION_MAX_DIMENSION;
	}

	/**
	 * Convert suitable new JPEG uploads and their responsive sizes to WebP.
	 *
	 * @param array  $formats Existing input-to-output MIME mappings.
	 * @param string $filename Source filename.
	 * @param string $mime_type Source MIME type.
	 * @return array
	 */
	function filter_new_upload_output_format( $formats, $filename, $mime_type ) {
		unset( $filename );

		if (
			active_upload_attachment()
			&& 'image/jpeg' === $mime_type
			&& wp_image_editor_supports(
				array(
					'mime_type'        => 'image/jpeg',
					'output_mime_type' => 'image/webp',
				)
			)
		) {
			$formats['image/jpeg'] = 'image/webp';
		}

		return $formats;
	}

	/**
	 * Use one conservative quality setting for new WebP files.
	 *
	 * @param int    $quality Current quality.
	 * @param string $mime_type Output MIME type.
	 * @return int
	 */
	function filter_new_upload_quality( $quality, $mime_type ) {
		return active_upload_attachment() && 'image/webp' === $mime_type ? IMAGE_OPTIMIZATION_QUALITY : $quality;
	}

	/**
	 * End the processing window after the new attachment's initial generation.
	 *
	 * @param array  $metadata Generated attachment metadata.
	 * @param int    $attachment_id Attachment ID.
	 * @param string $context Generation context.
	 * @return array
	 */
	function finish_new_upload_optimization( $metadata, $attachment_id, $context ) {
		if ( 'create' === $context && active_upload_attachment() === (int) $attachment_id ) {
			stop_new_upload_optimization();
		}

		return $metadata;
	}

	/** Remove all request-scoped optimization filters. */
	function stop_new_upload_optimization() {
		remove_filter( 'big_image_size_threshold', __NAMESPACE__ . '\\filter_new_upload_max_dimension', 10 );
		remove_filter( 'image_editor_output_format', __NAMESPACE__ . '\\filter_new_upload_output_format', 10 );
		remove_filter( 'wp_editor_set_quality', __NAMESPACE__ . '\\filter_new_upload_quality', 10 );
		remove_filter( 'wp_generate_attachment_metadata', __NAMESPACE__ . '\\finish_new_upload_optimization', PHP_INT_MAX );
		active_upload_attachment( 0 );
	}
	add_action( 'shutdown', __NAMESPACE__ . '\\stop_new_upload_optimization' );
}

namespace {
	if ( ! function_exists( 'magazine_core_get_post_media' ) ) {
		function magazine_core_get_post_media( $post_id, $size = 'large' ) {
			return \Magazine_Core\get_post_media( $post_id, $size );
		}
	}
}
