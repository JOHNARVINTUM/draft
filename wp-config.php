<?php
/**
 * WordPress local development configuration for DRAFT.
 */

define( 'DB_NAME', 'draft_wp' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

define( 'AUTH_KEY',         'MM]+gk+)Ft.3lHOF-kh))k}x!])k<jMP%{,I9XnuPU$Go1?sM<~}nQ7R9.F4,81R' );
define( 'SECURE_AUTH_KEY',  '?T4->@DL1:W>mCVB?X&&h@T{Gh9pee1BMV<j5*w&=C!q49ShkD3m[gHH}{[*`U{4' );
define( 'LOGGED_IN_KEY',    '0aQrn,aZJFAMj1-*6-.niPGfkuKPGA|f+*H+_D>Y<lD[Z9d,w}w{<2>!k~.;O(R+' );
define( 'NONCE_KEY',        ';_ scBxrow2D~MQ?1y;Gk]@I.&J@o(l6>38CELK267atByElM>c*gh04aQ6g-V<`' );
define( 'AUTH_SALT',        '7}h2iL?J0l<BW@2;_oO= h zbBg%xf]u{}X-wu<,,(3/]17vP#6@g)GRx<M-hH|{' );
define( 'SECURE_AUTH_SALT', 'g%W1cJ7i>tz@xE<,GFucKZO29a(M@XclCW$Vx&*E/0.Sk@byU-Fb=}+-{%mll3ZV' );
define( 'LOGGED_IN_SALT',   '04CI!YRaNl$O?0u!6-<t^O]s_0b$`l!j)4@scmF~{Sz >1pRVH6N/i>VPRsr|7*!' );
define( 'NONCE_SALT',       'kAa!(YbM)!q=*SW|EP]},iBq$ooO-,Uhh>>lAS4x>L}-3`tQ=K8rN]-K<+]o/EoT' );

$table_prefix = 'wp_';

define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
