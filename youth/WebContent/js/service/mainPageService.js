define([
   
   	'util/common'	,
   	'util/selector'	,   	
   	'model/mainPageModel'	,
   	'view/mainPageView'	,
   	'q'	,
   	'moment'
   	
], function(Common, $Selector, MainPageModel, MainPageView, Q, Moment)	{

	var _days1,
		_days2;
	
	var getMainInfo = function() {
		_days1 = $Selector.$mainCalendar.val();
		_days2 = Moment(_days1).day(-7).format("YYYY-MM-DD");
	};
	
	var loadMainPage = function(days1, days2) {
		
		if( arguments.length !== 0 ) {
			_days1 = days1;
			_days2 = days2;
		}
		else	{
			getMainInfo();
		}
		
		MainPageModel.getThisWeekTeamReport(_days1).then(function(obj) {
			MainPageView.viewThisWeekTeamReport(obj);
		});		

		MainPageModel.getThisWeekTeamInfo(_days1, _days2)
		.then(function(obj) {	
			return Q.fcall(MainPageView.viewThisWeekTeamInfo, obj);	
		})
		.then(function(result) {	return Q.all( [MainPageModel.getThisWeekTeamStatistic(_days1), MainPageModel.getThisWeekTeamStatistic(_days2)] );	})
		.spread(function(obj1, obj2) {	return Q.all ( [ Q.fcall(MainPageView.viewThisWeekTeamStatistic, "this_week", obj1), Q.fcall(MainPageView.viewThisWeekTeamStatistic, "last_week", obj2)] );	})
		.then(MainPageView.calculateThisWeekDepartmentStatistic);
	
	};
	
	return {
		
		loadMainPage : loadMainPage
		
	}
});	