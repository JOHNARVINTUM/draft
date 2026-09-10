<?php
/**
 * Native CMS fields for the DRAFT About page.
 *
 * @package Draft_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Return About copy, using the approved design text until an editor saves it.
 *
 * @param int $post_id About page ID.
 * @return array<string, string>
 */
function draft_theme_get_about_content( $post_id ) {
	$content = array(
		'title'            => __( 'About DRAFT', 'draft-theme' ),
		'subtitle'         => __( 'Where the Boys Play', 'draft-theme' ),
		'featured_title'   => __( 'Featured', 'draft-theme' ),
		'featured_content' => __( 'Explore the most talked-about articles, exclusive interviews, and trending insights curated by our editors. From fashion and beauty to lifestyle, sports, and business, discover content that inspires, informs, and captivates.', 'draft-theme' ),
		'brand_title'      => __( 'draft ph', 'draft-theme' ),
		'brand_subtitle'   => __( 'Youth Culture Journal', 'draft-theme' ),
	);

	foreach ( $content as $key => $default ) {
		$meta_key = '_draft_about_' . $key;
		if ( metadata_exists( 'post', $post_id, $meta_key ) ) {
			$content[ $key ] = (string) get_post_meta( $post_id, $meta_key, true );
		}
	}

	$page_content       = (string) get_post_field( 'post_content', $post_id );
	$content['content'] = '' !== trim( $page_content )
		? $page_content
		: __( 'DRAFT is a bold, digital hub serving up stylish, unfiltered stories about the athletes and gamers you love - by fans, for fans. Built for those who live for the game and the personalities behind it, DRAFT connects sports culture with style, attitude, and community.', 'draft-theme' );

	return $content;
}

/**
 * Return an About image attachment and whether it has an explicit CMS value.
 *
 * @param int    $post_id About page ID.
 * @param string $position Main or bottom.
 * @return array{id: int, is_set: bool}
 */
function draft_theme_get_about_image( $post_id, $position ) {
	$position = in_array( $position, array( 'main', 'bottom' ), true ) ? $position : 'main';
	$meta_key = '_draft_about_' . $position . '_image_id';

	return array(
		'id'     => absint( get_post_meta( $post_id, $meta_key, true ) ),
		'is_set' => metadata_exists( 'post', $post_id, $meta_key ),
	);
}

/** Register About page metadata. */
function draft_theme_register_about_meta() {
	foreach ( array( 'title', 'subtitle', 'featured_title', 'brand_title', 'brand_subtitle' ) as $field ) {
		register_post_meta(
			'page',
			'_draft_about_' . $field,
			array(
				'type'              => 'string',
				'single'            => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => static function () {
					return current_user_can( 'edit_pages' );
				},
				'show_in_rest'      => false,
			)
		);
	}

	foreach ( array( 'featured_content' ) as $field ) {
		register_post_meta(
			'page',
			'_draft_about_' . $field,
			array(
				'type'              => 'string',
				'single'            => true,
				'sanitize_callback' => 'wp_kses_post',
				'auth_callback'     => static function () {
					return current_user_can( 'edit_pages' );
				},
				'show_in_rest'      => false,
			)
		);
	}

	foreach ( array( 'main_image_id', 'bottom_image_id' ) as $field ) {
		register_post_meta(
			'page',
			'_draft_about_' . $field,
			array(
				'type'              => 'integer',
				'single'            => true,
				'sanitize_callback' => 'absint',
				'auth_callback'     => static function () {
					return current_user_can( 'edit_pages' );
				},
				'show_in_rest'      => false,
			)
		);
	}
}
add_action( 'init', 'draft_theme_register_about_meta' );

/**
 * Check whether a page uses the DRAFT About template.
 *
 * @param int $post_id Page ID.
 * @return bool
 */
function draft_theme_is_about_page( $post_id ) {
	return 'page-about.php' === get_page_template_slug( $post_id );
}

/**
 * Add controls only to the existing About page.
 *
 * @param WP_Post $post Current page.
 */
