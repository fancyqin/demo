
/**
 * make object observable
 * @author lvx
 */
var observe = function(){
	var keyIsObs = '__IS_OBSERVABLE__';
	var keyIsOnce = '__IS_ONCE_EVENT__';
	
	var slice = [].slice;
	
	var defineProperty;
	
	try{
		var obj = {};
		var test = 't';
		
		Object.defineProperty(obj, test, {
			value: 1,
			writable: false,
			enumerable: false,
			configurable: false
		});
		
		defineProperty = function(obj, key, value){
			Object.defineProperty(obj, key, {
				value: value,
				writable: false,
				enumerable: false,
				configurable: false
			});
		}
	}catch(ex){
		defineProperty = function(obj, key, value){
			obj[key] = value;
		};
	}

	var eachName = function(names, callback){
		names.replace(/([^\s\,]+)/g, callback);
	};

	/**
	 * impl
	 * @param [obj] {Object = {}} observed object
	 */
	var _observe = function(obj){
		obj = obj || {};
		
		if(obj[keyIsObs]){
			return obj;
		}
		
		defineProperty(obj, keyIsObs, true);
		
		var events = {};
		
		var getEvent = function(name){
			return (events[name] = (events[name] || []));
		};
		
		var clearEvents = function(evts){
			eachName(evts, function(name){
				delete events[name]
			});
		};
		
		var clearAllEvents = function(){
			events = {};
		};
		
		var bindEvent = function(evts, fn, once){
			if(typeof fn === 'function'){
				defineProperty(fn, keyIsOnce, !!once);

				eachName(evts, function(name){
					getEvent(name).push(fn);
				});
				
			}
		};
		
		var execEvents = function(handles, params){
			for (var i = 0; i < handles.length; i++) {
				var handle = handles[i];
				handle.apply(this, params);
				
				if(handle[keyIsOnce]){
					handles.splice(i--, 1);
				}
			}
		};
		
		/**
		 * observe on some events
		 * @param evts {String} events list. eg "save close open"
		 * @param fn {Function} event handler
		 */
		defineProperty(obj, 'on', function(evts, fn){
			bindEvent(evts, fn);
			return this;
		});
		
		/**
		 * observe on some events that once only excuted
		 * @param evts {String} events list. eg "save close open"
		 * @param fn {Function} event handler
		 */
		defineProperty(obj, 'one', function(evts, fn){
			bindEvent(evts, fn, true);
			return this;
		});
		
		/**
		 * unobserve on some events
		 * @param [evts] {String} events list. eg "save close open"
		 * @param [fn] {Function} event handler
		 * @example
		 * 	obj.off(); // unobserve all events
		 *  obj.off('save'); // unobserve some type events
		 *  obj.off('save', fn); // unbind a handle with some type events
		 */
		defineProperty(obj, 'off', function(evts, fn){
			if(typeof evts === 'string'){
				if(typeof fn === 'function'){
					eachName(evts, function(name){
						var handles = getEvent(name);
						
						for(var i = 0; i < handles.length; i++){
							if(handles[i] === fn){
								handles.splice(i--, 1);
							}
						}
					});
				}else{
					clearEvents(evts);
				}
			}else{
				clearAllEvents();
			}
			
			return this;
		});
		
		/**
		 * observe on some events
		 * @param evts {String} events list. eg "save close open"
		 * @param fn {Function} event handler
		 */
		defineProperty(obj, 'fire', function(evts){
			var _this = this;
			var params = slice.call(arguments, 1);
			
			if(typeof evts === 'string'){
				eachName(evts, function(name){
					var handles = getEvent(name);
					execEvents.call(_this, handles, params);
				});
			}else{
				for (var evt in events) {
					if (events.hasOwnProperty(evt)) {
						var handles = events[evt];
						execEvents.call(_this, handles, params);
					}
				}
			}
			
			return this;
		});

		return obj;
	};
	
	return _observe;
}.call(this);
