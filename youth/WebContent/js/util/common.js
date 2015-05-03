define([
   
 	'util/selector'     
 	
], function($Selector)	{        
	
	var togglePage = function() {
		
		$Selector.$wrapper.toggleClass("active");
		$Selector.$menuBtn.toggleClass("active");
		$Selector.$sidebarWrapper.toggleClass("active");
	};
	
	var showTeamPage = function() {
		
		togglePage();
		$Selector.$pageMainWrapper.removeClass("active");
		$Selector.$pageTeamWrapper.addClass("active");
		$Selector.$pageMyWrapper.removeClass("active");
	};

	var showMainPage = function() {
		
		togglePage();
		$Selector.$pageMainWrapper.addClass("active");
		$Selector.$pageTeamWrapper.removeClass("active");
		$Selector.$pageMyWrapper.removeClass("active");
	};
	
	var showMyPage = function() {
		
		togglePage();
		$Selector.$pageMainWrapper.removeClass("active");
		$Selector.$pageTeamWrapper.removeClass("active");
		$Selector.$pageMyWrapper.addClass("active");
	};

	
	return {

		showTeamPage : showTeamPage	,
		showMainPage : showMainPage	,
		showMyPage : showMyPage	,
		togglePage : togglePage
	};
});		