function draft_theme_add_about_meta_box( $post ) {
	if ( draft_theme_is_about_page( $post->ID ) ) {
		add_meta_box( 'draft-about-content', __( 'DRAFT About Page Content', 'draft-theme' ), 'draft_theme_render_about_meta_box', 'page', 'normal', 'high' );
	}
}
add_action( 'add_meta_boxes_page', 'draft_theme_add_about_meta_box' );

/**
 * Render a WordPress Media Library image control.
 *
 * @param string $position Main or bottom.
 * @param string $label Field label.
 * @param int    $image_id Selected attachment ID.
 */
function draft_theme_render_about_image_control( $position, $label, $image_id ) {
	?>
	<div data-draft-admin-about-image>
		<h3><?php echo esc_html( $label ); ?></h3>
		<input type="hidden" name="draft_about_<?php echo esc_attr( $position ); ?>_image_id" value="<?php echo esc_attr( (string) $image_id ); ?>" data-draft-admin-about-image-input>
		<div data-draft-admin-about-image-preview>
			<?php if ( $image_id ) : ?>
				<?php echo wp_get_attachment_image( $image_id, 'medium', false, array( 'style' => 'display:block;max-width:320px;height:auto;margin-bottom:10px;' ) ); ?>
			<?php endif; ?>
		</div>
		<p>
			<button type="button" class="button" data-draft-admin-about-image-select><?php esc_html_e( 'Select or Upload Image', 'draft-theme' ); ?></button>
			<button type="button" class="button" data-draft-admin-about-image-remove<?php echo $image_id ? '' : ' hidden'; ?>><?php esc_html_e( 'Remove Image', 'draft-theme' ); ?></button>
		</p>
	</div>
	<?php
}

/**
 * Render the About editor controls.
 *
 * @param WP_Post $post Current page.
 */
function draft_theme_render_about_meta_box( $post ) {
	$content      = draft_theme_get_about_content( $post->ID );
	$main_image   = draft_theme_get_about_image( $post->ID, 'main' );
	$bottom_image = draft_theme_get_about_image( $post->ID, 'bottom' );

	wp_nonce_field( 'draft_about_save', 'draft_about_nonce' );
	?>
	<table class="form-table" role="presentation">
		<tr><th scope="row"><label for="draft-about-title"><?php esc_html_e( 'About Title', 'draft-theme' ); ?></label></th><td><input class="large-text" id="draft-about-title" name="draft_about_title" type="text" value="<?php echo esc_attr( $content['title'] ); ?>"></td></tr>
		<tr><th scope="row"><label for="draft-about-subtitle"><?php esc_html_e( 'About Subtitle', 'draft-theme' ); ?></label></th><td><input class="large-text" id="draft-about-subtitle" name="draft_about_subtitle" type="text" value="<?php echo esc_attr( $content['subtitle'] ); ?>"></td></tr>
	</table>
	<h3><?php esc_html_e( 'About Content', 'draft-theme' ); ?></h3>
	<p class="description"><?php esc_html_e( 'Edit the main About description in the standard WordPress page editor above. Rich text, links, headings, and images are preserved.', 'draft-theme' ); ?></p>
	<table class="form-table" role="presentation">
		<tr><th scope="row"><label for="draft-about-featured-title"><?php esc_html_e( 'Featured Heading', 'draft-theme' ); ?></label></th><td><input class="large-text" id="draft-about-featured-title" name="draft_about_featured_title" type="text" value="<?php echo esc_attr( $content['featured_title'] ); ?>"></td></tr>
		<tr><th scope="row"><label for="draft-about-featured-content"><?php esc_html_e( 'Featured Description', 'draft-theme' ); ?></label></th><td><textarea class="large-text" id="draft-about-featured-content" name="draft_about_featured_content" rows="4"><?php echo esc_textarea( $content['featured_content'] ); ?></textarea></td></tr>
		<tr><th scope="row"><label for="draft-about-brand-title"><?php esc_html_e( 'Brand Title', 'draft-theme' ); ?></label></th><td><input class="large-text" id="draft-about-brand-title" name="draft_about_brand_title" type="text" value="<?php echo esc_attr( $content['brand_title'] ); ?>"></td></tr>
		<tr><th scope="row"><label for="draft-about-brand-subtitle"><?php esc_html_e( 'Brand Subtitle', 'draft-theme' ); ?></label></th><td><input class="large-text" id="draft-about-brand-subtitle" name="draft_about_brand_subtitle" type="text" value="<?php echo esc_attr( $content['brand_subtitle'] ); ?>"></td></tr>
	</table>
	<hr>
	<?php draft_theme_render_about_image_control( 'main', __( 'Main Image', 'draft-theme' ), $main_image['id'] ); ?>
	<p class="description"><?php esc_html_e( 'The full-width image at the top. The approved theme image remains the default until one is selected.', 'draft-theme' ); ?></p>
	<hr>
	<?php draft_theme_render_about_image_control( 'bottom', __( 'Bottom Image', 'draft-theme' ), $bottom_image['id'] ); ?>
	<p class="description"><?php esc_html_e( 'The first image in the lower strip. If empty, the strip continues to use Magazine Issue covers.', 'draft-theme' ); ?></p>
	<?php
}

