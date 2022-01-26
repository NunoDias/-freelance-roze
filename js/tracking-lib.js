(function(window){

	// In the following line, you should include the prefixes of implementations you want to test.
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	// DON'T use "var indexedDB = ..." if you're not in a function.
	// Moreover, you may need references to some window.IDB* objects:
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

	if (!window.indexedDB) {
		throw new Error("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
	}

	var Tracking = {}, database;

	function initDatabase(name){
		return new Promise(function(resolve, reject) {
			resolve();
		});
	}

	function addItem(item,table){
		return new Promise(function(resolve, reject) {
			var idRecord = Math.ceil(Math.random()*1000);//Random id
			console.info('Added record to '+table+'. Id: '+idRecord);
			console.dir(item);
            if (document.getElementById("logs")) document.getElementById("logs").innerHTML = '<strong>Added record to '+table+'. Id: '+idRecord+'</strong><br><small>'+JSON.stringify(item) +'</small><br><br>' + document.getElementById("logs").innerHTML;
			resolve(idRecord);
		});
	}

	function updateItem(item,table){
		return new Promise(function(resolve, reject) {
            if (document.getElementById("logs")) document.getElementById("logs").innerHTML = '<strong>Updated record of '+table+' with id: '+item.id+'</strong><br><br><'+document.getElementById("logs").innerHTML;
			resolve();
		});
	}

	function getItem(id,table){
		return new Promise(function(resolve, reject) {
			console.info('Get record of '+table+' with id '+id);
            if (document.getElementById("logs")) document.getElementById("logs").innerHTML = '<strong>Get record of '+table+' with id '+id+'</strong><br><br>'+document.getElementById("logs").innerHTML;
			resolve({});
		});
	}

	function getCurrentVisual(){
		return 'Tracking-Test-Lib';
	}

	function getCurrentUser(){
		return 'Test-User';
	}

	function getCurrentTracking(){
		return 1;
	}


	function getTrackingStatus(idVisual){
		return Promise.resolve(true);
	}

	function endEvent(startEventReturnId){
		return getItem(startEventReturnId,'tracking_events').then(function(event){
            if (document.getElementById("logs")) document.getElementById("logs").innerHTML = '<strong>Event '+startEventReturnId+' end at '+ new Date()+'</strong><br><br>' +document.getElementById("logs").innerHTML;
			console.info('Event '+startEventReturnId+' end at '+ new Date());
		});
	}


	function endSession(){
		var trackingId = getCurrentTracking();
		if (trackingId === null){
			//No active visual
			console.warn('No session found');
			return Promise.resolve();
		}else{

			return getItem(trackingId,'tracking').then(function(track){
				var now = new Date();
				track.close = now;
					var event = {
						trackingId : trackingId,
						user : getCurrentUser(),
						contentId : getCurrentVisual(),
						event : 'end_visual',
						description  : 'Close Visual',
						start : now,
						test : track.test
					};

				console.info('Session close at '+new Date());
                if (document.getElementById("logs")) document.getElementById("logs").innerHTML = '<strong>Session close at '+new Date()+'</strong><br><br>'+document.getElementById("logs").innerHTML;

				//Add close session event and update session object
				return Promise.all([addItem(event,'tracking_events'),updateItem(track,'tracking')]);
			});
		}
	}

	function closeVisual(){
		return init().then( function(){
			var trackingId = getCurrentTracking();
			if (trackingId === null){
				//No active visual
				return Promise.resolve();
			}else{
				return getTrackingStatus(getCurrentVisual()).then(function(flag){
					if (flag){
						return Promise.all([endSession()]).then(function(){
							Tracking.closeVisual();
						});
					}else{
						Tracking.closeVisual();
						return Promise.resolve();
					}
				});
			}
		});
	}

	Tracking.initVisual  = function(idVisual,testSession){
		return init().then( function(){
			//Check parameters
			if (typeof idVisual !== "string"){
				return Promise.reject(new Error('Invalid param idVisual. Expected string, received '+typeof idVisual));
			}
			if (idVisual.trim() === ''){
				return Promise.reject(new Error('Empty param idVisual'));
			}
			if (testSession!=null && typeof testSession !== "boolean"){
				return Promise.reject(new Error('Invalid param testSession. Expected boolean, received '+typeof testSession));
			}

			var checkTrackingStatus = function(){
				return getTrackingStatus(idVisual);
			};

			//Close previus visual (if exists) and check if the tracking is enabled
			return checkTrackingStatus().then(function(flag){
				//Storage current visual
				if (flag){

					var track = {
						user : getCurrentUser(),
						open : new Date(),
						contentId : getCurrentVisual(),
						masterbookDescription : localStorage.getItem('currentMasterbookTitle'),
						masterbookId : localStorage.getItem('currentMasterbook'),
						test : testSession?'Y':'N'
					};

					return addItem(track,'tracking').then(function(id){
						//Storage the current session
						return Promise.resolve(id);
					}).then(function(trackingId){
						var event = {
							trackingId : trackingId,
							user : getCurrentUser(),
							contentId : getCurrentVisual(),
							event : 'start_visual',
							description  : 'Open Visual',
							start : new Date(),
							test : testSession?'Y':'N'
						};

						return addItem(event,'tracking_events')
					});
				}else{
					return Promise.resolve();
				}
			});
		});
	};

	Tracking.startEvent = function(eventId, eventDescription, attribute, cron, testEvent){
		return init().then( function(){
			var idVisual = getCurrentVisual();
			if (idVisual == null){
				return Promise.reject(new Error('No visual found. Please invoke method initVisual!'));
			}

			return getTrackingStatus(idVisual).then(function(flag){
				if (flag){

					//Check parameters
					var trackingId = getCurrentTracking();
					if (trackingId == null){
						return Promise.reject(new Error('No session found. Please invoke method initVisual!'));
					}

					if (typeof eventId !== "string"){
						return Promise.reject(new Error('Invalid param eventId. Expected string, received '+typeof eventId));
					}

					if (eventId.trim() === ''){
						return Promise.reject(new Error('Empty param eventId'));
					}

					if (typeof eventDescription !== "string"){
						return Promise.reject(new Error('Invalid param eventDescription. Expected string, received '+typeof eventDescription));
					}

					if (eventDescription.trim() === ''){
						return Promise.reject(new Error('Empty param eventDescription'));
					}

					if (attribute!=null && typeof attribute !== "string"){
						return Promise.reject(new Error('Invalid param attribute. Expected string, received '+typeof attribute));
					}

					if (cron!=null && typeof cron !== "boolean"){
						return Promise.reject(new Error('Invalid param cron. Expected boolean, received '+typeof cron));
					}

					if (testEvent!=null && typeof testEvent !== "boolean"){
						return Promise.reject(new Error('Invalid param testEvent. Expected boolean, received '+typeof testEvent));
					}

					var event = {
						trackingId : trackingId,
						user : getCurrentUser(),
						contentId : idVisual,
						event : eventId,
						cron : cron,
						description  : eventDescription,
						attribute : attribute,
						start : new Date(),
						test : testEvent?'Y':'N'
					};
					if (testEvent){
						return getItem(trackingId,'tracking').then(function(track){
							track.test = 'Y';
							return updateItem(track,'tracking').then(addItem(event,'tracking_events')).then(function(idEvent){
								return Promise.resolve(idEvent);
							});
						});

					}else{
						return addItem(event,'tracking_events').then(function(idEvent){
							return Promise.resolve(idEvent);
						});
					}
				}else{
					//Return dummy id
					return Promise.resolve(-1);
				}
			});
		});
	};

	Tracking.closeVisual = function(){
		localStorage.removeItem('trackingVisual');
		localStorage.removeItem('trackingSession');
		localStorage.removeItem('trackingEndId');
	};

	Tracking.closeSession = function(session){
		var current = localStorage.getItem('trackingSession');
		if (current === session){
			Tracking.closeVisual();
		}
	}

	Tracking.endEvent = function(startEventReturnId){
		return init().then(function(){

			var idVisual = getCurrentVisual();
			if (idVisual == null){
				return Promise.reject(new Error('No visual found. Please invoke method initVisual!'));
			}

			return getTrackingStatus(idVisual).then(function(flag){
				if (flag){
					//Check parameters
					var trackingId = getCurrentTracking();
					if (trackingId == null){
						return Promise.reject(new Error('No session found. Please invoke method initVisual!'));
					}

					if (typeof startEventReturnId !== "number"){
						return Promise.reject(new Error('Invalid param eventId. Expected number, received '+typeof startEventReturnId));
					}

					return endEvent(startEventReturnId);
				}else{
					return Promise.resolve();
				}
			});
		});
	};

	var initPromise;
	var init = function() {
		if (initPromise) return initPromise;
		initPromise = initDatabase('CLMMetadata').then(function(db){
			database = db;
			console.info('Tracking db successfully initialized');
		},function(err){
			console.error(err);
		});
		return initPromise;
	}


	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.Tracking = Tracking;
	}

})( window );
