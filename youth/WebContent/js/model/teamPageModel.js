define([
        
	'q'	,
	'model/member'	,
	'model/pray'	,
	'util/selector'	,
	'util/localStorage'	,
	'util/common'	,
	'util/attendCheck'	,
	'xss'
        
],	function(Q,  Member, Pray, $Selector, LocalStorage, Common, AttendCheck, Xss) {
	
	var getTeamAttendList = function(days, department, teamCode) {
		
		console.log('getTeamAttendList');
		
		var deferred = Q.defer();
		
		var url = "/youth/getTeamAttendList.json?teamCode=" + teamCode + "&days=" + days + "&department=" + department;

		$.getJSON(url).then(function(result) {
			
			console.log('getTeamAttendList>>>[success]>>>');
			deferred.resolve(result);
			
		}, function() {
			alert("통신 오류가 발생하였습니다.");
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var getTeamPrayList = function(days, department, teamCode) {
		
		console.log("getTeamPrayList");
		
		var deferred = Q.defer();
		
		var url = "/youth/getTeamPrayList.json?teamCode=" + teamCode + "&days=" + days + "&department=" + department;

		$.getJSON(url).then(function(result) {

			console.log('getTeamPrayList>>>[success]>>>');
			deferred.resolve(result);
			
		}, function() {
			alert("통신 오류가 발생하였습니다.");
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var setTeamAttendList = function(days, department, teamCode, team) {

		LocalStorage.clear(days);		
		console.log('setTeamAttendList>>>로컬스토리지 삭제 완료>>>');
		
		var deferred = Q.defer();

		var memberList = [],
			$name = null,
			$attend = true,
			$fresh = false,
			$this;
		
		var $memberList = $Selector.$pageTeamWrapper.find("#teamMemberList > tr");
		
		// 콘솔 임의 수정 방지
		if( !AttendCheck.checkName($memberList.find(".name")) )	{			
			deferred.reject();
			return deferred.promise;
		}
		else if( !AttendCheck.checkTeam(team) )	{			
			deferred.reject();
			return deferred.promise;
		}		
		else if( !AttendCheck.checkDepartment(department) )	{			
			deferred.reject();
			return deferred.promise;
		}
		else if( !AttendCheck.checkTeamCode(teamCode) )	{			
			deferred.reject();
			return deferred.promise;
		}
		
		$memberList.each(function() {

			$this = $(this);
			
			$name = $this.find(".name").text();
			$attend = $this.data("attend")? true : false;
			$fresh = $this.data("fresh")? true : false;
			
			memberList.push( new Member( filterXSS(days), filterXSS(teamCode), filterXSS(team), $fresh, filterXSS($name), $attend, filterXSS(department) ) );
		});

		$.ajax({
			  type: "POST",
			  url: "/youth/setThisWeekTeamAttend.json",
			  data: JSON.stringify(memberList),
			  contentType: "application/json",
			  dataType: "json"
			})
			.done(function(result) {
				deferred.resolve('setTeamAttendList>>>[success]>>>');
			})
			.fail(function() {
				alert("실패!");
				deferred.reject();
			});

		return deferred.promise;
	};
	
	var setTeamFreshList = function(days, department, teamCode, team) {
		
		var deferred = Q.defer();
		
		var memberList = [],
			$name = null,
			$attend = true,
			$fresh = true;
		
		$Selector.$pageTeamWrapper.find("#teamFreshList td .fresh").each(function() {

			$name = $(this).val().trim();
			$name && function() {
				memberList.push( new Member( filterXSS(days), filterXSS(teamCode), filterXSS(team), $fresh, filterXSS($name), $attend, filterXSS(department) ) );
			}();
		});

		if( memberList.length !== 0 )	{
			
			$.ajax({
				  type: "POST",
				  url: "/youth/setThisWeekTeamFresh.json",
				  data: JSON.stringify(memberList),
				  contentType: "application/json",
				  dataType: "json"
				})
				.done(function(result) {					
					deferred.resolve('setTeamFreshList>>>[success]>>>');
				})
				.fail(function() {
					alert("실패!");
					deferred.reject();
				});
		}
		else	{
			deferred.resolve('setTeamFreshList no one>>>[success]>>>');
		}
		
		return deferred.promise;
	};
	
	var setTeamPrayList = function(days, department, teamCode) {

		var deferred = Q.defer();
		
		var prayList = [];
		
		$Selector.$pageTeamWrapper.find("#teamPrayList .pray").each(function() {
			prayList.push( new Pray( filterXSS(days), filterXSS(teamCode), filterXSS( $(this).val().trim() ), filterXSS(department) ) );
		});

		$.ajax({
			  type: "POST",
			  url: "/youth/setThisWeekTeamPray.json",
			  data: JSON.stringify(prayList),
			  contentType: "application/json",
			  dataType: "json"
			})
			.done(function(result) {
				deferred.resolve('setTeamPrayList>>>[success]>>>');
			})
			.fail(function() {
				alert("실패!");
				deferred.reject();
			});
		
		return deferred.promise;
	};
	
	var deleteAttendAndPray = function(days, department, teamCode) {
		
		var deferred = Q.defer();
		
		var url = "/youth/deleteTeamReport.json?days=" + days + "&teamCode=" + teamCode;
		
		$.getJSON(url).then(function() {
			
			LocalStorage.clear(days);		
			console.log('deleteAttendAndPray>>>로컬스토리지 삭제 완료>>>');
			deferred.resolve('deleteAttendAndPray>>>로컬스토리지 삭제 완료>>>');
		}, function() {
			alert("통신 오류가 발생하였습니다.");
			deferred.reject();
		});

		return deferred.promise;
	};
	
	return {
		
		getTeamAttendList : getTeamAttendList	,
		getTeamPrayList : getTeamPrayList	,
		setTeamAttendList : setTeamAttendList	,
		setTeamFreshList : setTeamFreshList	,
		setTeamPrayList : setTeamPrayList	,
		deleteAttendAndPray : deleteAttendAndPray		
	}
});