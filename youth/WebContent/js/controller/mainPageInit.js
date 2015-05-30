define([

   	'service/mainPageService'	,
   	'util/selector'	,
   	'pickerdate'	,  	
   	'moment'
   	
], function(MainPageService, $Selector, Pickerdate, Moment)	{   

	var init = function() {
		
		$Selector.$mainCalendar.data("value", Moment().day("Sunday").format("YYYY-MM-DD"));
		
		$Selector.$mainCalendar.pickadate({
			
			onSet: function(context){
				
				var selectedDate = Moment(context.select).format("YYYY-MM-DD"),
					sevenDaysAgo = Moment(context.select).day(-7).format("YYYY-MM-DD");
					
					MainPageService.loadMainPage(selectedDate, sevenDaysAgo);
			}
		});
		
		return "mainPageInit init 성공";
	};		
	
	return {
		
		init : init
	}
});		