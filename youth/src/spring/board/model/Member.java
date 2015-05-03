package spring.board.model;


public class Member {

	private String department;
	private String team;
	private String teamCode;
	private String days;
	private String name;
	private Boolean attend;
	private Boolean fresh;
	private Character state;
	private Integer no;
	
	
	public Integer getNo() {
		return no;
	}
	public Member setNo(Integer no) {
		this.no = no;
		return this;
	}
	public String getTeamCode() {
		return teamCode;
	}
	public Member setTeamCode(String teamCode) {
		this.teamCode = teamCode;
		return this;
	}
	public Character getState() {
		return state;
	}
	public Member setState(Character state) {
		this.state = state;
		return this;
	}
	public String getDepartment() {
		return department;
	}
	public Member setDepartment(String department) {
		this.department = department;
		return this;
	}
	public Member setFresh(Boolean fresh) {
		this.fresh = fresh;
		return this;
	}
	public Boolean getFresh() {
		return fresh;
	}
	public Member Boolean(Boolean fresh) {
		this.fresh = fresh;
		return this;
	}
	public String getTeam() {
		return team;
	}
	public Member setTeam(String team) {
		this.team = team;
		return this;
	}
	public String getDays() {
		return days;
	}
	public Member setDays(String days) {
		this.days = days;
		return this;
	}
	public String getName() {
		return name;
	}
	public Member setName(String name) {
		this.name = name;
		return this;
	}
	public Boolean getAttend() {
		return attend;
	}
	public Member setAttend(Boolean attend) {
		this.attend = attend;
		return this;
	}
	
	
}
