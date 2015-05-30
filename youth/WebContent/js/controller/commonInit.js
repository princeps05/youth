define([
        
    "fastclick",
	"q"	,        
   	"pickerdate"	,
   	"util/selector"	,
   	"util/common"	,
   	"service/mainPageService"	,
	"handlebars"
	
], function(Fastclick, Q, Pickerdate, $Selector, Common, MainPageService, Handlebars)	{   
	
	// 칼렌더 공통 세팅
	var initCalendar = function() {
		
		Fastclick.attach(document.body);
		
		$.extend($.fn.pickadate.defaults, {
		    monthsFull: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
		    monthsShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
		    weekdaysFull: [ "주일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ],
		    weekdaysShort: [ "주일", "월", "화", "수", "목", "금", "토" ],
			format: "yyyy-mm-dd",
			formatSubmit: "yyyy-mm-dd",
			editable: false,
			min: [2015,3,26],
			max: true,
			disable: [2,3,4,5,6,7],
			clear: "",
			today: "",
			close: "닫기"
		});
		
		return "initCalendar 성공";
	};
	
	//	사이드바 열기
	var initSidebarOpen = function() {
		
		var isSidebarTemplated = false;
		
		$Selector.$menuBtn.on("click", function() {
			
			// 사이드바 템플릿 차후 수정
			if( !isSidebarTemplated )	{
				
    			require([ "text!template/sidebar.html" ], function( sidebarTmpl )	{
    				$Selector.$wrapper.find("#sidebar-wrapper").html( Handlebars.compile( $(sidebarTmpl).html() ) );
    				isSidebarTemplated = true;
    			});
			}

			Common.togglePage();
			
			return false;
		});
		
		return "initSidebarOpen 성공";
	};

	//	사이드바에서 메뉴 선택
	var initSidebarSelect = function() {
		
		var isMypageTemplated = false;
		var isTeamPageInited = false;
		
		$Selector.$wrapper.on("click", "#wrapper.active, #sidebar-wrapper.active li, #page-main-wrapper.active, #page-team-wrapper.active, #page-my-wrapper.active", function() {
			
			var $this = $(this);
			if( $this.hasClass("sidebar-team") )	{
				
    			require([ "controller/teamPageInit", "service/teamPageService" ], function( TeamPageInit, TeamPageService )	{
    				
    				if( !isTeamPageInited )	{
    					TeamPageInit.init();
    					isTeamPageInited = true;
    				}
    				
    				TeamPageService.loadTeamPage( $Selector.$teamCalendar.data("value"), $this.data("department"), $this.data("teamcode"), $this.data("team") );
    				Common.showTeamPage();
    			});

			}
			else if ( $this.hasClass("sidebar-brand") ) {
				location.reload();
//				Common.showMainPage();
//				MainPageService.loadMainPage();
			}
			else if ( $this.hasClass("sidebar-my") ) {

				// 마이페이지 템플릿 차후 수정
				if( !isMypageTemplated )	{
					
	    			require([ "text!template/mypage.html" ], function( mypageTmpl )	{
						$Selector.$pageMyWrapper.html( Handlebars.compile( $(mypageTmpl).html() ) );
						isMypageTemplated = true;
	    			});
				}
				
				Common.showMyPage();
			}
			
			return false;
		});
		
		return "initSidebarSelect 성공";
	};
	
	var initEvent = function() {
		
		var deferred = Q.defer();
		
		Q.all( [Q.fcall(initCalendar), Q.fcall(initSidebarOpen), Q.fcall(initSidebarSelect)] ).spread(function(initCalendar, initSidebarOpen, initSidebarSelect) {
			
			console.log(initCalendar);
			console.log(initSidebarOpen);
			console.log(initSidebarSelect);

			deferred.resolve("commonInit init 성공");
		});
		
		return deferred.promise;
	};
	
	return {
		
		init : initEvent
		
	}
});		