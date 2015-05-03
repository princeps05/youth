define([
   
   	'jstorage'
  
], function(jStorage)	{        

	var makeKey = function(days, key) {
		return days + "+" + key;
	};
	
	var saveLocalStorage = function(days, key, result) {
		$.jStorage.set( makeKey(days, key), JSON.stringify(result), {TTL: 180000} );
	}
	
	var loadLocalStorage = function(days, key) {
		return JSON.parse( $.jStorage.get( makeKey(days, key) ) );
	}	
	
	var clearLocalStorage = function(days) {
		
		$( $.jStorage.index() ).each(function(index, key) {
			key.match(days) && $.jStorage.deleteKey(key);
		});
	}
	
	return {
		
		save : saveLocalStorage	,
		load : loadLocalStorage	,
		clear : clearLocalStorage
		
	};
});		