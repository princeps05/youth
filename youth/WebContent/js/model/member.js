define(function() {
   
	var _days,
		_teamCode,
		_team,
	 	_fresh,
	 	_name,
	 	_attend,
	 	_department;
	
	var Member = function(days, teamCode, team, fresh, name, attend, department) {
		
        _days = days;
        _teamCode = teamCode;
        _team = team;
        _fresh = fresh;
        _name = name;
        _attend = attend;
        _department = department;
        
		return { "days" : _days , "teamCode" : _teamCode , "team" : _team, "fresh" : _fresh, "name" : _name , "attend" : _attend, "department" : _department };
    }

    return Member;
});