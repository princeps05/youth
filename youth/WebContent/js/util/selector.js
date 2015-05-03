define([
   
 	'jquery'   
        
], function($)	{        

	var $wrapper = $("#wrapper");
	var $sidebarWrapper = $wrapper.find("#sidebar-wrapper");
	var $pageMainWrapper = $wrapper.find("#page-main-wrapper");
	var $pageTeamWrapper = $wrapper.find("#page-team-wrapper");
	var $pageMyWrapper = $wrapper.find("#page-my-wrapper");
	var $audioWrapper = $wrapper.find("#audio-wrapper");	
	var $menuBtn = $wrapper.find("#menuBtn");			
	var $mainCalendar = $wrapper.find("#mainCalendar");
	var $teamCalendar = $wrapper.find("#teamCalendar");
	var $teamCalendar_hidden = $wrapper.find("#teamCalendar_hidden");	

	return {		
		
		$wrapper : $wrapper	,
		$sidebarWrapper : $sidebarWrapper	,
		$pageMainWrapper : $pageMainWrapper	,
		$pageTeamWrapper : $pageTeamWrapper	,
		$pageMyWrapper : $pageMyWrapper	,
		$audioWrapper : $audioWrapper	,
		$menuBtn : $menuBtn	,
		$mainCalendar : $mainCalendar	,
		$teamCalendar : $teamCalendar	,
		$teamCalendar_hidden : $teamCalendar_hidden			
	};
});		