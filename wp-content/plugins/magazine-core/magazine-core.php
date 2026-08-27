<?php
/**
 * Plugin Name: Magazine Core
 * Description: Shared CMS infrastructure for magazine sites.
 * Version: 0.1.0
 * Author: Big Picture Asia Inc.
 * Text Domain: magazine-core
 *
 * @package Magazine_Core
 */

namespace Magazine_Core;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MAGAZINE_CORE_VERSION', '0.1.0' );
define( 'MAGAZINE_CORE_PATH', plugin_dir_path( __FILE__ ) );

require_once MAGAZINE_CORE_PATH . 'includes/config.php';
require_once MAGAZINE_CORE_PATH . 'includes/fields.php';
require_once MAGAZINE_CORE_PATH . 'includes/queries.php';
require_once MAGAZINE_CORE_PATH . 'includes/media.php';
require_once MAGAZINE_CORE_PATH . 'includes/authors.php';
require_once MAGAZINE_CORE_PATH . 'includes/navigation.php';
require_once MAGAZINE_CORE_PATH . 'includes/issues.php';

