spa.chat = (function(){
	var configMap = {
			main_html : String()
				+ '<div style="padding:1em; color:#fff;">'
				+ 'Say hello to chat'
				+ '</div>',
			settable_map: {}
		},
		state_map = { $container: null},
		jqueryMap = {},
		setJqueryMap, configModule, initModule;

		//DOM METHODS
		setJqueryMap = function(){
			var $container = state_map.$container;
			jqueryMap = {$container: $container};
		};
		//Public Methods
		configModule = function(input_map){
			spa.util.setConfigMap({
				input_map: input_map,
				settable_map: configMap.settable_map,
				config_map: configMap
			});
			return true;
		};
		initModule = function($container){
			$container.html(configMap.main_html);
			stateMap.$container = $container;
			setJqueryMap();
			return true;
		};
	return {
		configModule: configModule,
		initModule: initModule
	}
}());