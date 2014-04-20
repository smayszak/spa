spa.shell = (function(){
	//-- Begin module scop variables
	var
		config_map = {
			main_html : String()
			+'  <div id="spa">'
    		+'	<div class="spa-shell-head">'
			+'	  <div class="spa-shell-head-logo"></div>'
			+'      <div class="spa-shell-head-acct"></div>'
			+'     <div class="spa-shell-head-search"></div>'
			+'    </div>'
			+'    <div class="spa-shell-main spa-x-closed">'
			+'      <div class="spa-shell-main-nav"></div>'
			+'      <div class="spa-shell-main-content"></div>'
			+'    </div>'
			+'    <div class="spa-shell-foot"></div>'
			+'    <div class="spa-shell-chat"></div>'
			+'     <div class="spa-shell-modal"></div>'
			+'  </div>'
		},
		stateMap = { $container: null},
		jqueryMap = {},
		setJqueryMap,
		initModule;
	//-- Begin Utility methods

	//-- Begin DOM Methods
		setJqueryMap = function(){
			var $container = stateMap.$container;
			jqueryMap = {$container: $container};
		};
	//-- Begin event handlers

	//-- Begin pubilc methods
		initModule = function($container){
			stateMap.$container = $container;
			$container.html(config_map.main_html);
			setJqueryMap();
		};

		return {initModule : initModule};
}());