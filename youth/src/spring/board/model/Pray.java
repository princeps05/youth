package spring.board.model;


public class Pray {

	private String department;
	private String team;
	private String teamCode;
	private String days;
	private String title;
	private Integer no;
	

	public Pray() {
	}	
	public Pray(String team) {
		this.team = team;
	}
	public Integer getNo() {
		return no;
	}
	public Pray setNo(Integer no) {
		this.no = no;
		return this;
	}
	public String getTeamCode() {
		return teamCode;
	}
	public Pray setTeamCode(String teamCode) {
		this.teamCode = teamCode;
		return this;
	}
	public String getDepartment() {
		return department;
	}
	public Pray setDepartment(String department) {
		this.department = department;
		return this;
	}
	public String getTeam() {
		return team;
	}
	public Pray setTeam(String team) {
		this.team = team;
		return this;
	}
	public String getDays() {
		return days;
	}
	public Pray setDays(String days) {
		this.days = days;
		return this;
	}
	public String getTitle() {
		return title;
	}
	public Pray setTitle(String title) {
		this.title = title;
		return this;
	}
	
	
}
