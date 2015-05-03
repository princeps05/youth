define(function() {
	   
	var _days,
		_teamCode,
		_title,
	 	_department;
	
	var Pray = function(days, teamCode, title, department) {
		
        _days = days;
        _teamCode = teamCode;
        _title = title;
        _department = department;
        
        return { "days" : _days , "teamCode" : _teamCode , "title" : _title, "department" : _department};
    }

    return Pray;
});