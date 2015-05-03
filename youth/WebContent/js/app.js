define([
        
	'q'	,
	'controller/commonInit'	,
	'controller/mainPageInit'	,
   	'service/mainPageService'	,
   	'moment'
	
], function(Q, CommonInit, MainPageInit, MainPageService, Moment)	{  
		
	var start = function() {

		Q.fcall(CommonInit.init).then(function(common) {			
			console.log(common);
			return MainPageInit.init();
		}).then(function(mainPage) {
			console.log(mainPage);
			MainPageService.loadMainPage(Moment().day("Sunday").format("YYYY-MM-DD"), Moment().day("Sunday").day(-7).format("YYYY-MM-DD"));
		});

	};
	
	return {
		
		start : start

	}
});		