<?php
/**
 * Shared magazine query helpers.
 *
 * @package Magazine_Core
 */

namespace Magazine_Core {
	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}

	/**
	 * Fetch published posts with Parcinq's default query behavior.
	 *
	 * @param array $args Query arguments.
	 * @return WP_Post[]
	 */
	function get_posts( $args = array() ) {
		$defaults = array(
			'post_type'           => 'post',
			'post_status'         => 'publish',
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		);

		$query = new \WP_Query( array_merge( $defaults, $args ) );
		$posts = $query->posts;
		wp_reset_postdata();

		return $posts;
	}

	/**
	 * Fetch posts for a category slug.
	 *
	 * @param string $slug Category slug.
	 * @param int    $count Number of posts to return.
	 * @param array  $exclude_ids Post IDs to exclude.
	 * @return array{category:?WP_Term,posts:array}
	 */
	function get_section_posts( $slug, $count, $exclude_ids = array() ) {
		$category = get_category_by_slug( sanitize_title( (string) $slug ) );

		if ( ! $category instanceof \WP_Term ) {
			return array(
				'category' => null,
				'posts'    => array(),
			);
		}

		return array(
			'category' => $category,
			'posts'    => get_posts(
				array(
					'posts_per_page' => (int) $count,
					'cat'            => (int) $category->term_id,
					'post__not_in'   => array_values( array_unique( array_map( 'absint', (array) $exclude_ids ) ) ),
				)
			),
		);
	}

	/**
	 * Fetch homepage hero posts, preferring sticky posts and filling with latest posts.
	 *
	 * @param int $count Number of posts to return.
	 * @return WP_Post[]
	 */
	function get_hero_posts( $count = 3 ) {
		$count        = max( 0, (int) $count );
		$sticky_posts = get_option( 'sticky_posts' );
		$hero_posts   = array();

		if ( 0 === $count ) {
			return array();
		}

		if ( ! empty( $sticky_posts ) ) {
			$hero_posts = get_posts(
				array(
					'posts_per_page'      => $count,
					'post__in'            => $sticky_posts,
					'post__not_in'        => array(),
					'ignore_sticky_posts' => false,
					'orderby'             => 'date',
					'order'               => 'DESC',
				)
			);
		}

		if ( count( $hero_posts ) < $count ) {
			$hero_ids = wp_list_pluck( $hero_posts, 'ID' );
			$hero_posts = array_merge(
				$hero_posts,
				get_posts(
					array(
						'posts_per_page' => $count - count( $hero_posts ),
						'post__not_in'   => array_map( 'absint', $hero_ids ),
					)
				)
			);
		}

		return array_slice( $hero_posts, 0, $count );
	}

	/**
	 * Fetch related post IDs by shared categories, with latest-post fallback.
	 *
	 * @param int $post_id Current post ID.
	 * @param int $count Number of related posts to return.
	 * @return int[]
	 */
	function get_related_posts( $post_id, $count = 3 ) {
		$post_id     = absint( $post_id );
		$count       = max( 0, (int) $count );
		$related_ids = array();
		$categories  = get_the_category( $post_id );

		if ( 0 === $count || 0 === $post_id ) {
			return array();
		}

		$category_ids = wp_list_pluck( $categories, 'term_id' );

		if ( ! empty( $category_ids ) ) {
			$category_query = new \WP_Query(
				array(
					'cat'                 => implode( ',', array_map( 'absint', $category_ids ) ),
					'ignore_sticky_posts' => true,
					'no_found_rows'       => true,
					'post__not_in'        => array( $post_id ),
					'posts_per_page'      => $count,
				)
			);

			if ( $category_query->have_posts() ) {
				while ( $category_query->have_posts() ) {
					$category_query->the_post();
					$related_ids[] = get_the_ID();
				}
				wp_reset_postdata();
			}
		}

		$related_ids = array_values( array_unique( array_map( 'absint', $related_ids ) ) );

		if ( count( $related_ids ) < $count ) {
			$fill_query = new \WP_Query(
				array(
					'ignore_sticky_posts' => true,
					'no_found_rows'       => true,
					'post__not_in'        => array_merge( array( $post_id ), $related_ids ),
					'posts_per_page'      => $count - count( $related_ids ),
				)
			);

			if ( $fill_query->have_posts() ) {
				while ( $fill_query->have_posts() ) {
					$fill_query->the_post();
					$related_ids[] = get_the_ID();
				}
				wp_reset_postdata();
			}
		}

		return array_slice( array_values( array_unique( array_map( 'absint', $related_ids ) ) ), 0, $count );
	}

	/**
	 * Resolve the display category for a post using the deepest assigned category.
	 *
	 * @param int $post_id Post ID.
	 * @return WP_Term|null
	 */
	function get_display_category( $post_id ) {
		$categories = get_the_category( $post_id );

		if ( empty( $categories ) ) {
			return null;
		}

		usort(
			$categories,
			static function ( $first, $second ) {
				$first_depth  = count( get_ancestors( $first->term_id, 'category' ) );
				$second_depth = count( get_ancestors( $second->term_id, 'category' ) );

				if ( $first_depth === $second_depth ) {
					return $first->term_id <=> $second->term_id;
				}

				return $second_depth <=> $first_depth;
			}
		);

		return $categories[0];
	}
}

namespace {
	if ( ! function_exists( 'magazine_core_get_section_posts' ) ) {
		function magazine_core_get_section_posts( $slug, $count, $exclude_ids = array() ) {
			return \Magazine_Core\get_section_posts( $slug, $count, $exclude_ids );
		}
	}

	if ( ! function_exists( 'magazine_core_get_hero_posts' ) ) {
		function magazine_core_get_hero_posts( $count = 3 ) {
			return \Magazine_Core\get_hero_posts( $count );
		}
	}

	if ( ! function_exists( 'magazine_core_get_related_posts' ) ) {
		function magazine_core_get_related_posts( $post_id, $count = 3 ) {
			return \Magazine_Core\get_related_posts( $post_id, $count );
		}
	}

	if ( ! function_exists( 'magazine_core_get_display_category' ) ) {
		function magazine_core_get_display_category( $post_id ) {
			return \Magazine_Core\get_display_category( $post_id );
		}
	}
}