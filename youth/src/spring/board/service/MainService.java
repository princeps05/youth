package spring.board.service;

import java.util.List;

import spring.board.model.Member;
import spring.board.model.Pray;
import spring.board.model.Statistic;
import spring.board.model.Team;



public interface MainService {

	public List<Statistic> getTeamStatistic(Statistic statistic);
	public List<Statistic> getTeamStatistic(String days1, String days2);
	
	public List<Pray> getPrayList(Pray pray);

	public List<Member> getAttendList(Member member);
	
	public List<Team> getTeamList(Integer no);
	
	public Integer getTeamCount();

	public List<Statistic> getDepartmentStatistic(Statistic statistic);

	public List<Member> getMidfieldMemberList(Member member);

	public Integer insertThisWeekTeamAttend(List<Member> memberlist);

	public Integer updateThisWeekTeamAttend(List<Member> memberlist);
	
	public Integer insertThisWeekTeamPray(List<Pray> praylist);

	public Integer deleteTeamPray(Pray pray);

	public Integer getAttendCount(Member member);

	public Integer insertTeamStatistic(Statistic statistic);

	public Integer updateTeamStatistic(Statistic statistic);

	public Integer insertDepartmentStatistic(Statistic statistic);

	public Integer updateDepartmentStatistic(Statistic statistic);

	public Integer deleteTeamAttend(Member member);

	public Integer deleteTeamStatistic(Statistic statistic);

	public Integer insertMember(Member member);

	public Integer getFreshCount(Member member);

	public Member getMember(Member member);

	public Integer insertMemberAttend(Member member);

	public Integer updateMemberState(Member member);

	public Integer updateMemberAttend(Member member);
	
	public Integer getNo(String days);
	
	public Integer insertIP(String ip, String action);
}
