package spring.board.model;

import java.util.List;


public class TeamReport {

	private String team;
	private List<String> absenceList;
	private List<String> freshList;
	private List<String> prayList;
	

	public List<String> getfreshList() {
		return freshList;
	}
	public TeamReport setfreshList(List<String> freshList) {
		this.freshList = freshList;
		return this;
	}
	public String getTeam() {
		return team;
	}
	public TeamReport setTeam(String team) {
		this.team = team;
		return this;
	}
	public List<String> getAbsenceList() {
		return absenceList;
	}
	public TeamReport setAbsenceList(List<String> absenceList) {
		this.absenceList = absenceList;
		return this;
	}
	public List<String> getPrayList() {
		return prayList;
	}
	public TeamReport setPrayList(List<String> prayList) {
		this.prayList = prayList;
		return this;
	}
	
}
