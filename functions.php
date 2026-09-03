<?php
/**
 * Jardine Technologies — WordPress functions.php
 * ---------------------------------------------------------------------------
 * Adds an editable Catalogue and Team Members section to WordPress.
 *
 * WHAT THIS GIVES YOU IN WP-ADMIN
 *   • "Catalogue" menu  → add / edit products, with multiple images, a spec
 *                         table, key highlights and supply/warranty rows.
 *   • "Product Categories" → group products (Computing Solutions, Servers, …)
 *   • "Team" menu       → add / edit team members with photo, role, bio, links.
 *
 * SHORTCODES (paste into any page or post)
 *   [jardine_catalogue]                 full catalogue grid with category filter
 *   [jardine_catalogue category="servers-data-centre" columns="3" limit="12"]
 *   [jardine_product id="123"]          one product's full detail block
 *   [jardine_team]                      the team grid
 *   [jardine_team columns="3" limit="6"]
 *   [jardine_quote_form]                request-a-quote form (emails your inbox)
 *   [jardine_quote_form item="Rack Server 2U"]   pre-fills the product field
 *
 * INSTALL
 *   1. Upload this file to your active theme folder
 *      (wp-content/themes/YOUR-THEME/functions.php).
 *      If that file already exists, paste everything BELOW the <?php line
 *      onto the end of it instead of overwriting it.
 *   2. Visit Settings → Permalinks and click Save (flushes rewrite rules).
 *   3. Catalogue and Team appear in the left admin menu.
 *
 * @package JardineTechnologies
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

/* -------------------------------------------------------------------------
 * 0. Settings
 * ---------------------------------------------------------------------- */

define( 'JT_QUOTE_EMAIL', 'Jardinetechnologies@gmail.com' ); // Where quote requests are sent.
define( 'JT_BRAND_CRIMSON', '#bf092f' );
define( 'JT_BRAND_CREAM', '#f4ece3' );

/* -------------------------------------------------------------------------
 * 1. Custom post types & taxonomy
 * ---------------------------------------------------------------------- */

function jt_register_post_types() {

	/* ---- Catalogue product ------------------------------------------- */
	register_post_type(
		'jt_product',
		array(
			'labels'        => array(
				'name'               => 'Catalogue',
				'singular_name'      => 'Product',
				'add_new'            => 'Add Product',
				'add_new_item'       => 'Add New Product',
				'edit_item'          => 'Edit Product',
				'new_item'           => 'New Product',
				'view_item'          => 'View Product',
				'search_items'       => 'Search Catalogue',
				'not_found'          => 'No products yet',
				'not_found_in_trash' => 'No products in trash',
				'all_items'          => 'All Products',
				'menu_name'          => 'Catalogue',
			),
			'public'        => true,
			'has_archive'   => true,
			'menu_icon'     => 'dashicons-archive',
			'menu_position' => 20,
			'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes' ),
			'rewrite'       => array( 'slug' => 'catalogue', 'with_front' => false ),
			'show_in_rest'  => true,
		)
	);

	/* ---- Product category -------------------------------------------- */
	register_taxonomy(
		'jt_product_cat',
		'jt_product',
		array(
			'labels'            => array(
				'name'          => 'Product Categories',
				'singular_name' => 'Product Category',
				'add_new_item'  => 'Add Product Category',
				'edit_item'     => 'Edit Product Category',
				'menu_name'     => 'Categories',
			),
			'hierarchical'      => true,
			'public'            => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'rewrite'           => array( 'slug' => 'catalogue-category', 'with_front' => false ),
		)
	);

	/* ---- Team member -------------------------------------------------- */
	register_post_type(
		'jt_team',
		array(
			'labels'        => array(
				'name'          => 'Team',
				'singular_name' => 'Team Member',
				'add_new'       => 'Add Member',
				'add_new_item'  => 'Add New Team Member',
				'edit_item'     => 'Edit Team Member',
				'all_items'     => 'All Members',
				'menu_name'     => 'Team',
			),
			'public'        => true,
			'has_archive'   => false,
			'menu_icon'     => 'dashicons-groups',
			'menu_position' => 21,
			'supports'      => array( 'title', 'thumbnail', 'page-attributes' ),
			'rewrite'       => array( 'slug' => 'team', 'with_front' => false ),
			'show_in_rest'  => false,
		)
	);
}
add_action( 'init', 'jt_register_post_types' );

/**
 * Flush rewrite rules once on activation so the pretty URLs work immediately.
 */
function jt_flush_rewrites() {
	if ( ! get_option( 'jt_rewrites_flushed_v1' ) ) {
		jt_register_post_types();
		flush_rewrite_rules();
		update_option( 'jt_rewrites_flushed_v1', 1 );
	}
}
add_action( 'init', 'jt_flush_rewrites', 20 );

/* -------------------------------------------------------------------------
 * 2. Seed the default categories and team profiles (runs once)
 * ---------------------------------------------------------------------- */

function jt_seed_defaults() {

	if ( get_option( 'jt_seeded_v1' ) ) {
		return;
	}

	// --- Categories -----------------------------------------------------
	$categories = array(
		'Computing Solutions',
		'Servers & Data Centre',
		'Networking Infrastructure',
		'Cybersecurity Solutions',
		'Data Storage & Backup',
		'IT Peripherals & Accessories',
		'Software & Licensing',
		'Complete IT Infrastructure',
	);
	foreach ( $categories as $name ) {
		if ( ! term_exists( $name, 'jt_product_cat' ) ) {
			wp_insert_term( $name, 'jt_product_cat' );
		}
	}

	// --- Default team profiles (placeholders — edit them in Team) --------
	$team = array(
		array( 'Full Name', 'Managing Director', 'Leads company strategy, key client relationships and the Malaysia–Dubai–Africa supply partnerships.' ),
		array( 'Full Name', 'Head of Technology Solutions', 'Owns solution design, from requirement gathering and sizing through to the final bill of materials.' ),
		array( 'Full Name', 'Procurement & Supply Chain Manager', 'Manages authorised distribution channels, pricing, stock availability and manufacturer relationships.' ),
		array( 'Full Name', 'Logistics & Trade Compliance Lead', 'Coordinates freight, customs documentation and Incoterms so shipments clear cleanly at destination.' ),
		array( 'Full Name', 'Regional Manager — Africa', 'First point of contact for clients across the continent, from first enquiry to on-site handover.' ),
		array( 'Full Name', 'Technical Services Engineer', 'Handles installation, configuration, imaging and post-deployment support for delivered infrastructure.' ),
	);

	$order = 0;
	foreach ( $team as $member ) {
		$order += 10;
		$post_id = wp_insert_post(
			array(
				'post_type'   => 'jt_team',
				'post_title'  => $member[0],
				'post_status' => 'publish',
				'menu_order'  => $order,
			)
		);
		if ( $post_id && ! is_wp_error( $post_id ) ) {
			update_post_meta( $post_id, '_jt_role', $member[1] );
			update_post_meta( $post_id, '_jt_bio', $member[2] );
			update_post_meta( $post_id, '_jt_email', JT_QUOTE_EMAIL );
		}
	}

	update_option( 'jt_seeded_v1', 1 );
}
add_action( 'admin_init', 'jt_seed_defaults' );

