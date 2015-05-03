define([
        
	'q'	,
	'util/localStorage'

],	function(Q, LocalStorage) {
	
	var getThisWeekTeamInfo = function(thisWeekSunday, lastWeekSunday) {

		var deferred = Q.defer();
		
		var storageKey = "teamInfo",
		result = LocalStorage.load(thisWeekSunday, storageKey);
		
		if( result )	{
			console.log('getThisWeekTeamInfo>>>로컬스토리지 로드 완료>>>');
			deferred.resolve( {"result" : result, "thisWeekSunday" : thisWeekSunday, "lastWeekSunday" : lastWeekSunday} );
		}
		else	{
			
			$.getJSON("/youth/getTeamList.json?days=" + thisWeekSunday).then(function(result) {

				result.length !== 0 && LocalStorage.save(thisWeekSunday, storageKey, result);
				deferred.resolve( {"result" : result, "thisWeekSunday" : thisWeekSunday, "lastWeekSunday" : lastWeekSunday} );
			}, function() {
				alert("통신 오류가 발생하였습니다.");
				deferred.reject();
			});
		}
		
		console.log('getThisWeekTeamInfo>>>[success]>>>');
		
		return deferred.promise;
	};
	
	var getThisWeekTeamStatistic = function(days) {
		
		var deferred = Q.defer();
		
		var storageKey = "teamStatistic",
			result = LocalStorage.load(days, storageKey);
		
		if( result )	{
			console.log('getThisWeekTeamStatistic>>>로컬스토리지 로드 완료>>>');
			deferred.resolve(result);
		}
		else	{
			
			$.getJSON("/youth/getTeamStatistic.json?days=" + days).then(function(result) {

				result.length !== 0 && LocalStorage.save(days, storageKey, result);
				deferred.resolve(result);
			}, function() {
				alert("통신 오류가 발생하였습니다.");
				deferred.reject();
			});
		}
		
		console.log('getThisWeekTeamStatistic>>>[success]>>>');
		
		return deferred.promise;
	};
	
	var getThisWeekTeamReport = function teamReport(days) {

		var deferred = Q.defer();
		
		var storageKey = "teamReport",
			result = LocalStorage.load(days, storageKey);
		
		if( result )	{
			console.log('getThisWeekTeamReport>>>로컬스토리지 로드 완료>>>');
			deferred.resolve(result);
		}
		else	{
		
			$.getJSON("/youth/getThisWeekTeamReport.json?days=" + days).then(function(result) {

				result.length !== 0 && LocalStorage.save(days, storageKey, result);
				deferred.resolve(result);
			}, function() {
				alert("통신 오류가 발생하였습니다.");
				deferred.reject();
			});

		}
		
		console.log('getThisWeekTeamReport>>>[success]>>>');
		
		return deferred.promise;
	};
	
	return {
		
		getThisWeekTeamInfo : getThisWeekTeamInfo	,
		getThisWeekTeamStatistic : getThisWeekTeamStatistic	,
		getThisWeekTeamReport : getThisWeekTeamReport
		
	}
});