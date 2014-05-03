spa.shell = (function(){
	//-- Begin module scop variables
	var
		config_map = {
			anchor_schema_map: {
				chat : {open: true, closed: true}
			},
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
			anchor_map: {},		
			is_chat_retracted: true
		},
		jqueryMap = {},
		copyAnchorMap, setJqueryMap, toggleChat, 
		changeAnchorPart, onHashChange,
		onClickChat, initModule;
	//-- Begin Utility methods
	copyAnchorMap = function(){
		return $.extend(true, {}, stateMap.anchor_map);
	};
	//-- Begin DOM Methods
	changeAnchorPart = function(arg_map){
		var
			anchor_map_revise = copyAnchorMap(),
			bool_return = true,
			key_name, key_name_dep;
		KEYVAL:
		for(key_name in arg_map){
			if(arg_map.hasOwnProperty(key_name)){
				if(key_name.indexOf('_') === 0) {continue KEYVAL;}
				anchor_map_revise[key_name] = arg_map[key_name];
				key_name_dep = '_' + key_name;
				if(arg_map[key_name_dep]){
					anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
				} else{
					delete anchor_map_revise[key_name_dep];
					delete anchor_map_revise['_s' + key_name_dep];
				}
			}
		}

		try{
			$.uriAnchor.setAnchor(anchor_map_revise);
		}
		catch (error){
			$.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
			bool_return = false;	
		}
		return bool_return;
	};
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
	};
	setJqueryMap = function(){
		var $container = stateMap.$container;
		jqueryMap = {
			$container: $container,
			$chat : $container.find('.spa-shell-chat')
		};
	};
	//-- Begin event handlers
	onHashChange = function(event){
		var
			anchor_map_previous = copyAnchorMap(),
			anchor_map_proposed,
			_s_chat_previous, _s_chat_proposed,
			s_chat_proposed;
		try{anchor_map_proposed = $.uriAnchor.makeAnchorMap();}
		catch (error){
			$.uriAnchor.setAnchor(anchor_map_previous, null, true);
			return false;
		}
		stateMap.anchor_map = anchor_map_proposed;
		_s_chat_previous = anchor_map_previous._s_chat;
		_s_chat_proposed = anchor_map_proposed._s_chat;

		if( ! anchor_map_previous
			|| _s_chat_previous != _s_chat_proposed
		){
			s_chat_proposed = anchor_map_proposed.chat;
			switch(s_chat_proposed){
				case 'open':
					toggleChat(true);
					break;
				case 'closed':
					toggleChat(false);
					break;
				default:
					toggleChat(false);
					delete anchor_map_proposed.chat;
					$.uriAnchor.setAnchor(anchor_map_proposed, null, true);	
			}
		} 
		return false;
	};
	onClickChat = function(event){
		changeAnchorPart({
			chat: (stateMap.is_chat_retracted ? 'open' : 'closed' )
		});
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
		$.uriAnchor.configModule({
			schema_map: config_map.anchor_schema_map
		});
		$(window)
			.bind('hashchange', onHashChange)
			.trigger('hashchange');
	};

	return {initModule : initModule};
}());