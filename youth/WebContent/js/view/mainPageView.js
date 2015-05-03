define([

	'util/common'	,
	'util/selector'	,
	'handlebars'	,
	'text!template/m_statisticTable.html'	,
	'text!template/m_reportTable.html'

],	function(Common, $Selector, Handlebars, m_statisticTable, m_reportTable)	{

	var viewThisWeekTeamInfo = function(result) {

		console.log("viewThisWeekTeamInfo");
		
		var template = Handlebars.compile( $(m_statisticTable).html() );
		$Selector.$pageMainWrapper.find("#thisWeekStatistic").html( template(result) );

		return "success";
	};
		
	var viewThisWeekTeamStatistic = function(week, result) {

		console.log("viewThisWeekTeamStatistic");
		
		var $tr;
		
		$(result).each(function(idx, $teamObj) {

			$Selector.$pageMainWrapper.find("#teamStatistic tr").each(function() {

				$tr = $(this);
				if( $tr.data("teamcode") === $teamObj.teamCode )	{

					if( $tr.find(".this_week").hasClass(week))	{
						$tr.find(".this_week_attend").text($teamObj.this_week_attend);
						$tr.find(".this_week_fresh").text($teamObj.this_week_fresh);
					}
					else	{
						$tr.find(".last_week_attend").text($teamObj.this_week_attend);
						$tr.find(".last_week_fresh").text($teamObj.this_week_fresh);
					}
				}
				
			});
		});	
		
		return "success";
	};
	
	var calculateThisWeekDepartmentStatistic = function() {

		var $this,
			this_week_attend_count = 0,
			this_week_fresh_count = 0,
			last_week_attend_count = 0,
			last_week_fresh_count = 0;

		$Selector.$pageMainWrapper.find("#teamStatistic").find("td").each(function() {

			$this = $(this);
			
			this_week_attend_count += ~~($this.find(".this_week_attend").text());
			this_week_fresh_count += ~~($this.find(".this_week_fresh").text());
			
			last_week_attend_count += ~~($this.find(".last_week_attend").text());
			last_week_fresh_count += ~~($this.find(".last_week_fresh").text());	
		});
				
		var $departmentStatistic = $Selector.$pageMainWrapper.find("#departmentStatistic");
			$departmentStatistic.find("#this_week_attend_sum").text(this_week_attend_count).end()
								.find("#this_week_fresh_sum").text(this_week_fresh_count).end()
								.find("#last_week_attend_sum").text(last_week_attend_count).end()
								.find("#last_week_fresh_sum").text(last_week_fresh_count).end();
			
			$Selector.$pageMainWrapper.find("#h_this_week_attend").text(this_week_attend_count).end()
										.find("#h_this_week_fresh").text(this_week_fresh_count).end()
										.find("#h_last_week_attend").text(last_week_attend_count).end()
										.find("#h_last_week_fresh").text(last_week_fresh_count).end();

		return "success";
	};
	
	var viewThisWeekTeamReport = function(result) {
		
		console.log("viewThisWeekTeamReport");
		
		var template = Handlebars.compile( $(m_reportTable).html() ),
			html = template({"result" : result});

		$Selector.$pageMainWrapper.find("#thisWeekTeamReport").html(html).find(".freshList, .absenceList").each(function() {
			!$(this).text().trim() && $(this).closest("tr").hide(); 
		});
		
		return "success";
	};
	
	return {
		
		viewThisWeekTeamInfo : viewThisWeekTeamInfo	,
		viewThisWeekTeamStatistic : viewThisWeekTeamStatistic	,
		calculateThisWeekDepartmentStatistic : calculateThisWeekDepartmentStatistic	,
		viewThisWeekTeamReport : viewThisWeekTeamReport
	}
	
});	