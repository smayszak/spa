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
			+'  </div>',
			chat_extend_time : 1000,
			chat_retract_time : 300,
			chat_extend_height : 450,
			chat_retract_height : 15,
			chat_extended_title: 'Click to retract',
			chat_retraced_title: 'Click to extend'
		},
		stateMap = { 
			$container: null,			
			is_chat_retracted: true
		},
		jqueryMap = {},
		setJqueryMap, toggleChat, initModule;
	//-- Begin Utility methods

	//-- Begin DOM Methods
		toggleChat = function (do_extend, callback) {
			var px_chat_height = jqueryMap.$chat.height(),
			is_open = px_chat_height === config_map.chat_extend_height,
			is_closed = px_chat_height === config_map.chat_retract_height,
			is_sliding = ! is_open && !is_closed;

			if(is_sliding){return false;}
			var h = config_map.chat_retract_height;
			var t = config_map.chat_retract_time;
			var m = config_map.chat_retraced_title;
			if(do_extend){
				h = config_map.chat_extend_height;
				t = config_map.chat_extend_time;
				m = config_map.chat_extended_title;
			}
			jqueryMap.$chat.animate(
				{height: h},
				t,
				function (){
					jqueryMap.$chat.attr('title', m);
					if (callback){callback(jqueryMap.$chat);}
				}	
			);
			stateMap.is_chat_retracted = !do_extend;
			return true;
		}
		setJqueryMap = function(){
			var $container = stateMap.$container;
			jqueryMap = {
				$container: $container,
				$chat : $container.find('.spa-shell-chat')
			};
		};
	//-- Begin event handlers
		onClickChat = function(event){
			if(toggleChat(stateMap.is_chat_retracted)){
				$.uriAnchor.setAnchor({chat: ( stateMap.is_chat_retracted ? 'closed' : 'open' )}
				);
			}
			return false;
		};
	//-- Begin pubilc methods
		initModule = function($container){
			stateMap.$container = $container;
			$container.html(config_map.main_html);
			setJqueryMap();
			stateMap.is_chat_retracted = true;
			jqueryMap.$chat
				.attr('title', config_map.chat_retraced_title)
				.click(onClickChat);
		};

		return {initModule : initModule};
}());