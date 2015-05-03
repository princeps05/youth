package spring.board.model;


public class Statistic {

	private String days;
	private String team; 
	private String teamCode;
	private String department;
	private Integer this_week_attend;
	private Integer this_week_fresh; 
	private Integer this_week_absence; 
	
	public String getTeamCode() {
		return teamCode;
	}
	public Statistic setTeamCode(String teamCode) {
		this.teamCode = teamCode;
		return this;
	}	public String getDepartment() {
		return department;
	}
	public Statistic setDepartment(String department) {
		this.department = department;
		return this;
	}
	public String getDays() {
		return days;
	}
	public Statistic setDays(String days) {
		this.days = days;
		return this;
	}
	public String getTeam() {
		return team;
	}
	public Statistic setTeam(String team) {
		this.team = team;
		return this;
	}
	public Integer getThis_week_attend() {
		return this_week_attend;
	}
	public Statistic setThis_week_attend(Integer this_week_attend) {
		this.this_week_attend = this_week_attend;
		return this;
	}
	public Integer getThis_week_fresh() {
		return this_week_fresh;
	}
	public Statistic setThis_week_fresh(Integer this_week_fresh) {
		this.this_week_fresh = this_week_fresh;
		return this;
	}
	public Integer getThis_week_absence() {
		return this_week_absence;
	}
	public Statistic setThis_week_absence(Integer this_week_absence) {
		this.this_week_absence = this_week_absence;
		return this;
	}	
}