/**
 * Save About content and image attachment IDs.
 *
 * @param int $post_id Page ID.
 */
function draft_theme_save_about_meta( $post_id ) {
	if ( ! isset( $_POST['draft_about_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['draft_about_nonce'] ) ), 'draft_about_save' ) ) {
		return;
	}

	if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || wp_is_post_revision( $post_id ) || ! current_user_can( 'edit_page', $post_id ) || ! draft_theme_is_about_page( $post_id ) ) {
		return;
	}

	foreach ( array( 'title', 'subtitle', 'featured_title', 'brand_title', 'brand_subtitle' ) as $field ) {
		$value = isset( $_POST[ 'draft_about_' . $field ] ) ? sanitize_text_field( wp_unslash( $_POST[ 'draft_about_' . $field ] ) ) : '';
		update_post_meta( $post_id, '_draft_about_' . $field, $value );
	}

	foreach ( array( 'featured_content' ) as $field ) {
		$value = isset( $_POST[ 'draft_about_' . $field ] ) ? wp_kses_post( wp_unslash( $_POST[ 'draft_about_' . $field ] ) ) : '';
		update_post_meta( $post_id, '_draft_about_' . $field, $value );
	}

	foreach ( array( 'main', 'bottom' ) as $position ) {
		$field         = 'draft_about_' . $position . '_image_id';
		$attachment_id = isset( $_POST[ $field ] ) ? absint( $_POST[ $field ] ) : 0;
		if ( $attachment_id && ! wp_attachment_is_image( $attachment_id ) ) {
			$attachment_id = 0;
		}
		update_post_meta( $post_id, '_draft_about_' . $position . '_image_id', $attachment_id );
	}
}
add_action( 'save_post_page', 'draft_theme_save_about_meta' );

/**
 * Load the Media Library picker only while editing the About page.
 *
 * @param string $hook_suffix Current admin screen hook.
 */
function draft_theme_enqueue_about_admin_assets( $hook_suffix ) {
	if ( 'post.php' !== $hook_suffix && 'post-new.php' !== $hook_suffix ) {
		return;
	}

	$screen  = get_current_screen();
	$post_id = isset( $_GET['post'] ) ? absint( $_GET['post'] ) : 0;
	if ( ! $screen || 'page' !== $screen->post_type || ! $post_id || ! draft_theme_is_about_page( $post_id ) ) {
		return;
	}

	$script_path = DRAFT_THEME_PATH . '/assets/js/admin-about.js';
	wp_enqueue_media();
	wp_enqueue_script( 'draft-theme-admin-about', DRAFT_THEME_URI . '/assets/js/admin-about.js', array( 'jquery' ), file_exists( $script_path ) ? (string) filemtime( $script_path ) : DRAFT_THEME_VERSION, true );
	wp_localize_script(
		'draft-theme-admin-about',
		'draftAboutMedia',
		array(
			'title'  => __( 'Select About Image', 'draft-theme' ),
			'button' => __( 'Use this image', 'draft-theme' ),
		)
	);
}
add_action( 'admin_enqueue_scripts', 'draft_theme_enqueue_about_admin_assets' );
