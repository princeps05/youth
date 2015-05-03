define([
   
 	'lodash'
 	
], function(_)	{        
	
	var nameArr = [];
	var team = "";
	var department = "";
	var teamCode = "";
	
	var setNameArr = function(obj)	{		
		nameArr = _.pluck(obj, "name");		
	};

	var checkName = function($nameTag)	{
		
		var cNameArr = [];
		
		$nameTag.each(function(){
			cNameArr.push($(this).text());
		});

		if( _.difference(nameArr, cNameArr).length === 0 )	{
			return true;
		}
		else	{
			alert("데이터가 임의 수정되었습니다. 저장할 수 없습니다.");
			return false;
		}
	}
	
	var setTeam = function(str)	{
		team = str;
	}
	
	var checkTeam = function(str)	{
		
		if( team === str )	{
			return true;
		}
		else	{
			alert("데이터가 임의 수정되었습니다. 저장할 수 없습니다.");
			return false;
		}
	}

	var setDepartment = function(str)	{
		department = str;
	}
	
	var checkDepartment = function(str)	{
		
		if( department === str )	{
			return true;
		}
		else	{
			alert("데이터가 임의 수정되었습니다. 저장할 수 없습니다.");
			return false;
		}
	}

	var setTeamCode = function(str)	{
		teamCode = str;
	}
	
	var checkTeamCode = function(str)	{
		
		if( teamCode === str )	{
			return true;
		}
		else	{
			teamCode("데이터가 임의 수정되었습니다. 저장할 수 없습니다.");
			return false;
		}
	}	
	
	return {
		
		setNameArr : setNameArr	,
		checkName : checkName	,
		setTeam : setTeam	,
		checkTeam : checkTeam	,
		setDepartment : setDepartment	,
		checkDepartment : checkDepartment	,
		setTeamCode : setTeamCode,
		checkTeamCode : checkTeamCode

	};
});		