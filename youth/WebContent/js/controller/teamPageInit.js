define([
   
   	'util/selector'	,
   	'service/teamPageService'	,
   	'pickerdate'	,
   	'moment'
   	
], function($Selector, TeamPageService, Pickerdate, Moment)	{   

	var initEvent = function() {

		$Selector.$pageTeamWrapper
		// 팀원 명단에서 팀원 출결 입력
		.on("click", "#teamMemberList > tr", function() {
			TeamPageService.calculateMemberAttendCount($(this));
			return false;
		})		
		// 저장/취소/삭제 실행
		.on("click", "button.part", function() {

			if( $(this).data("part") === "save" )	{
				TeamPageService.saveTeamPage();
			}
			else if( $(this).data("part") === "cancel" )	{
				TeamPageService.reloadTeamPage();
			}
			else	{
				TeamPageService.deleteTeamPage();
			}
			
			$Selector.$pageTeamWrapper.find("#partModal").modal();
			
			return false;
		});
		
		$Selector.$teamCalendar.data("value", Moment().day("Sunday").format("YYYY-MM-DD"));
		
		$Selector.$teamCalendar.pickadate({			
			
			onSet: function(context){
				
				var selectedDate = Moment(context.select).format("YYYY-MM-DD");
			
					TeamPageService.loadTeamPage();
			}	
		});
		
		return "teamPage init 성공";
	};
	
	return {
		
		init : initEvent
		
	}
});		