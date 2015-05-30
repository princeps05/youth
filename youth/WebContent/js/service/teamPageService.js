define([
   	
   	'model/teamPageModel'	,
   	'view/teamPageView'	,
   	'util/common'	,
   	'util/selector'	,
   	'q'
   	
], function(TeamPageModel, TeamPageView, Common, $Selector, Q)	{

	var _days,
		_department,
		_teamCode,
		_team;
	
	var getTeamInfo = function() {
		
		_days = $Selector.$teamCalendar.val(),
		_department = $Selector.$pageTeamWrapper.find("#t_department").val(),
		_teamCode = $Selector.$pageTeamWrapper.find("#t_team").data("teamcode"),
		_team = $Selector.$pageTeamWrapper.find("#t_team").html();
	};	
	
	var processTeamAttendList = function()	{
		
		var deferred = Q.defer();
		
		TeamPageModel.getTeamAttendList(_days, _department, _teamCode)
		.then(function(obj1) {	return TeamPageView.viewTeamAttendList(obj1);	})
		.then(function(result){	deferred.resolve(result);	});
		
		return deferred.promise;
	}
	
	var processTeamPrayList = function()	{
		
		var deferred = Q.defer();
		
		TeamPageModel.getTeamPrayList(_days, _department, _teamCode)
		.then(function(obj2) {	return TeamPageView.viewTeamPrayList(obj2);	})
		.then(function(result){	deferred.resolve(result);	});
		
		return deferred.promise;
	}
	
	var loadTeamPage = function(days, department, teamCode, team) {

		if( arguments.length !== 0 ) {
			
			_days = days;
			_department = department;
			_teamCode = teamCode;
			_team = team;
		}
		else	{
			getTeamInfo();
		}

		Q.all( [ processTeamAttendList(), processTeamPrayList(), Q.fcall(TeamPageView.viewTeamInfo,_days, _department, _teamCode, _team), Q.fcall(TeamPageView.viewFreshInputForm), Q.fcall(TeamPageView.viewButton)] )
		 .spread(function(a,b,c,d,e){	console.log(a,b,c,d,e); });
	};
	
	var reloadTeamPage = function()	{
		
		getTeamInfo();
		
		Q.all( [processTeamAttendList(), processTeamPrayList(), Q.fcall(TeamPageView.viewFreshInputForm)] )
		 .spread(function(a,b,c){	window.scrollTo(0,0); console.log(a,b,c);	});
	};
	
	var saveTeamPage = function() {

		Q.all( [ TeamPageModel.setTeamAttendList(_days, _department, _teamCode, _team), TeamPageModel.setTeamPrayList(_days, _department, _teamCode) ] )
		.spread(function(a, b) {	return TeamPageModel.setTeamFreshList(_days, _department, _teamCode, _team);	})
		.then(function(c) { reloadTeamPage(); });
	};
	
	var deleteTeamPage = function() {
		TeamPageModel.deleteAttendAndPray( _days, _department, _teamCode).then(function() {	reloadTeamPage();	});
	};	

	var calculateMemberAttendCount = function($obj) {
		TeamPageView.calculateMemberAttendCount($obj);
	};
	
	return {
		
		loadTeamPage : loadTeamPage	,
		reloadTeamPage : reloadTeamPage	,
		saveTeamPage : saveTeamPage	,
		deleteTeamPage : deleteTeamPage	,
		calculateMemberAttendCount : calculateMemberAttendCount
	}
});	