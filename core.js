//******* FRAME *********//
var frameBusted = (top != self);
if (frameBusted) top.location.href = '/';
//******* FRAME END *********//
var _timer = (new Date()).getTime();

/*
	Ideas:
		* you can hightlight the static or dynamic object at UI, besided create console where you can see available objects, it'll be just awesome

	Plugin's vars = states
		sm (state modify) 			=> name, value
		ss (state show) 			=> name
		sr (state remove)			=> name

	Objects (jQuery) -> dynamic will be erased after loading the next page, static won't
		sso (set static object) 	=> name, element
		sdo (set dynamic object) 	=> name, element

	App's vars
		vm (var modify) 			=> name, value
		vs (var show) 				=> name
		vr (var remove)				=> name

	App's functions
		fset (function set)			=> name, value

*/

var $o2 = {

	'updateTimeout' : function () {},
	'updatePageInterval' : 1000,
	'fast' : 400,
	'slow' : 500,

	// static object (from main template)
	'staticObjects' : {},

	// dynamic object
	'dynamicObjects' : {},

	// (from main template)
	'eventsOfStaticObjects' : {},

	// 
	'eventsOfDynamicObjects' : {},

	// :new
	

	// vars (States)
	'states' : {
		
		'module' 			: '',
		'authorized'			: false,

		'title' 			: '$o2 Loading',
		'busy' 				: false,
		'connectError' 		: false,

		// $().focus
		'autoFocus' 		: false,
		'autoFocusElement'	: '',
		'autoFocusObject' 	: '', //... is it static or dynamic

		'updatePage'		: false,

	}, // end S states

	// object's vars
	'vars' : {},

	// object's functions
	'functions' : {},

	// object's static functions (from main template)
	'staticFunctions' : {},

	// dynamic objects initiation, to store all the functions in future and only re-init binding to dynamic objects
	'uiInit' : function () {},
	'eventsInit' : function () {},


	'uiBind' : function (functionBody) 
	{
		$o2.uiInit = functionBody;
	},

	'eBind' : function (functionBody) 
	{
		$o2.eventsInit = functionBody;
	},

	'setAutoFocus' : function (element)
	{
		$o2.sm('autoFocus', true);

		$o2.sm('autoFocusObject', $(element));
		$o2.sm('autoFocusElement', element);
	},

	'releaseAutoFocus' : function (element)
	{
		$o2.sm('autoFocus', false);
		$o2.sr('autoFocusElement', element);
		$o2.sr('autoFocusObject', $(element));
	},

	'elementName' : function (element)
	{
		return element.replace(/[\.\#]/, '');
	},

	// <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <--
	// ------------------------------------------------------------------------------------------------------------
	//
	// { Handling of page's status 
	//
	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------
	'pageBusy' : function () {

		$o2.sm('busy', true);
		$o2.ui.sloading();

	}, // end F pageFree

	'pageFree' : function () {

		$o2.ui.hloading();
		$o2.sm('busy', false);

	}, // end F pageBusy

	'free' : function () {

		if($o2.ss('busy') == true) {

			$o2.note('The page is still busy');

			return false;

		} // end $o2.ss('busy') == true


		return true;

	}, // end F free

	'connectError' : function (module, message) {

		$o2.sm('connectError', true);
		$o2.note(module+': '+message);

	}, // end connectError
	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------
	//
	// Handling of page's status  }
	//
	// ------------------------------------------------------------------------------------------------------------
	// -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -->




	// <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <--
	// ------------------------------------------------------------------------------------------------------------
	//
	// { Handling of functions 
	//
	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------
	'set' : function (functionName, value) 
	{ // this one is exactly for static objects

		if(typeof($o2.staticFunctions[functionName]) == 'undefined') 
		{
			$o2.staticFunctions[functionName] = value;
			return true;
		}else{
			$o2.note('! static function '+functionName+' is already set');
			return false;
		}

	},

	'sget' : function (functionName, value) 
	{
		if(typeof($o2.staticFunctions[functionName]) == 'undefined') 
		{
			return function () {};
		}
		return $o2.staticFunctions[functionName];
	},

	// just run a function
	'srun' : function (functionName)
	{
		// $o2.noteF('run', functionName, 'result');
		// $o2.call('updateTaskList');
		// $o2.note('? is call really needed');
		// $o2.functions[functionName]();
		$o2.sget(functionName)();
	},

	// call a functions with arguments
	'scall' : function (functionName, args)
	{
		// $o2.noteF('call', functionName, 'result');
		// $o2.call('updateTaskList', {'value1' : 1232});
		// $o2.note('? is call really needed');
		// return $o2.functions[functionName](args);
		$o2.sget(functionName)(args);
	},






	'fset' : function (functionName, value) 
	{

		// $o2.fset('updateTaskList', function (args) { args.Wow })

		if(typeof($o2.functions[functionName]) == 'undefined') 
		{
			$o2.functions[functionName] = value;
			return true;
		}else{
			$o2.note('! dynamic function '+functionName+' is already set');
			return false;
		}

	},

	'fget' : function (functionName)
	{
		if(typeof($o2.functions[functionName]) == 'undefined') 
		{
			return function () {};
		}
		return $o2.functions[functionName];
	},

	// just run a function
	'run' : function (functionName)
	{
		// $o2.noteF('run', functionName, 'result');
		// $o2.call('updateTaskList');
		// $o2.note('? is call really needed');
		// $o2.functions[functionName]();
		$o2.fget(functionName)();
	},

	// call a functions with arguments
	'call' : function (functionName, args)
	{
		// $o2.noteF('call', functionName, 'result');
		// $o2.call('updateTaskList', {'value1' : 1232});
		// $o2.note('? is call really needed');
		// return $o2.functions[functionName](args);
		$o2.fget(functionName)(args);
	},

	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------
	//
	// Handling of functions }
	//
	// ------------------------------------------------------------------------------------------------------------
	// -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -->


	// <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <--
	// ------------------------------------------------------------------------------------------------------------
	//
	// { Handling of states 
	//
	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------
	'sr' : function (stateName) { // short from state remove

		$o2.states[stateName] = '';

	}, // end F state remove

	'sm' : function (stateName, value) { // short from state modify

		$o2.states[stateName] = $o2.parseVar(value);

	}, // end F state modify 

	'sis' : function (varName)
	{
		var answer = true;
		if(typeof($o2.states[varName]) == 'undefined' || $o2.states[varName] == '')
		{
			answer = false;
		}

		return answer;
	},

	'ss' : function (stateName) { // short from state show

		return $o2.states[stateName];

	}, // end F show state
	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------
	//
	// Handling of states }
	//
	// ------------------------------------------------------------------------------------------------------------
	// -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -->



	// <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <--
	// ------------------------------------------------------------------------------------------------------------
	//
	// { Handling of vars 
	//
	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------
	'parseVar' : function (value)
	{
		if(typeof(value) != 'string')
		{
			return value;
		}

		if(value == 'true')
		{
			value = true;
		}else
		if(value == 'false')
		{
			value = false;
		}else
		if(value.match(/[0-9]/) && !value.match(/[^0-9]/))
		{
			value = parseInt(value);
		}else
		if(value.match(/[0-9\.]/) && !value.match(/[^0-9\.]/))
		{
			value = parseFloat(value);
		}

		return value;
	},

	'vr' : function (varName) 
	{ 
		// short from var remove
		$o2.vars[varName] = '';

	}, // end F var modify

	'getPrefix' : function (data) 
	{
		if(data.match('_'))
		{
			return data.split('_')[0];
		}else{
			return '';
		}
	},

	'vm' : function (varName, value) 
	{
		var prefix = $o2.getPrefix(varName);
		if(prefix == 'input')
		{
			return $o2.o(varName).val(value);
		}else
		if(prefix == 'label')
		{
			$o2.o(varName).html(value);
		}else{
		// short from var modify
			$o2.vars[varName] = $o2.parseVar(value);
		}

	}, // end F var modify

	'vmv' : function (varName, varNameValue) 
	{
		// short from var modify with var
		$o2.vars[varName] = $o2.vs(varNameValue);

	}, // end F var modify

	'vis' : function (varName)
	{
		var answer = true;
		if(typeof($o2.vars[varName]) == 'undefined' || $o2.vars[varName] == '')
		{
			answer = false;
		}

		return answer;
	},

	'vs' : function (varName) 
	{
		var prefix = varName.split('_');
		if(prefix[0] == 'input')
		{
			return $o2.val(varName);
		}

		// short from var show
		return $o2.vars[varName];

	}, // end F var show

	'eqOr' : function (expression, values)
	{
		var response = false;
		for(var value in values)
		{
			if(values[value] == expression)
			{
				response = true;
				break;
			}
		}

		return response;
	},

	'vinc' : function (varName)
	{
		var newVarValue = $o2.vs(varName)+1;
		$o2.vm(varName, newVarValue);
		return newVarValue;
	},

	'vdec' : function (varName)
	{
		var newVarValue = $o2.vs(varName)-1;
		$o2.vm(varName, newVarValue);
		return newVarValue;
	},

	'vplus' : function (varName, plusValue)
	{
		var newVarValue = $o2.vs(varName)+plusValue;
		$o2.vm(varName, newVarValue);
		return newVarValue;
	},

	'vminus' : function (varName, minusValue)
	{
		var newVarValue = $o2.vs(varName)-minusValue;
		$o2.vm(varName, newVarValue);
		return newVarValue;
	},

	'vmdump' : function (vmList)
	{
		$o2.note('-----------------------');
		$o2.note('VM:');
		for(value in vmList)
		{
			$o2.note('['+vmList[value]+'] = '+$o2.vs(vmList[value]));
		}
	},
	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------
	//
	// Handling of vars }
	//
	// ------------------------------------------------------------------------------------------------------------
	// -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -->


	// <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <- <--
	// ------------------------------------------------------------------------------------------------------------
	//
	// { basic events
	//
	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------
	'cancelFunc' : function () {},
	'onPageLoaded' : function () {},
	'onScroll' : function () {},
	'onPageClosed' : function () {},
	'delegatedAction' : function () {},
	'delegatedActionNext' : function () {},
	'updatePageFunction' : function () {},
	// ____________________________________________________________________________________________________________
	// Clean before loading the next page
	'update' : function () {

		$o2.onPageClosed();

		$o2.cancelFunc = function () {};
		$o2.onPageLoaded = function () {};
		$o2.onScroll = function () {};
		$o2.onPageClosed = function () {};
	
		$o2.uiInit = function () {};
		$o2.eventsInit = function () {};
		clearTimeout($o2.updateTimeout);
		$o2.updatePageFunction = function () {};

		$o2.dynamicObjects = {};
		$o2.vars = {};
		$o2.functions = {};

		$o2.releaseAutoFocus();
		$o2.sr('module');

	}, // end F update


	'updatePage' : function (functionBody)
	{
		$o2.sm('updatePage', true);
		$o2.updatePageFunction = functionBody;
	},

	'updatePageExecution' : function ()
	{
		$o2.updatePageFunction();

		if($o2.ss('updatePage') == true)
		{
			$o2.updateTimeout = setTimeout(function () {
				$o2.updatePageExecution();
			}, $o2.updatePageInterval);
		}
	},

	'updatePageStop' : function ()
	{
		$o2.sm('updatePage', false);
		clearTimeout($o2.updateTimeout);
	},

	'updatePageResume' : function ()
	{
		$o2.sm('updatePage', true);
		$o2.updatePageExecution();
	},

	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------
	//
	// basic events }
	//
	// ------------------------------------------------------------------------------------------------------------
	// -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -->

	'noteF' : function (functionName, message, missedData)
	{
		$o2.note(functionName+ ' [' +message+ ']: \'' +missedData+ '\'');
	},

	'note' : function (message) {

		if(window.console && window.console.log) {
		
			/*message = message.toString();

			if(message.charAt(0) == '?')
			{
				console.warn(message);
			}else
			if(message.charAt(0) == '!')
			{
				console.error(message);
			}else{
				console.log(message);
			}*/
			console.log(message);

		}else{ // end window.console && window.console.log

			alert('Console does not work: '+message);

		} // end else to window.console && window.console.log

	}, // end F note


	// low-level functions for objects
	'listGetIndex' : function (type, name)
	{
		var index = $o2.usedElements[type].indexOf(name);
		if(index == -1)
		{
			$o2.noteF('listGetIndex', 'no index', name);
		}
		return index;
	},

	'getObjects' : function (type)
	{
		if(type == 'static')
		{
			return $o2.staticObjects;
		}else{
			return $o2.dynamicObjects;
		}
	},

	// no need ?
	'getObject' : function (type, name)
	{
		$o2.note('no need yet');
		return $o2.getObjects(type)[name];
	},

	'deleteObject' : function (type, name, element)
	{
/*		var index = $o2.usedElements[type].indexOf(name);
		if(index)

		$o2.usedElements[type].splice(, 1)*/

		$o2.getObjects(type)[name] = null;		
	},

	'setObject' : function (type, name, element)
	{
		var elementObject = $(element);

		if(elementObject.length == 0)
		{
			$o2.noteF('setObject '+type, 'no object', element);
		}else{
			$o2.getObjects(type)[name] = $(element);
		}
	},


	// top-level functions
	'dso' : function (name, element) 
	{ // delete static object
		$o2.deleteObject('static', name, element);
	},

	'ddo' : function (name, element) 
	{ // delete dynamic object
		$o2.deleteObject('dynamic', name, element);
	},

	//...COM
	'sso' : function (name, element) { // set static object

		$o2.setObject('static', name, element);

	}, // end F sso (set static object)

	'sdo' : function (name, element) { // set dynamic object

		$o2.setObject('dynamic', name, element);

	}, // end F sdo (set dynamic object)
	//...COM

	'sval' : function (name) 
	{
		return $o2.gso(name).val();
	},

	'val' : function (name) 
	{
		return $o2.gdo(name).val();
	},

	// short for gso
	'o' : function (name)
	{
		return $o2.gdo(name);
	},

	'so' : function (name, element)
	{
		$o2.sdo(name, element);
	},

	// 'isSetStatic' : function (element)
	// {
	// 	var result = $o2.listGetIndex('static', element);
	// 	if(result == -1)
	// 	{
	// 		return false;
	// 	}
	// 	return true;
	// },

	'isSet' : function (element)
	{
		if(typeof($o2.o(element)) == 'undefined')
		{
			return false;
		}
		return true;
	},

	//...COM
	'gso' : function (name) { // get static object

		return $o2.staticObjects[name];

	}, // end F gso (get static object)

	'gdo' : function (name) { // get dynamic object

		return $o2.dynamicObjects[name];

	}, // end F gdo (get dynamic object)
	//...COM


	'init' : function (id) {

		$o2.sso('pageRoot', id);

	}, // end F init

	'pageLoaded' : function () 
	{
		$o2.gso('pageRoot').animate({'opacity' : 0.5}, 400).animate({'opacity' : 1}, 400);
	},

	'setDelegatedAction' : function (functionBody)
	{
		$o2.sm('delegatedAction', true);

		$o2.delegatedAction = $o2.delegatedActionNext;
		$o2.delegatedActionNext = functionBody;
	},

	'runDelegatedAction' : function ()
	{
		// $o2.delegatedActionNext = function () {};
		if($o2.ss('delegatedAction') == true)
		{
			$o2.note($o2.delegatedAction);
			$o2.delegatedAction();
		}else{
			$o2.resetDelegatedAction();
		}
	},

	'resetDelegatedAction' : function ()
	{
		$o2.delegatedActionNext = function () {};
	},

/*	'runDelegatedAction' : function ()
	{
		$o2.delegatedAction();
		$o2.delegatedAction = function () {};
	},*/


	'ui' : {},
	'ext' : {}, // to include own code as a part of $o2

	'url' : {},

	// Bind-log and binding of functions
	'son' : function (eventName, objectName, functionName) 
	{

		$o2.eventsOfStaticObjects[objectName] = {'event' : eventName, 'function' : functionName};

		if(eventName == 'click' && !objectName.match('btn'))
		{
			$(objectName).on(eventName, $o2.staticFunctions[functionName]).addClass('pointer');
		}else{
			$(objectName).on(eventName, $o2.staticFunctions[functionName]);
		}
	},

	// Bind-log
	'don' : function (eventName, objectName, functionName) 
	{
		$o2.eventsOfDynamicObjects[objectName] = {'event' : eventName, 'function' : functionName};

		if(eventName == 'click' && !objectName.match('btn'))
		{
			$(objectName).on(eventName, $o2.functions[functionName]).addClass('pointer');
		}else{
			$(objectName).on(eventName, $o2.functions[functionName]);
		}

	},

	// static button, where id == function's name
	'sbtn' : function (objectName)
	{
		$o2.son('click', objectName, $o2.elementName(objectName));
	},

	// dynamic button, where id == function's name
	'dbtn' : function (objectName)
	{
		$o2.don('click', objectName, $o2.elementName(objectName));
	},

	'escPressed' : function (functionBody)
	{
		$o2.cancelFunc = functionBody;
	},

	'pageClosed' : function (functionBody)
	{
		$o2.onPageClosed = functionBody;
	},

	'ready' : function (functionBody) 
	{
		$o2.onPageLoaded = functionBody;	
	},

	'standard' : function () 
	{
		if($o2.ss('module') == '')
		{
			$o2.note('! module is not set');
		}
	},


/*	'val' : function (objectName)
	{
		// In-task
		// Tx-task
		var mask = if(objectName.substring(0,3));
		if(mask == '#In') 
		{
			return $(objectName).val();
		}else
		if(mask == '#Tx')
		{
			return $(objectName).val();
		}
	},*/

	// Always 'get'
	'show' : function (postUrl, alldata, handleData)
	{
		//: 'myurl.php', 'post/get', dataArray (for `Post`)
		
		//note 25.01.16, for XSS - protection add to data new <input hidden> (not set yet)
		
		/*
			Using:
			
				var conUrl = '/load.php?app=mails';
				$o2.show(conUrl, alldata, function (data) {
		
					addcon(data);
		
				});
		*/
		
		$.ajax({
			type: 'get',
			data: alldata,

			url: postUrl,
			cache: false,
			error: function () {
			
				$o2.note('! Server is overflow, please, stand by');
				//return false;
				
			},
			success: function (html) {
				
				//callback to mother-function
				handleData(html);
		
			}
			
		});
	},

	// Always 'post'
	'send' : function (postUrl, alldata, handleData)
	{
		/*
			Using:
				
				var url = '/majax.php?app=kith_listdrop';

				var datasend = {
					'id' : currID
					//'textval' : 'asdsjdfk&as6 d^&SD^ %SA%D^+='
				};
			
				newajaxcon(url, 'post', datasend, function (data) {
		
					addcon(data);
		
				});
		*/
		
		$.ajax({
			type: 'post',
			data: alldata,
						
			url: postUrl,
			cache: false,
			error: function () {
			
				$o2.note('! Server is overflow, please, stand by');
				//return false;
				
			},
			success: function (html) {

				//alert('p1');
			
				//return html;
				if($o2.jsonValid(html) == true) {
				
					var data = $.parseJSON(html);
					
				}else{
				
					var data = {'status':'fail'};
					
				}
				
				
				//callback to mother-function
				handleData(data);
		
			}
			
		});
	},

	'jsonValid' : function (data) 
	{

		if(window.JSON) {

			try { 
				window.JSON.parse(data); 
				return true; 
			}
			
			catch (e) {
				$o2.note('! Data error'); 
				$o2.jsError(data); 
				$o2.note('? ' + data);
				
				return false; 
			}
			
		}else{
			return false;
		}
		
	},

	'jsError' : function (data) 
	{
		$('#jserror').html('Some error at: '+data).fadeIn();
	}

}; // end $o2

// \\ // \\ // \\ // \\

// 07.03.18 Rewrite all of this about urls, ok ?
// test commit

$o2.url = {
	'ajaxLinks' : function () {
		$o2.url.linksParser('#dcontent a');
	},

	'linksParser' : function (area) {
		$(area).on('click', function (event) {

			// event.preventDefault();

			var ahref = $(this).attr('href');
				
			if($o2.url.linksRouting(ahref)) {
				event.preventDefault();
			}

		});
	},

	'getUrlVars' : function () 
	{
		// It's needed to parse arguments from an opened page
	 //    var vars = {};
		// var varIs = false;
	    // split = ';'  just change ';' on need symbol, like ; . Then : /[?&]+([^=&]+)=([^&]*)/gi
	    //Actual width '?': var parts = window.location.href.replace(/[?;]+([^=;]+)=([^;]*)/gi, function(m,key,value) {
		//										   here

		//12.09.16: updated and now it works with usual URLs
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { //With '|'

	    	if(value.match(','))
	    	{
	    		// processing as a query with sub-queries
	    		var subValues = value.split(',');

	    		// var newVarValue = '';
	    		var saveAsArray = false;
	    		for(var index in subValues)
	    		{
	    			if(subValues[index].match(':'))
	    			{
	    				var subValueItem = subValues[index].split(':');
	    				$o2.vm('url_'+key+'_'+subValueItem[0], subValueItem[1]);
	    			}else{
	    				saveAsArray = true;
	    				break;
	    			}
	    		}

	    		if(saveAsArray == true)
	    		{
	    			$o2.vm('url_'+key, subValues);
	    		}
	    	}else{
	    		$o2.vm('url_'+key, value);
	    	}
	  //       vars[key] = value;
			// varIs = true;
	    });
		
		// if(varIs == true) {
		// 	return vars;
		// }else{
		// 	return false;
		// }
	},

	'getUrlQuery' : function ()
	{
		return location.search.replace('?app=', '');
	},

	'changeVar' : function (varName, value) 
	{
	// upd 04.11.16

		var newarg = $o2.url.getUrlQuery();
		var argument = 'url_'+varName;
		var argumentValue = $o2.vs(argument);

		if(newarg == '') 
		{

			newarg = 'main&'+varName+'='+value;

		}else
		if($o2.vis(argument) == true)
		{
			// changing var
			newarg = newarg.replace(varName+'='+argumentValue, varName+'='+value);
		}else{
			// creating var
			newarg += '&'+varName+'='+value;
		}

		$o2.vm(argument, value);
		$o2.url.pushStateModule(newarg);
		
	},

	'changeVarValue' : function (varName, varNameValue)
	{
		$o2.url.changeVar(varName, $o2.vs('url_'+varNameValue));
	},

	'deleteVar' : function (varName) {

		var newarg = location.search.replace('?app=', '');
		var argument = 'url_'+varName;
		var argumentValue = $o2.vs(argument);

		if($o2.vis(argument) == true) 
		{

			newarg = newarg.replace('&'+varName+'='+argumentValue, '');
			$o2.url.pushStateModule(newarg);
			$o2.vr(argument);

		}
	},
	
	'coverPushState' : function (ahref) {
		window.history.pushState('/', '/', ahref);
	},

	'pushStateModule' : function (ahref) {
		$o2.url.coverPushState('/index.php?app='+ahref);
	},

	'linksRouting' : function (ahref) {

		// window.history.pushState('/', '/', ahref);
		if(ahref.substring(0,3) == 'http' || ahref.substring(0,4) == 'https') {
			// return false; //allow default action
		}

		if(ahref.substring(0, 1) != '/')
		{
			return false;
			// $o2.note('false');
		}

		// $o2.note('true');

/*		if(ahref.substring(0,5) == '/post') {
			return true; //prevent default action
		}
*/
		$o2.url.coverPushState(ahref);
		$o2.ui.page(ahref);

		return true;
	},


/*
$o2.on('click', '#element', function () {
	
})
*/
};

$o2.ui = {

	'blurAutofocus' : function (range)
	{
		if($o2.ss('autoFocus') == true)
		{
			$(range).each(function(i, block) {
				// $o2.note(i+' '+block); // %int 0+ object
				var currentElementId = '#'+$(block).attr('id');
				// $o2.note(targetFocus);

				if(currentElementId != $o2.ss('autoFocusElement'))
				{
					// $o2.note(currentElementId);
					$(currentElementId).focus(function () {
						$o2.sm('autoFocus', false);
					}).blur(function () {
						$o2.sm('autoFocus', true);
					});
				}
			});
		}
	},

	// for static texareas, inputs; runs only once
	'blurAutoFocusStatic' : function ()
	{
		$o2.ui.blurAutofocus('textarea, #dcontent input');
	},

	// for dynamic textareas, inputs; runs for each ajax-page-load
	'blurAutoFocusDynamic' : function ()
	{
		$o2.ui.blurAutofocus('#dcontent textarea, #dcontent input');
	},

	'compactOutput' : function (elementFocus, elementOutput)
	{

		$(elementFocus).on('focus', function () {
			$(elementOutput).show();
		}).blur(function () {
			setTimeout(function () {
				$(elementOutput).hide();
			}, 500);
		});
	},

	'blockSwitchSlide' : function (stateName, element1, element2)
	{
		if($o2.ss(stateName) == true)
		{
			$(element2).hide();
			$(element1).slideDown($o2.fast);
		}else{
			$(element1).hide();
			$(element2).slideDown($o2.fast);
		}
	},

	'blockSwitch' : function (elementOff, elementOn)
	{
		$(elementOff).hide();
		$(elementOn).show();
	},

	'updateTitle' : function () {
		document.title = $o2.ss('title');
	},

	'reloadPage' : function ()
	{
		var url = location.pathname+location.search;
		$o2.ui.page(url);
	},

	'page' : function (module) {

		if($o2.free() == true) {

			var timer = (new Date()).getTime();

			$o2.update();
			$o2.pageBusy();

			var link = module.replace('index.php', 'load.php');

			if(link == '/') {

				link = "/load.php?app=main";

			}

			$.ajax({

				url: link,
				cache: false,
				error: function () {
				
					$o2.connectError(module, 'destination is unreachable');
					$o2.pageFree();
					
				},
				success: function (html) {

					$o2.note('Load: ['+((((new Date()).getTime())-timer)/1000)+'] sec');
					$o2.ui.setPage(html);

				}
				
			});

		} // end $o2.free() == true

	}, // end F page

	'contextEvents' : function ()
	{
		if($o2.ss('autoFocus') == true) 
		{
			$o2.ss('autoFocusObject').focus();
		}
	},

	'setPage' : function (html) {
		$o2.sm('authorized', false);
		$o2.sm('delegatedAction', false);
		$o2.sm('updatePage', false);

		var dcontent = $o2.gso('pageRoot');

		dcontent.css({'opacity' : '0.4'});
		// dcontent.css({'top' : '-10px'});

		dcontent.html(html);

		// is called when set $o2.uiInit();
		$o2.uiInit(); // bind all the objects

		$o2.onPageLoaded(); // load all the functions

		$o2.eventsInit(); // bind functions to the objects

		$o2.url.getUrlVars();

		$o2.url.ajaxLinks();
		$o2.ui.updateTitle();

		$o2.standard(); // self-checking

		dcontent.animate({'opacity' : 1}, $o2.fast);
		$o2.ui.contextEvents();

		$o2.runDelegatedAction();

		$o2.pageFree();

		if($o2.ss('updatePage') == true)
		{
			$o2.updatePageExecution();
		}
	}, // end F setPage

	'sloading' : function () {

		var divLoading = $('#loading');

		if(divLoading.css('display') == 'none') {

			divLoading.fadeIn(400);

		} // end $o2.sshow('busy') == true && divLoading.css('display') == 'none'

	}, // end F sloading

	'hloading' : function () {

		var divLoading = $('#loading');

		if(divLoading.css('display') == 'block') {

			divLoading.fadeOut(400); 

		} // end $o2.sshow('busy') == true && divLoading.css('display') == 'block'

	}, // end F hloading

	'scrollTo' : function (element)
	{
		if($(element).length > 0)
		{
			$(window).scrollTop($(element).position().top+10);
		}
	}
};

$o2.pageBusy();

addEventListener('popstate', function(e) {
	
	// var url = location.href.replace(location.origin, ''); //I guess it's equals
	var url = location.pathname+location.search;
	$o2.ui.page(url);

}, false);

$o2.set('searchTask', function () {
	var conUrl = '/majax.php?app=main_search';
	var datasend = 
	{
		'query'	: $('#postsearch').val()
	};

	$o2.send(conUrl, datasend, function (data) {

		$o2.note(data);
		// $('#preresult').html(data).show();
		if(data.status == 'success')
		{
			$('#preresult').html(data.answer).show();
		}
		
	});
});


$o2.sm('registrationClosed', true);
$o2.set('btnRegistrationBox', function () {
	if($o2.ss('registrationClosed') == true) {

		$o2.sm('registrationClosed', false);
	}else{
		$o2.sm('registrationClosed', true);
	}

	$o2.ui.blockSwitchSlide('registrationClosed', '#login', '#register');
});

$o2.set('btnAuthorization', function () {
	var data = {
		'login' : $('#pLogin').val(),
		'password' : $('#pPass').val()
	};

	$o2.send('/services.php?app=login', data, function (data) {
		$o2.note(data);
		if(data.status == 'success')
		{
			$('#usernickname').html(data.answer);

/*			var elShow = $('#isauth');
			var elHide = $('#noauth');
			var elBuffer = elShow;

			if($o2.ss('authorized') == true) {

				elShow = elHide;
				elHide = elBuffer;
			}

			elHide.slideUp(400);
			elShow.slideDown(400);*/

			$o2.sm('authorized', true);
			$o2.ui.blockSwitchSlide('authorized', '#isauth', '#noauth');

			$o2.ui.reloadPage();
		}
	});
});

$o2.set('btnRegistration', function () {
	var data = {
		'login' 	: $('#pLogin').val(),
		'password' 	: $('#pPass').val(),
		'nickname'	: $('#pNick').val()
	};

	$o2.send('/services.php?app=register', data, function (data) {
		$o2.note(data);
		if(data.status == 'success')
		{
			$o2.srun('btnAuthorization');
		}else{
			$o2.note(data.answer);
		}
	});
});

$o2.set('btnExit', function () {
	$o2.send('/services.php?app=exit', {}, function (data) {
		if(data.status == 'success')
		{
			$o2.sm('authorized', false);
			$o2.ui.blockSwitchSlide('authorized', '#isauth', '#noauth');
			$('#pLogin, #pPass').val('');

			$o2.ui.reloadPage();
		}
	});
});


$(document).ready(function () {

	// hljs.configure({'useBR': true});
	$o2.init('#dcontent');

	$o2.pageLoaded();
	$o2.standard(); // self-checking
	$o2.url.linksParser('a');
	$o2.url.getUrlVars();
	$o2.pageFree();

	$o2.uiInit(); // bind all the objects
	$o2.onPageLoaded(); // load all the functions
	$o2.eventsInit(); // bind functions to the objects

	$o2.ui.contextEvents();

	$o2.son('click', '#logo', 'checkSomething');
	$o2.son('keyup', '#postsearch', 'searchTask');
	
	$o2.sbtn('.btnRegistrationBox');

	$o2.sbtn('#btnAuthorization');
	$o2.sbtn('#btnRegistration');
	$o2.sbtn('#btnExit');

	$o2.ui.compactOutput('#postsearch', '#preresult');

	$o2.ui.blurAutoFocusStatic();
});

$(document).keydown(function (e) {
	if(e.keyCode == 27) {
		$o2.cancelFunc();
	}

	if($o2.ss('autoFocus') == true)
	{
		$o2.sm('autoFocus', false);
		$o2.ss('setAutoFocus', '#In-task');
	}
	// $o2.ui.contextEvents();
});
