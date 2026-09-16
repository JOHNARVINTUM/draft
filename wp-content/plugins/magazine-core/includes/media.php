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
	const IMAGE_OPTIMIZATION_PENDING_META  = '_magazine_core_image_optimization_pending';

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

		if ( 'image/jpeg' === get_post_mime_type( $attachment_id ) ) {
			update_post_meta( $attachment_id, IMAGE_OPTIMIZATION_PENDING_META, '1' );
		}

		activate_upload_optimization( $attachment_id );
	}
	add_action( 'add_attachment', __NAMESPACE__ . '\\begin_new_upload_optimization' );

	/**
	 * Enable request-scoped image optimization for one attachment.
	 *
	 * @param int $attachment_id Attachment ID.
	 */
	function activate_upload_optimization( $attachment_id ) {
		active_upload_attachment( $attachment_id );
		add_filter( 'big_image_size_threshold', __NAMESPACE__ . '\\filter_new_upload_max_dimension', 10, 4 );
		add_filter( 'image_editor_output_format', __NAMESPACE__ . '\\filter_new_upload_output_format', 10, 3 );
		add_filter( 'wp_editor_set_quality', __NAMESPACE__ . '\\filter_new_upload_quality', 10, 2 );
		add_filter( 'wp_generate_attachment_metadata', __NAMESPACE__ . '\\finish_new_upload_optimization', PHP_INT_MAX, 3 );
	}

	/**
	 * Restore optimization before WordPress resumes a failed upload in a later request.
	 */
	function restore_deferred_upload_optimization() {
		$attachment_id = isset( $_POST['attachment_id'] ) ? absint( wp_unslash( $_POST['attachment_id'] ) ) : 0;

		if (
			! $attachment_id
			|| ! check_ajax_referer( 'media-form', '_wpnonce', false )
			|| ! current_user_can( 'upload_files' )
			|| '1' !== get_post_meta( $attachment_id, IMAGE_OPTIMIZATION_PENDING_META, true )
		) {
			return;
		}

		if ( ! wp_attachment_is_image( $attachment_id ) || 'image/jpeg' !== get_post_mime_type( $attachment_id ) ) {
			delete_post_meta( $attachment_id, IMAGE_OPTIMIZATION_PENDING_META );
			return;
		}

		remove_missing_size_metadata( $attachment_id );
		activate_upload_optimization( $attachment_id );
	}
	add_action( 'wp_ajax_media-create-image-subsizes', __NAMESPACE__ . '\\restore_deferred_upload_optimization', 0 );

	/**
	 * Remove stale size records so WordPress can regenerate files that are missing.
	 *
	 * @param int $attachment_id Attachment ID.
	 */
	function remove_missing_size_metadata( $attachment_id ) {
		$metadata      = wp_get_attachment_metadata( $attachment_id );
		$attached_file = get_attached_file( $attachment_id );

		if ( ! is_array( $metadata ) || empty( $metadata['sizes'] ) || ! $attached_file ) {
			return;
		}

		$upload_dir = trailingslashit( dirname( $attached_file ) );
		$changed    = false;

		foreach ( $metadata['sizes'] as $size_name => $size_data ) {
			if ( empty( $size_data['file'] ) || ! is_file( $upload_dir . wp_basename( $size_data['file'] ) ) ) {
				unset( $metadata['sizes'][ $size_name ] );
				$changed = true;
			}
		}

		if ( $changed ) {
			wp_update_attachment_metadata( $attachment_id, $metadata );
		}
	}

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
		if (
			in_array( $context, array( 'create', 'update' ), true )
			&& active_upload_attachment() === (int) $attachment_id
		) {
			if (
				'1' === get_post_meta( $attachment_id, IMAGE_OPTIMIZATION_PENDING_META, true )
				&& attachment_metadata_files_exist( $attachment_id, $metadata )
			) {
				delete_post_meta( $attachment_id, IMAGE_OPTIMIZATION_PENDING_META );
			}

			stop_new_upload_optimization();
		}

		return $metadata;
	}

	/**
	 * Verify that attachment metadata only advertises files present on disk.
	 *
	 * @param int   $attachment_id Attachment ID.
	 * @param array $metadata Attachment metadata.
	 * @return bool
	 */
	function attachment_metadata_files_exist( $attachment_id, $metadata ) {
		$attached_file = get_attached_file( $attachment_id );

		if ( ! is_array( $metadata ) || empty( $metadata['file'] ) || ! $attached_file || ! is_file( $attached_file ) ) {
			return false;
		}

		$upload_dir = trailingslashit( dirname( $attached_file ) );

		if (
			! empty( $metadata['original_image'] )
			&& ! is_file( $upload_dir . wp_basename( $metadata['original_image'] ) )
		) {
			return false;
		}

		foreach ( $metadata['sizes'] ?? array() as $size_data ) {
			if ( empty( $size_data['file'] ) || ! is_file( $upload_dir . wp_basename( $size_data['file'] ) ) ) {
				return false;
			}
		}

		if ( function_exists( 'wp_get_missing_image_subsizes' ) && wp_get_missing_image_subsizes( $attachment_id ) ) {
			return false;
		}

		return true;
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
