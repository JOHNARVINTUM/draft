<?php
/**
 * Shared magazine author helpers.
 *
 * @package Magazine_Core
 */

namespace Magazine_Core {
	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}

	/**
	 * Return normalized author profile data used by article templates.
	 *
	 * @param int $author_id Author user ID.
	 * @return array
	 */
	function get_author_profile( $author_id ) {
		$author_id   = (int) $author_id;
		$name        = get_the_author_meta( 'display_name', $author_id );
		$description = get_the_author_meta( 'description', $author_id );
		$url         = get_author_posts_url( $author_id );
		$first_name  = strtok( $name, ' ' ) ?: $name;
		$avatar_alt  = sprintf(
			/* translators: %s: Author display name. */
			__( 'Profile photo of %s', 'magazine-core' ),
			$name
		);

		return array(
			'id'          => $author_id,
			'name'        => $name,
			'description' => $description,
			'url'         => $url,
			'first_name'  => $first_name,
			'avatar_size' => 64,
			'avatar_alt'  => $avatar_alt,
		);
	}
}

namespace {
	if ( ! function_exists( 'magazine_core_get_author_profile' ) ) {
		function magazine_core_get_author_profile( $author_id ) {
			return \Magazine_Core\get_author_profile( $author_id );
		}
	}
}