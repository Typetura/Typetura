<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://typetura.com
 * @since      1.0.0
 *
 * @package    Typetura
 * @subpackage Typetura/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Typetura
 * @subpackage Typetura/public
 * @author     Salvador Hernandez <sal@typetura.com>
 */
class Typetura_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->typetura_options = get_option($this->plugin_name);

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Typetura_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Typetura_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/typetura-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Typetura_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Typetura_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/typetura-public.js', array( 'jquery' ), $this->version, false );

	}

	// Load Typetura Package
	public function typetura_cdn_package(){
	 	$typetura_package = $this->typetura_options['typetura_package'];
		$typetura_api_key = $this->typetura_options['typetura_api_key'];

		if(!empty($typetura_package) && !empty($typetura_api_key)){
			$js_link = "https://cdn-staging.typetura.com/typetura.js?apiKey=$typetura_api_key";
			$css_link = "https://cdn-staging.typetura.com/$typetura_package/typetura-hs.css?apiKey=$typetura_api_key";

			// $try_url = @fopen($js_link,'r');

			// if( $try_url !== false ) {
				?>
						<script src=<?php echo $js_link ?>></script>
						<link rel="stylesheet" type="text/css" href=<?php echo $css_link ?>></link>
				<?php
			}
		// }
	}
}
