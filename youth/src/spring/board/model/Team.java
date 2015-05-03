package spring.board.model;


public class Team {

	private String department;
	private String team;
	private String teamCode;
	
	public String getTeamCode() {
		return teamCode;
	}
	public Team setTeamCode(String teamCode) {
		this.teamCode = teamCode;
		return this;
	}
	public String getDepartment() {
		return department;
	}
	public Team setDepartment(String department) {
		this.department = department;
		return this;
	}
		public String getTeam() {
		return team;
	}
	public Team setTeam(String team) {
		this.team = team;
		return this;
	}
	
}