/* -------------------------------------------------------------------------
 * 3. Meta boxes — Product
 * ---------------------------------------------------------------------- */

function jt_add_meta_boxes() {
	add_meta_box( 'jt_product_details', 'Product Details', 'jt_product_details_box', 'jt_product', 'normal', 'high' );
	add_meta_box( 'jt_product_gallery', 'Product Images (gallery)', 'jt_product_gallery_box', 'jt_product', 'side', 'default' );
	add_meta_box( 'jt_product_specs', 'Technical Specification (table)', 'jt_product_specs_box', 'jt_product', 'normal', 'default' );
	add_meta_box( 'jt_product_highlights', 'Key Highlights', 'jt_product_highlights_box', 'jt_product', 'normal', 'default' );
	add_meta_box( 'jt_product_commercial', 'Supply, Warranty & Delivery (table)', 'jt_product_commercial_box', 'jt_product', 'normal', 'default' );
	add_meta_box( 'jt_team_details', 'Member Details', 'jt_team_details_box', 'jt_team', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'jt_add_meta_boxes' );

/**
 * Small helper: render a labelled text input bound to a post meta key.
 */
function jt_text_field( $post_id, $key, $label, $placeholder = '', $type = 'text' ) {
	$value = get_post_meta( $post_id, $key, true );
	printf(
		'<p style="margin:0 0 14px"><label for="%1$s" style="display:block;font-weight:600;margin-bottom:4px">%2$s</label>
		 <input type="%5$s" id="%1$s" name="%1$s" value="%3$s" placeholder="%4$s" class="widefat"></p>',
		esc_attr( $key ),
		esc_html( $label ),
		esc_attr( $value ),
		esc_attr( $placeholder ),
		esc_attr( $type )
	);
}

/**
 * Product "at a glance" fields.
 */
function jt_product_details_box( $post ) {
	wp_nonce_field( 'jt_save_meta', 'jt_meta_nonce' );
	echo '<p style="color:#666;margin-top:0">These fields fill the “At a glance” table on the product page. Leave any of them blank to hide that row.</p>';
	echo '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 20px">';
	jt_text_field( $post->ID, '_jt_ref', 'Item reference', 'e.g. JT-RS2-104' );
	jt_text_field( $post->ID, '_jt_best_for', 'Best suited to', 'e.g. Data centres, server rooms, hosting' );
	jt_text_field( $post->ID, '_jt_condition', 'Condition', 'e.g. Brand new, factory sealed' );
	jt_text_field( $post->ID, '_jt_pricing', 'Pricing', 'e.g. On request — configuration dependent' );
	jt_text_field( $post->ID, '_jt_lead_time', 'Lead time', 'e.g. 2–4 weeks from confirmed order' );
	jt_text_field( $post->ID, '_jt_moq', 'Minimum order quantity', 'e.g. 1 unit' );
	echo '</div>';
}

/**
 * Multi-image gallery (stores a comma separated list of attachment IDs).
 */
function jt_product_gallery_box( $post ) {
	$ids = get_post_meta( $post->ID, '_jt_gallery', true );
	?>
	<p style="color:#666;margin-top:0">Add as many images as you like. The first one is used as the main image on the catalogue grid; the rest become thumbnails on the detail page.</p>
	<input type="hidden" id="jt_gallery" name="_jt_gallery" value="<?php echo esc_attr( $ids ); ?>">
	<div id="jt-gallery-preview" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px"></div>
	<button type="button" class="button button-primary" id="jt-gallery-add">Add / edit images</button>
	<button type="button" class="button" id="jt-gallery-clear">Clear all</button>
	<script>
	jQuery(function($){
		var frame, input = $('#jt_gallery'), box = $('#jt-gallery-preview');

		function render(){
			box.empty();
			var ids = input.val().split(',').filter(Boolean);
			if(!ids.length){ box.append('<em style="color:#888">No images selected.</em>'); return; }
			ids.forEach(function(id){
				$.post(ajaxurl, {action:'jt_thumb', id:id}, function(url){
					if(url){ box.append('<img src="'+url+'" style="width:64px;height:64px;object-fit:cover;border-radius:4px;border:1px solid #ccd0d4">'); }
				});
			});
		}

		$('#jt-gallery-add').on('click', function(e){
			e.preventDefault();
			if(frame){ frame.open(); return; }
			frame = wp.media({title:'Select product images', multiple:'add', library:{type:'image'}, button:{text:'Use these images'}});
			frame.on('select', function(){
				var ids = frame.state().get('selection').map(function(a){ return a.id; });
				input.val(ids.join(','));
				render();
			});
			frame.on('open', function(){
				var sel = frame.state().get('selection');
				input.val().split(',').filter(Boolean).forEach(function(id){
					sel.add(wp.media.attachment(id));
				});
			});
			frame.open();
		});

		$('#jt-gallery-clear').on('click', function(e){ e.preventDefault(); input.val(''); render(); });

		render();
	});
	</script>
	<?php
}

/**
 * AJAX: return a thumbnail URL for a given attachment ID (used by the gallery box).
 */
function jt_ajax_thumb() {
	$id  = isset( $_POST['id'] ) ? absint( $_POST['id'] ) : 0;
	$src = $id ? wp_get_attachment_image_url( $id, 'thumbnail' ) : '';
	echo esc_url_raw( $src );
	wp_die();
}
add_action( 'wp_ajax_jt_thumb', 'jt_ajax_thumb' );

/**
 * Generic repeatable label/value table editor.
 */
function jt_repeater_box( $post_id, $key, $intro, $label_ph, $value_ph ) {
	$rows = get_post_meta( $post_id, $key, true );
	$rows = is_array( $rows ) ? $rows : array();
	if ( empty( $rows ) ) {
		$rows = array( array( 'label' => '', 'value' => '' ) );
	}
	$uid = esc_attr( $key );
	echo '<p style="color:#666;margin-top:0">' . esc_html( $intro ) . '</p>';
	echo '<table class="widefat striped" id="' . $uid . '_table"><thead><tr>
			<th style="width:32%">Label</th><th>Value</th><th style="width:60px"></th>
		  </tr></thead><tbody>';
	foreach ( $rows as $i => $row ) {
		printf(
			'<tr>
				<td><input type="text" class="widefat" name="%1$s[%2$d][label]" value="%3$s" placeholder="%5$s"></td>
				<td><input type="text" class="widefat" name="%1$s[%2$d][value]" value="%4$s" placeholder="%6$s"></td>
				<td><button type="button" class="button jt-row-remove">Remove</button></td>
			</tr>',
			$uid,
			(int) $i,
			esc_attr( isset( $row['label'] ) ? $row['label'] : '' ),
			esc_attr( isset( $row['value'] ) ? $row['value'] : '' ),
			esc_attr( $label_ph ),
			esc_attr( $value_ph )
		);
	}
	echo '</tbody></table>';
	echo '<p><button type="button" class="button button-secondary jt-row-add" data-target="' . $uid . '_table" data-key="' . $uid . '">Add row</button></p>';
}

function jt_product_specs_box( $post ) {
	jt_repeater_box( $post->ID, '_jt_specs', 'Each row becomes a line in the specification table on the product page.', 'Processor', 'Up to 2× Intel Xeon Scalable' );
}

function jt_product_commercial_box( $post ) {
	jt_repeater_box( $post->ID, '_jt_commercial', 'Commercial terms shown under “Supply, warranty & delivery”.', 'Warranty', '3-year manufacturer warranty' );
}

function jt_product_highlights_box( $post ) {
	$value = get_post_meta( $post->ID, '_jt_highlights', true );
	echo '<p style="color:#666;margin-top:0">One highlight per line. These render as a numbered list on the product page.</p>';
	printf(
		'<textarea name="_jt_highlights" rows="6" class="widefat" placeholder="Redundant hot-swap power supplies&#10;Out-of-band management port&#10;Tool-less rail kit included">%s</textarea>',
		esc_textarea( is_string( $value ) ? $value : '' )
	);
}

/**
 * Team member fields.
 */
function jt_team_details_box( $post ) {
	wp_nonce_field( 'jt_save_meta', 'jt_meta_nonce' );
	echo '<p style="color:#666;margin-top:0">Set the member photo using the <strong>Featured image</strong> box. Use <strong>Order</strong> under Page Attributes to control where they appear (lower number = earlier).</p>';
	jt_text_field( $post->ID, '_jt_role', 'Job title', 'e.g. Head of Technology Solutions' );
	$bio = get_post_meta( $post->ID, '_jt_bio', true );
	echo '<p style="margin:0 0 14px"><label for="_jt_bio" style="display:block;font-weight:600;margin-bottom:4px">Short bio</label>';
	printf( '<textarea id="_jt_bio" name="_jt_bio" rows="3" class="widefat" placeholder="One or two sentences.">%s</textarea></p>', esc_textarea( is_string( $bio ) ? $bio : '' ) );
	echo '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 20px">';
	jt_text_field( $post->ID, '_jt_email', 'Email address', JT_QUOTE_EMAIL, 'email' );
	jt_text_field( $post->ID, '_jt_linkedin', 'LinkedIn URL', 'https://www.linkedin.com/in/…', 'url' );
	echo '</div>';
}

/* -------------------------------------------------------------------------
 * 4. Admin assets (media uploader + repeater script)
 * ---------------------------------------------------------------------- */

function jt_admin_assets( $hook ) {
	global $post;
	if ( ! in_array( $hook, array( 'post.php', 'post-new.php' ), true ) ) {
		return;
	}
	if ( ! $post || ! in_array( $post->post_type, array( 'jt_product', 'jt_team' ), true ) ) {
		return;
	}
	wp_enqueue_media();
	wp_enqueue_script( 'jquery' );
	add_action( 'admin_footer', 'jt_admin_footer_script' );
}
add_action( 'admin_enqueue_scripts', 'jt_admin_assets' );

function jt_admin_footer_script() {
	?>
	<script>
	jQuery(function($){
		$(document).on('click', '.jt-row-add', function(e){
			e.preventDefault();
			var table = $('#' + $(this).data('target')),
			    key   = $(this).data('key'),
			    idx   = table.find('tbody tr').length;
			table.find('tbody').append(
				'<tr>' +
				'<td><input type="text" class="widefat" name="' + key + '[' + idx + '][label]"></td>' +
				'<td><input type="text" class="widefat" name="' + key + '[' + idx + '][value]"></td>' +
				'<td><button type="button" class="button jt-row-remove">Remove</button></td>' +
				'</tr>'
			);
		});
		$(document).on('click', '.jt-row-remove', function(e){
			e.preventDefault();
			var tbody = $(this).closest('tbody');
			$(this).closest('tr').remove();
			if(!tbody.find('tr').length){ tbody.closest('table').next('p').find('.jt-row-add').trigger('click'); }
		});
	});
	</script>
	<?php
}

/* -------------------------------------------------------------------------
 * 5. Saving
 * ---------------------------------------------------------------------- */

function jt_save_meta( $post_id ) {

	if ( ! isset( $_POST['jt_meta_nonce'] ) || ! wp_verify_nonce( $_POST['jt_meta_nonce'], 'jt_save_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	// Plain text fields.
	$text_keys = array(
		'_jt_ref', '_jt_best_for', '_jt_condition', '_jt_pricing', '_jt_lead_time',
		'_jt_moq', '_jt_gallery', '_jt_role', '_jt_email', '_jt_linkedin',
	);
	foreach ( $text_keys as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}

	// Multi-line fields.
	foreach ( array( '_jt_highlights', '_jt_bio' ) as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_textarea_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}

	// Repeatable tables.
	foreach ( array( '_jt_specs', '_jt_commercial' ) as $key ) {
		if ( isset( $_POST[ $key ] ) && is_array( $_POST[ $key ] ) ) {
			$clean = array();
			foreach ( wp_unslash( $_POST[ $key ] ) as $row ) {
				$label = isset( $row['label'] ) ? sanitize_text_field( $row['label'] ) : '';
				$value = isset( $row['value'] ) ? sanitize_text_field( $row['value'] ) : '';
				if ( '' !== $label || '' !== $value ) {
					$clean[] = array( 'label' => $label, 'value' => $value );
				}
			}
			update_post_meta( $post_id, $key, $clean );
		}
	}
}
add_action( 'save_post_jt_product', 'jt_save_meta' );
add_action( 'save_post_jt_team', 'jt_save_meta' );

/* -------------------------------------------------------------------------
 * 6. Admin list columns
 * ---------------------------------------------------------------------- */

function jt_product_columns( $columns ) {
	$new = array();
	foreach ( $columns as $key => $label ) {
		$new[ $key ] = $label;
		if ( 'title' === $key ) {
			$new['jt_thumb'] = 'Image';
			$new['jt_ref']   = 'Reference';
		}
	}
	return $new;
}
add_filter( 'manage_jt_product_posts_columns', 'jt_product_columns' );

function jt_product_column_content( $column, $post_id ) {
	if ( 'jt_thumb' === $column ) {
		$src = jt_first_image_url( $post_id, 'thumbnail' );
		echo $src ? '<img src="' . esc_url( $src ) . '" style="width:48px;height:48px;object-fit:cover;border-radius:4px">' : '&mdash;';
	}
	if ( 'jt_ref' === $column ) {
		echo esc_html( get_post_meta( $post_id, '_jt_ref', true ) ?: '—' );
	}
}
add_action( 'manage_jt_product_posts_custom_column', 'jt_product_column_content', 10, 2 );

function jt_team_columns( $columns ) {
	$new = array();
	foreach ( $columns as $key => $label ) {
		$new[ $key ] = $label;
		if ( 'title' === $key ) {
			$new['jt_photo'] = 'Photo';
			$new['jt_role']  = 'Job title';
		}
	}
	return $new;
}
add_filter( 'manage_jt_team_posts_columns', 'jt_team_columns' );

function jt_team_column_content( $column, $post_id ) {
	if ( 'jt_photo' === $column ) {
		$src = get_the_post_thumbnail_url( $post_id, 'thumbnail' );
		echo $src ? '<img src="' . esc_url( $src ) . '" style="width:48px;height:48px;object-fit:cover;border-radius:50%">' : '&mdash;';
	}
	if ( 'jt_role' === $column ) {
		echo esc_html( get_post_meta( $post_id, '_jt_role', true ) ?: '—' );
	}
}
add_action( 'manage_jt_team_posts_custom_column', 'jt_team_column_content', 10, 2 );

/* -------------------------------------------------------------------------
 * 7. Front-end helpers
 * ---------------------------------------------------------------------- */

/**
 * All gallery image IDs for a product (falls back to the featured image).
 *
 * @return int[]
 */
function jt_gallery_ids( $post_id ) {
	$raw = get_post_meta( $post_id, '_jt_gallery', true );
	$ids = array_filter( array_map( 'absint', explode( ',', (string) $raw ) ) );
	if ( empty( $ids ) && has_post_thumbnail( $post_id ) ) {
		$ids = array( (int) get_post_thumbnail_id( $post_id ) );
	}
	return array_values( $ids );
}

function jt_first_image_url( $post_id, $size = 'large' ) {
	$ids = jt_gallery_ids( $post_id );
	return $ids ? wp_get_attachment_image_url( $ids[0], $size ) : '';
}

/**
 * Render a label/value table from a repeater meta field.
 */
function jt_render_table( $rows, $caption = '' ) {
	if ( empty( $rows ) || ! is_array( $rows ) ) {
		return '';
	}
	$out = '<table class="jt-table">';
	if ( $caption ) {
		$out .= '<caption>' . esc_html( $caption ) . '</caption>';
	}
	$out .= '<tbody>';
	foreach ( $rows as $row ) {
		$out .= '<tr><th scope="row">' . esc_html( $row['label'] ) . '</th><td>' . esc_html( $row['value'] ) . '</td></tr>';
	}
	return $out . '</tbody></table>';
}

/* -------------------------------------------------------------------------
 * 8. Shortcode — catalogue grid
 * ---------------------------------------------------------------------- */

function jt_shortcode_catalogue( $atts ) {

	$atts = shortcode_atts(
		array(
			'category' => '',   // category slug, or empty for all
			'columns'  => 3,
			'limit'    => -1,
			'filter'   => 'yes', // show the category filter pills
		),
		$atts,
		'jardine_catalogue'
	);

	$args = array(
		'post_type'      => 'jt_product',
		'posts_per_page' => (int) $atts['limit'],
		'orderby'        => array( 'menu_order' => 'ASC', 'title' => 'ASC' ),
	);
	if ( $atts['category'] ) {
		$args['tax_query'] = array(
			array(
				'taxonomy' => 'jt_product_cat',
				'field'    => 'slug',
				'terms'    => array_map( 'trim', explode( ',', $atts['category'] ) ),
			),
		);
	}

	$query = new WP_Query( $args );
	if ( ! $query->have_posts() ) {
		return '<p class="jt-empty">No products have been added yet.</p>';
	}

	ob_start();
	echo '<div class="jt-catalogue">';

	// Filter pills.
	if ( 'yes' === $atts['filter'] && ! $atts['category'] ) {
		$terms = get_terms( array( 'taxonomy' => 'jt_product_cat', 'hide_empty' => true ) );
		if ( ! is_wp_error( $terms ) && $terms ) {
			echo '<div class="jt-filters"><button type="button" class="jt-pill is-active" data-cat="all">All products</button>';
			foreach ( $terms as $term ) {
				printf(
					'<button type="button" class="jt-pill" data-cat="%s">%s</button>',
					esc_attr( $term->slug ),
					esc_html( $term->name )
				);
			}
			echo '</div>';
		}
	}

	printf( '<div class="jt-grid jt-cols-%d">', absint( $atts['columns'] ) );

	while ( $query->have_posts() ) {
		$query->the_post();
		$id    = get_the_ID();
		$slugs = wp_get_post_terms( $id, 'jt_product_cat', array( 'fields' => 'slugs' ) );
		$terms = wp_get_post_terms( $id, 'jt_product_cat' );
		$img   = jt_first_image_url( $id, 'large' );
		?>
		<article class="jt-card" data-cats="<?php echo esc_attr( implode( ' ', (array) $slugs ) ); ?>">
			<a class="jt-card-media" href="<?php the_permalink(); ?>">
				<?php if ( $img ) : ?>
					<img src="<?php echo esc_url( $img ); ?>" alt="<?php the_title_attribute(); ?>" loading="lazy">
				<?php endif; ?>
			</a>
			<div class="jt-card-body">
				<?php if ( ! is_wp_error( $terms ) && $terms ) : ?>
					<p class="jt-eyebrow"><?php echo esc_html( $terms[0]->name ); ?></p>
				<?php endif; ?>
				<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
				<p class="jt-card-text"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
				<a class="jt-card-link" href="<?php the_permalink(); ?>">View details <span aria-hidden="true">&rarr;</span></a>
			</div>
		</article>
		<?php
	}
	wp_reset_postdata();

	echo '</div></div>';
	echo jt_inline_filter_script();
	return ob_get_clean();
}
add_shortcode( 'jardine_catalogue', 'jt_shortcode_catalogue' );

function jt_inline_filter_script() {
	ob_start();
	?>
	<script>
	(function(){
		var root = document.currentScript.previousElementSibling;
		if(!root) return;
		root.addEventListener('click', function(e){
			var pill = e.target.closest('.jt-pill');
			if(!pill) return;
			root.querySelectorAll('.jt-pill').forEach(function(p){ p.classList.remove('is-active'); });
			pill.classList.add('is-active');
			var cat = pill.getAttribute('data-cat');
			root.querySelectorAll('.jt-card').forEach(function(card){
				var show = cat === 'all' || (' ' + card.getAttribute('data-cats') + ' ').indexOf(' ' + cat + ' ') > -1;
				card.style.display = show ? '' : 'none';
			});
		});
	})();
	</script>
	<?php
	return ob_get_clean();
}

/* -------------------------------------------------------------------------
 * 9. Shortcode — single product detail block
 * ---------------------------------------------------------------------- */

function jt_shortcode_product( $atts ) {

	$atts = shortcode_atts( array( 'id' => 0 ), $atts, 'jardine_product' );
	$id   = $atts['id'] ? absint( $atts['id'] ) : get_the_ID();
	$post = get_post( $id );

	if ( ! $post || 'jt_product' !== $post->post_type ) {
		return '';
	}

	$ids   = jt_gallery_ids( $id );
	$terms = wp_get_post_terms( $id, 'jt_product_cat' );

	$glance = array();
	if ( ! is_wp_error( $terms ) && $terms ) {
		$glance[] = array( 'label' => 'Category', 'value' => $terms[0]->name );
	}
	$fields = array(
		'_jt_ref'       => 'Item reference',
		'_jt_best_for'  => 'Best suited to',
		'_jt_condition' => 'Condition',
		'_jt_pricing'   => 'Pricing',
		'_jt_lead_time' => 'Lead time',
		'_jt_moq'       => 'Minimum order',
	);
	foreach ( $fields as $key => $label ) {
		$value = get_post_meta( $id, $key, true );
		if ( $value ) {
			$glance[] = array( 'label' => $label, 'value' => $value );
		}
	}

	$specs      = get_post_meta( $id, '_jt_specs', true );
	$commercial = get_post_meta( $id, '_jt_commercial', true );
	$highlights = array_filter( array_map( 'trim', explode( "\n", (string) get_post_meta( $id, '_jt_highlights', true ) ) ) );
	$quote_url  = add_query_arg( 'item', rawurlencode( get_the_title( $id ) ), jt_quote_page_url() );

	ob_start();
	?>
	<div class="jt-product">

		<div class="jt-product-top">
			<?php if ( $ids ) : ?>
			<div class="jt-gallery">
				<div class="jt-gallery-main">
					<img id="jt-main-<?php echo esc_attr( $id ); ?>"
						 src="<?php echo esc_url( wp_get_attachment_image_url( $ids[0], 'large' ) ); ?>"
						 alt="<?php echo esc_attr( get_the_title( $id ) ); ?>">
				</div>
				<?php if ( count( $ids ) > 1 ) : ?>
				<div class="jt-thumbs" role="list">
					<?php foreach ( $ids as $i => $att_id ) : ?>
						<button type="button" role="listitem"
								class="jt-thumb<?php echo 0 === $i ? ' is-active' : ''; ?>"
								data-full="<?php echo esc_url( wp_get_attachment_image_url( $att_id, 'large' ) ); ?>"
								data-target="jt-main-<?php echo esc_attr( $id ); ?>"
								aria-label="View image <?php echo (int) $i + 1; ?>">
							<img src="<?php echo esc_url( wp_get_attachment_image_url( $att_id, 'medium' ) ); ?>" alt="" loading="lazy">
						</button>
					<?php endforeach; ?>
				</div>
				<?php endif; ?>
				<p class="jt-note">Images are representative. Final configuration is confirmed on quotation.</p>
			</div>
			<?php endif; ?>

			<div class="jt-product-summary">
				<?php if ( ! is_wp_error( $terms ) && $terms ) : ?>
					<p class="jt-eyebrow"><?php echo esc_html( $terms[0]->name ); ?></p>
				<?php endif; ?>
				<h1><?php echo esc_html( get_the_title( $id ) ); ?></h1>
				<?php if ( $post->post_excerpt ) : ?>
					<p class="jt-lede"><?php echo esc_html( $post->post_excerpt ); ?></p>
				<?php endif; ?>
				<div class="jt-prose"><?php echo wp_kses_post( apply_filters( 'the_content', $post->post_content ) ); ?></div>

				<?php echo jt_render_table( $glance, 'At a glance' ); ?>

				<p class="jt-actions">
					<a class="jt-btn jt-btn-primary" href="<?php echo esc_url( $quote_url ); ?>">Request a Quote</a>
					<a class="jt-btn" href="mailto:<?php echo esc_attr( JT_QUOTE_EMAIL ); ?>">Email us</a>
				</p>
			</div>
		</div>

		<div class="jt-product-tables">
			<?php
			echo jt_render_table( is_array( $specs ) ? $specs : array(), 'Technical specification' );

			if ( $highlights ) {
				echo '<table class="jt-table"><caption>Key highlights</caption><tbody>';
				foreach ( $highlights as $i => $line ) {
					echo '<tr><th scope="row">' . esc_html( sprintf( '%02d', $i + 1 ) ) . '</th><td>' . esc_html( $line ) . '</td></tr>';
				}
				echo '</tbody></table>';
			}

			echo jt_render_table( is_array( $commercial ) ? $commercial : array(), 'Supply, warranty & delivery' );
			?>
		</div>
	</div>

	<script>
	(function(){
		document.addEventListener('click', function(e){
			var t = e.target.closest('.jt-thumb');
			if(!t) return;
			var main = document.getElementById(t.getAttribute('data-target'));
			if(main){ main.src = t.getAttribute('data-full'); }
			t.parentNode.querySelectorAll('.jt-thumb').forEach(function(b){ b.classList.remove('is-active'); });
			t.classList.add('is-active');
		});
	})();
	</script>
	<?php
	return ob_get_clean();
}
add_shortcode( 'jardine_product', 'jt_shortcode_product' );

/**
 * Automatically append the product block to single product pages.
 */
function jt_single_product_content( $content ) {
	if ( is_singular( 'jt_product' ) && in_the_loop() && is_main_query() ) {
		return jt_shortcode_product( array( 'id' => get_the_ID() ) );
	}
	return $content;
}
add_filter( 'the_content', 'jt_single_product_content' );

/* -------------------------------------------------------------------------
 * 10. Shortcode — team grid
 * ---------------------------------------------------------------------- */

function jt_shortcode_team( $atts ) {

	$atts = shortcode_atts( array( 'columns' => 3, 'limit' => -1 ), $atts, 'jardine_team' );

	$query = new WP_Query(
		array(
			'post_type'      => 'jt_team',
			'posts_per_page' => (int) $atts['limit'],
			'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'ASC' ),
		)
	);

	if ( ! $query->have_posts() ) {
		return '<p class="jt-empty">No team members have been added yet.</p>';
	}

	ob_start();
	printf( '<div class="jt-grid jt-team jt-cols-%d">', absint( $atts['columns'] ) );

	while ( $query->have_posts() ) {
		$query->the_post();
		$id       = get_the_ID();
		$role     = get_post_meta( $id, '_jt_role', true );
		$bio      = get_post_meta( $id, '_jt_bio', true );
		$email    = get_post_meta( $id, '_jt_email', true );
		$linkedin = get_post_meta( $id, '_jt_linkedin', true );
		$photo    = get_the_post_thumbnail_url( $id, 'medium_large' );
		?>
		<article class="jt-card jt-member">
			<div class="jt-card-media jt-member-photo">
				<?php if ( $photo ) : ?>
					<img src="<?php echo esc_url( $photo ); ?>" alt="<?php the_title_attribute(); ?>" loading="lazy">
				<?php else : ?>
					<svg viewBox="0 0 400 400" aria-hidden="true">
						<rect width="400" height="400" fill="<?php echo esc_attr( JT_BRAND_CREAM ); ?>"/>
						<circle cx="200" cy="163" r="56" fill="none" stroke="<?php echo esc_attr( JT_BRAND_CRIMSON ); ?>" stroke-opacity=".38" stroke-width="7"/>
						<path d="M104 322a96 96 0 0 1 192 0" fill="none" stroke="<?php echo esc_attr( JT_BRAND_CRIMSON ); ?>" stroke-opacity=".38" stroke-width="7" stroke-linecap="round"/>
					</svg>
				<?php endif; ?>
			</div>
			<div class="jt-card-body">
				<h3><?php the_title(); ?></h3>
				<?php if ( $role ) : ?><p class="jt-eyebrow"><?php echo esc_html( $role ); ?></p><?php endif; ?>
				<?php if ( $bio ) : ?><p class="jt-card-text"><?php echo esc_html( $bio ); ?></p><?php endif; ?>
				<?php if ( $email || $linkedin ) : ?>
					<p class="jt-member-links">
						<?php if ( $email ) : ?>
							<a href="mailto:<?php echo esc_attr( $email ); ?>">Email</a>
						<?php endif; ?>
						<?php if ( $linkedin ) : ?>
							<a href="<?php echo esc_url( $linkedin ); ?>" target="_blank" rel="noopener">LinkedIn</a>
						<?php endif; ?>
					</p>
				<?php endif; ?>
			</div>
		</article>
		<?php
	}
	wp_reset_postdata();
	echo '</div>';
	return ob_get_clean();
}
add_shortcode( 'jardine_team', 'jt_shortcode_team' );

/* -------------------------------------------------------------------------
 * 11. Shortcode — request a quote form
 * ---------------------------------------------------------------------- */

/**
 * URL of the page containing [jardine_quote_form]. Falls back to /quote/.
 */
function jt_quote_page_url() {
	$page = get_page_by_path( 'quote' );
	return $page ? get_permalink( $page ) : home_url( '/quote/' );
}

function jt_shortcode_quote_form( $atts ) {

	$atts = shortcode_atts( array( 'item' => '' ), $atts, 'jardine_quote_form' );
	$item = $atts['item'];
	if ( isset( $_GET['item'] ) ) {
		$item = sanitize_text_field( wp_unslash( $_GET['item'] ) );
	}

	$notice = '';
	if ( isset( $_GET['jt_quote'] ) ) {
		$notice = 'sent' === $_GET['jt_quote']
			? '<div class="jt-notice jt-notice-ok">Thank you — your request has been sent. We normally reply within one business day.</div>'
			: '<div class="jt-notice jt-notice-err">Sorry, the message could not be sent. Please email ' . esc_html( JT_QUOTE_EMAIL ) . ' directly.</div>';
	}

	ob_start();
	echo $notice;
	?>
	<form class="jt-form" method="post" action="">
		<?php wp_nonce_field( 'jt_quote_submit', 'jt_quote_nonce' ); ?>
		<input type="hidden" name="jt_quote_form" value="1">
		<p class="jt-hp" style="position:absolute;left:-9999px" aria-hidden="true">
			<label>Leave this field empty<input type="text" name="jt_website" tabindex="-1" autocomplete="off"></label>
		</p>

		<div class="jt-field-row">
			<p><label for="jt_name">Full name <span>*</span></label>
			   <input type="text" id="jt_name" name="jt_name" required></p>
			<p><label for="jt_org">Organisation <span>*</span></label>
			   <input type="text" id="jt_org" name="jt_org" required></p>
		</div>
		<div class="jt-field-row">
			<p><label for="jt_email">Work email <span>*</span></label>
			   <input type="email" id="jt_email" name="jt_email" required></p>
			<p><label for="jt_phone">Phone / WhatsApp</label>
			   <input type="tel" id="jt_phone" name="jt_phone"></p>
		</div>
		<div class="jt-field-row">
			<p><label for="jt_country">Delivery country</label>
			   <input type="text" id="jt_country" name="jt_country"></p>
			<p><label for="jt_item">Product of interest</label>
			   <input type="text" id="jt_item" name="jt_item" value="<?php echo esc_attr( $item ); ?>"></p>
		</div>
		<p><label for="jt_qty">Estimated quantity</label>
		   <input type="text" id="jt_qty" name="jt_qty"></p>
		<p><label for="jt_details">Requirement details <span>*</span></label>
		   <textarea id="jt_details" name="jt_details" rows="6" required placeholder="Tell us the specification, quantities, destination and timeline."></textarea></p>
		<p class="jt-consent">
			<label><input type="checkbox" name="jt_consent" value="yes" required>
			I agree to be contacted about this enquiry. <span>*</span></label>
		</p>
		<p><button type="submit" class="jt-btn jt-btn-primary">Send request</button></p>
		<p class="jt-note">Your request goes straight to our team at <?php echo esc_html( JT_QUOTE_EMAIL ); ?>.</p>
	</form>
	<?php
	return ob_get_clean();
}
add_shortcode( 'jardine_quote_form', 'jt_shortcode_quote_form' );

/**
 * Handle the submission and email it.
 */
function jt_handle_quote_submit() {

	if ( empty( $_POST['jt_quote_form'] ) ) {
		return;
	}
	if ( ! isset( $_POST['jt_quote_nonce'] ) || ! wp_verify_nonce( $_POST['jt_quote_nonce'], 'jt_quote_submit' ) ) {
		return;
	}
	if ( ! empty( $_POST['jt_website'] ) ) { // Honeypot tripped — silently drop.
		return;
	}

	$field = function( $key ) {
		return isset( $_POST[ $key ] ) ? sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) : '';
	};

	$name    = $field( 'jt_name' );
	$org     = $field( 'jt_org' );
	$email   = sanitize_email( isset( $_POST['jt_email'] ) ? wp_unslash( $_POST['jt_email'] ) : '' );
	$details = isset( $_POST['jt_details'] ) ? sanitize_textarea_field( wp_unslash( $_POST['jt_details'] ) ) : '';

	if ( ! $name || ! $org || ! is_email( $email ) || ! $details ) {
		wp_safe_redirect( add_query_arg( 'jt_quote', 'error', wp_get_referer() ?: home_url( '/' ) ) );
		exit;
	}

	$rows = array(
		'Full name'           => $name,
		'Organisation'        => $org,
		'Work email'          => $email,
		'Phone / WhatsApp'    => $field( 'jt_phone' ),
		'Delivery country'    => $field( 'jt_country' ),
		'Product of interest' => $field( 'jt_item' ),
		'Estimated quantity'  => $field( 'jt_qty' ),
		'Requirement details' => $details,
		'Submitted from'      => esc_url_raw( wp_get_referer() ?: home_url( '/' ) ),
	);

	$body = '<h2 style="font-family:Arial,sans-serif">New quote request</h2><table cellpadding="8" cellspacing="0" border="0" style="font-family:Arial,sans-serif;border-collapse:collapse">';
	foreach ( $rows as $label => $value ) {
		if ( '' === $value ) {
			continue;
		}
		$body .= '<tr><th align="left" style="border-bottom:1px solid #eee;color:' . esc_attr( JT_BRAND_CRIMSON ) . '">' . esc_html( $label ) . '</th>'
			   . '<td style="border-bottom:1px solid #eee">' . nl2br( esc_html( $value ) ) . '</td></tr>';
	}
	$body .= '</table>';

	$headers = array(
		'Content-Type: text/html; charset=UTF-8',
		'Reply-To: ' . $name . ' <' . $email . '>',
	);

	$sent = wp_mail(
		JT_QUOTE_EMAIL,
		'Quote request — ' . $org,
		$body,
		$headers
	);

	wp_safe_redirect( add_query_arg( 'jt_quote', $sent ? 'sent' : 'error', wp_get_referer() ?: home_url( '/' ) ) );
	exit;
}
add_action( 'template_redirect', 'jt_handle_quote_submit' );

/* -------------------------------------------------------------------------
 * 12. Front-end styles
 * ---------------------------------------------------------------------- */

function jt_front_styles() {
	$css = '
	:root{--jt-crimson:' . JT_BRAND_CRIMSON . ';--jt-crimson-deep:#8f0623;--jt-cream:' . JT_BRAND_CREAM . ';--jt-ink:#17110f;--jt-ink-2:#4a403c;--jt-ink-3:#7d716c;--jt-line:rgba(23,17,15,.10)}

	.jt-filters{display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:2rem}
	.jt-pill{border:1px solid var(--jt-line);background:#fff;color:var(--jt-ink-2);border-radius:999px;padding:.55rem 1.15rem;font-size:.86rem;font-weight:600;cursor:pointer;transition:.25s}
	.jt-pill:hover{border-color:var(--jt-crimson);color:var(--jt-crimson)}
	.jt-pill.is-active{background:var(--jt-crimson);border-color:var(--jt-crimson);color:#fff}

	.jt-grid{display:grid;gap:1.5rem}
	.jt-cols-2{grid-template-columns:repeat(2,1fr)}
	.jt-cols-3{grid-template-columns:repeat(3,1fr)}
	.jt-cols-4{grid-template-columns:repeat(4,1fr)}

	.jt-card{background:#fff;border:1px solid var(--jt-line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;transition:transform .35s,box-shadow .35s,border-color .35s}
	.jt-card:hover{transform:translateY(-4px);border-color:rgba(191,9,47,.28);box-shadow:0 18px 40px -24px rgba(23,17,15,.4)}
	.jt-card-media{display:block;aspect-ratio:4/3;background:var(--jt-cream);overflow:hidden}
	.jt-card-media img,.jt-card-media svg{width:100%;height:100%;object-fit:cover;display:block}
	.jt-card-body{padding:1.5rem;display:flex;flex-direction:column;gap:.5rem;flex:1}
	.jt-card-body h3{margin:0;font-size:1.15rem;line-height:1.3}
	.jt-card-body h3 a{color:var(--jt-ink);text-decoration:none}
	.jt-card-body h3 a:hover{color:var(--jt-crimson)}
	.jt-eyebrow{margin:0;font-size:.74rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--jt-crimson)}
	.jt-card-text{margin:0;font-size:.94rem;line-height:1.6;color:var(--jt-ink-2)}
	.jt-card-link{margin-top:auto;padding-top:.75rem;font-weight:600;font-size:.9rem;color:var(--jt-crimson);text-decoration:none}
	.jt-card-link:hover{text-decoration:underline}

	.jt-member-photo{aspect-ratio:1/1}
	.jt-member-links{margin:auto 0 0;padding-top:1rem;display:flex;gap:1rem}
	.jt-member-links a{font-size:.82rem;font-weight:600;color:var(--jt-ink-3);text-decoration:none;border-bottom:1px solid var(--jt-line);padding-bottom:2px}
	.jt-member-links a:hover{color:var(--jt-crimson);border-color:var(--jt-crimson)}

	.jt-product-top{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:3rem;align-items:start}
	.jt-gallery-main{aspect-ratio:4/3;background:var(--jt-cream);border-radius:14px;overflow:hidden}
	.jt-gallery-main img{width:100%;height:100%;object-fit:cover;display:block}
	.jt-thumbs{display:grid;grid-template-columns:repeat(4,1fr);gap:.65rem;margin-top:.75rem}
	.jt-thumb{padding:0;border:2px solid transparent;border-radius:9px;overflow:hidden;background:var(--jt-cream);cursor:pointer;aspect-ratio:4/3}
	.jt-thumb img{width:100%;height:100%;object-fit:cover;display:block}
	.jt-thumb.is-active{border-color:var(--jt-crimson)}
	.jt-note{font-size:.82rem;color:var(--jt-ink-3);margin-top:.75rem}

	.jt-lede{font-size:1.1rem;line-height:1.65;color:var(--jt-ink-2)}
	.jt-actions{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.75rem}
	.jt-btn{display:inline-block;padding:.85rem 1.6rem;border-radius:8px;border:1px solid var(--jt-ink);color:var(--jt-ink);font-weight:600;text-decoration:none;transition:.25s}
	.jt-btn:hover{background:var(--jt-ink);color:#fff}
	.jt-btn-primary{background:var(--jt-crimson);border-color:var(--jt-crimson);color:#fff}
	.jt-btn-primary:hover{background:var(--jt-crimson-deep);border-color:var(--jt-crimson-deep);color:#fff}

	.jt-table{width:100%;border-collapse:collapse;margin:1.75rem 0}
	.jt-table caption{caption-side:top;text-align:left;font-weight:700;font-size:.78rem;letter-spacing:.09em;text-transform:uppercase;color:var(--jt-crimson);padding-bottom:.75rem}
	.jt-table th,.jt-table td{text-align:left;padding:.85rem 1rem;border-bottom:1px solid var(--jt-line);font-size:.94rem;line-height:1.55;vertical-align:top}
	.jt-table th{width:38%;font-weight:600;color:var(--jt-ink);background:var(--jt-cream)}
	.jt-table td{color:var(--jt-ink-2)}
	.jt-product-tables{display:grid;grid-template-columns:repeat(2,1fr);gap:0 3rem;margin-top:3rem}

	.jt-form p{margin:0 0 1.15rem}
	.jt-field-row{display:grid;grid-template-columns:1fr 1fr;gap:0 1.25rem}
	.jt-form label{display:block;font-weight:600;font-size:.9rem;margin-bottom:.4rem;color:var(--jt-ink)}
	.jt-form label span{color:var(--jt-crimson)}
	.jt-form input[type=text],.jt-form input[type=email],.jt-form input[type=tel],.jt-form textarea{width:100%;padding:.8rem 1rem;border:1px solid var(--jt-line);border-radius:8px;font:inherit;font-size:.95rem;background:#fff}
	.jt-form input:focus,.jt-form textarea:focus{outline:2px solid var(--jt-crimson);outline-offset:1px;border-color:var(--jt-crimson)}
	.jt-consent label{font-weight:400;font-size:.9rem;color:var(--jt-ink-2)}
	.jt-notice{padding:1rem 1.25rem;border-radius:8px;margin-bottom:1.5rem;font-size:.95rem}
	.jt-notice-ok{background:var(--jt-cream);border-left:4px solid var(--jt-crimson);color:var(--jt-ink)}
	.jt-notice-err{background:#fdecef;border-left:4px solid var(--jt-crimson);color:var(--jt-ink)}
	.jt-empty{color:var(--jt-ink-3)}

	@media (max-width:900px){
		.jt-cols-3,.jt-cols-4{grid-template-columns:repeat(2,1fr)}
		.jt-product-top{grid-template-columns:1fr;gap:2rem}
		.jt-product-tables{grid-template-columns:1fr;gap:0}
	}
	@media (max-width:560px){
		.jt-grid,.jt-cols-2,.jt-cols-3,.jt-cols-4{grid-template-columns:1fr}
		.jt-field-row{grid-template-columns:1fr}
		.jt-card-body{padding:1.25rem}
		.jt-actions .jt-btn{width:100%;text-align:center}
		.jt-table th,.jt-table td{display:block;width:auto;border-bottom:none;padding:.5rem 0}
		.jt-table th{background:none;font-size:.76rem;letter-spacing:.06em;text-transform:uppercase;color:var(--jt-ink-3);padding-top:.9rem}
		.jt-table td{border-bottom:1px solid var(--jt-line);padding-bottom:.9rem}
	}';

	wp_register_style( 'jt-inline', false );
	wp_enqueue_style( 'jt-inline' );
	wp_add_inline_style( 'jt-inline', $css );
}
add_action( 'wp_enqueue_scripts', 'jt_front_styles' );
