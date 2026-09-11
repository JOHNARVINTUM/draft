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

	/**
	 * Convert oversized JPEG working images and sub-sizes to WebP.
	 *
	 * Smaller JPEGs are not converted because WordPress would retain the source
	 * alongside a second full-size file. PNG and GIF files retain their source
	 * formats to protect graphics, transparency, and animation.
	 *
	 * @param array  $formats Existing input-to-output MIME mappings.
	 * @param string $filename Source filename.
	 * @param string $mime_type Source MIME type.
	 * @return array
	 */
	function filter_image_output_format( $formats, $filename, $mime_type ) {
		static $convert_current_jpeg = false;

		if ( 'image/jpeg' !== $mime_type ) {
			return $formats;
		}

		if ( $filename && is_readable( $filename ) ) {
			$image_size           = wp_getimagesize( $filename );
			$convert_current_jpeg = $image_size && max( (int) $image_size[0], (int) $image_size[1] ) > 2560;
		}

		if (
			! $convert_current_jpeg
			|| ! wp_image_editor_supports(
				array(
					'mime_type'        => 'image/jpeg',
					'output_mime_type' => 'image/webp',
				)
			)
		) {
			return $formats;
		}

		$formats['image/jpeg'] = 'image/webp';
		return $formats;
	}
	add_filter( 'image_editor_output_format', __NAMESPACE__ . '\\filter_image_output_format', 10, 3 );

	/**
	 * Use a conservative quality setting for generated WebP files.
	 *
	 * @param int    $quality Current quality.
	 * @param string $mime_type Output MIME type.
	 * @return int
	 */
	function filter_image_quality( $quality, $mime_type ) {
		return 'image/webp' === $mime_type ? 82 : $quality;
	}
	add_filter( 'wp_editor_set_quality', __NAMESPACE__ . '\\filter_image_quality', 10, 2 );
}

namespace {
	if ( ! function_exists( 'magazine_core_get_post_media' ) ) {
		function magazine_core_get_post_media( $post_id, $size = 'large' ) {
			return \Magazine_Core\get_post_media( $post_id, $size );
		}
	}
}
