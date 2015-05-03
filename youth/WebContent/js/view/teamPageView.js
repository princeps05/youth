define([

	'util/selector'	,
	'handlebars'	,
	'util/attendCheck'	,
   	'modal'	,
	'text!template/t_attendListTable.html'	,
	'text!template/t_prayListTable.html'	,
	'text!template/t_freshInputForm.html'	,
	'text!template/t_button.html'	,
	
],	function($Selector, Handlebars, AttendCheck, Modal, t_attendListTable, t_prayListTable, t_freshInputForm, t_button)	{

	var viewTeamInfo = function(days, department, teamCode, team) {

		console.log("viewTeamInfo");
		
		$Selector.$teamCalendar.val(days);
		$Selector.$pageTeamWrapper.find("#t_department").val(department);
		$Selector.$pageTeamWrapper.find("#t_team").data("teamcode", teamCode);
		$Selector.$pageTeamWrapper.find("#t_team").html(team);
		
		// 팀명, 부서명, 팀코드 저장
		AttendCheck.setTeam(team);
		AttendCheck.setDepartment(department);
		AttendCheck.setTeamCode(teamCode);		
		
		return "viewTeamInfo success";
	};
	
	// 핸들바 템플릿
	var handlebarsTemplate = function(templateTarget, obj, htmlTarget) {
		
		// 템플릿에서 인덱스 + 1
		Handlebars.registerHelper('plusOne', function(number) {
		    return number + 1;
		});	
		
		var template = Handlebars.compile( $(templateTarget).html() ),
			html = template(obj);
		
		$Selector.$pageTeamWrapper.find( htmlTarget ).html(html).end();
	};
	
	var viewTeamAttendList = function(result) {

		console.log("viewTeamAttendList");
		
		// 팀명단 저장
		AttendCheck.setNameArr(result);
		
		if( !result ) return "success";	
		
		// 팀원출결 테이블 그리기
		handlebarsTemplate(t_attendListTable, {"result" : result}, teamAttend);
		
		var teamAttendCount = 0,
			teamAbsenceCount = 0,
			$this;

		$Selector.$pageTeamWrapper.find("#teamMemberList tr").each(function() {
				
			$this = $(this);
	
			if( $this.data("fresh") )	{
				$this.addClass("yellow");
				teamAttendCount++;
			}
			else if( $this.data("attend") )	{
				teamAttendCount++;
			}
			else	{
				$this.addClass("red");
				teamAbsenceCount++;
			}
			
		});
		
		$Selector.$pageTeamWrapper.find("#teamAttendCount").text(teamAttendCount).end()
								  .find("#teamAbsenceCount").text(teamAbsenceCount);

		return "viewTeamAttendList success";
	};
	
	var viewTeamPrayList = function(result) {

		console.log("viewTeamPrayList");
		
		// 미입력 상태에서 동적 태그 생성 목적
		!result.length && (result.push({},{},{},{},{}));

		// 팀기도제목 테이블 그리기
		handlebarsTemplate(t_prayListTable, {"result" : result}, teamPray);
		
		return "viewTeamPrayList success";
	};
	
	var viewFreshInputForm = function() {
		
		console.log("viewFreshInputForm");
		
		// 새자족입력 폼 그리기
		handlebarsTemplate(t_freshInputForm, {}, teamFresh);

		return "viewFreshInputForm success";
	};
	
	var viewButton = function()	{

		console.log("viewButton");
		
		// 버튼 그리기
		handlebarsTemplate(t_button, {}, teamButton);
		
		return "viewButton success";
	};
	
	var calculateMemberAttendCount = function($obj) {
		
		// 새가족은 상태변경 불가
		if( $obj.data("fresh") )	{
			return false;
		}

		console.log("calculateMemberAttendCount");
		
		var attendCount = 0, 
			absenceCount = 0,
			
			$teamAttendCount = $Selector.$pageTeamWrapper.find("#teamAttendCount"),
			$teamAbsenceCount = $Selector.$pageTeamWrapper.find("#teamAbsenceCount");
		
		if( $obj.data("attend") )		{
			
			$obj.addClass("red").data("attend", false).find(".attend").text("결석");
			
			attendCount = ~~($teamAttendCount.text());
			$teamAttendCount.text(--attendCount);
			absenceCount = ~~($teamAbsenceCount.text());
			$teamAbsenceCount.text(++absenceCount);	
		}
		else	{
			
			$obj.removeClass("red").data("attend", true).find(".attend").text("출석");
			
			attendCount = ~~($teamAttendCount.text());
			$teamAttendCount.text(++attendCount);
			absenceCount = ~~($teamAbsenceCount.text());
			$teamAbsenceCount.text(--absenceCount);	
		}
	};
	
	return {
		
		viewTeamInfo : viewTeamInfo	,
		viewTeamAttendList : viewTeamAttendList	,
		viewTeamPrayList : viewTeamPrayList	,
		viewFreshInputForm : viewFreshInputForm	,
		viewButton : viewButton	,
		calculateMemberAttendCount : calculateMemberAttendCount
	}
	
});	