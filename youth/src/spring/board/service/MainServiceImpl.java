package spring.board.service;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;



























import org.springframework.stereotype.Service;

import spring.board.dao.MainDao;
import spring.board.model.Member;
import spring.board.model.Pray;
import spring.board.model.Statistic;
import spring.board.model.Team;

@Service("mainService")
public class MainServiceImpl implements MainService {
	
	@Inject
	@Named("mainDao")
	private MainDao mainDao;


	@Override
	public List<Statistic> getTeamStatistic(Statistic statistic) {
		return mainDao.getTeamStatistic(statistic);
	}

	@Override
	public List<Statistic> getTeamStatistic(String days1, String days2) {
		return mainDao.getTeamStatistic(days1, days2);
	}
	
	@Override
	public List<Pray> getPrayList(Pray pray) {
		return mainDao.getPrayList(pray);
	}

	@Override
	public List<Member> getAttendList(Member member) {
		return mainDao.getAttendList(member);
	}

	@Override
	public List<Team> getTeamList(Integer no) {
		return mainDao.getTeamList(no);
	}

	@Override
	public Integer getTeamCount() {
		return mainDao.getTeamCount();
	}

	@Override
	public List<Statistic> getDepartmentStatistic(Statistic statistic) {
		return mainDao.getDepartmentStatistic(statistic);
	}

	@Override
	public List<Member> getMidfieldMemberList(Member member) {
		return mainDao.getMidfieldMemberList(member);
	}

	@Override
	public Integer insertThisWeekTeamAttend(List<Member> memberlist) {
		return mainDao.insertThisWeekTeamAttend(memberlist);
	}

	@Override
	public Integer updateThisWeekTeamAttend(List<Member> memberlist) {
		return mainDao.updateThisWeekTeamAttend(memberlist);
	}

	@Override
	public Integer insertThisWeekTeamPray(List<Pray> praylist) {
		return mainDao.insertThisWeekTeamPray(praylist);
	}

	@Override
	public Integer deleteTeamPray(Pray pray) {
		return mainDao.deleteTeamPray(pray);
	}

	@Override
	public Integer getAttendCount(Member member) {
		return mainDao.getAttendCount(member);
	}

	@Override
	public Integer insertTeamStatistic(Statistic statistic) {
		return mainDao.insertTeamStatistic(statistic);
	}

	@Override
	public Integer updateTeamStatistic(Statistic statistic) {
		return mainDao.updateTeamStatistic(statistic);
	}

	@Override
	public Integer insertDepartmentStatistic(Statistic statistic) {
		return mainDao.insertDepartmentStatistic(statistic);
	}

	@Override
	public Integer updateDepartmentStatistic(Statistic statistic) {
		return mainDao.updateDepartmentStatistic(statistic);
	}

	@Override
	public Integer deleteTeamAttend(Member member) {
		return mainDao.deleteTeamAttend(member);
	}

	@Override
	public Integer deleteTeamStatistic(Statistic statistic) {
		return mainDao.deleteTeamStatistic(statistic);
	}

	@Override
	public Integer insertMember(Member member) {
		return mainDao.insertMember(member);
	}

	@Override
	public Integer getFreshCount(Member member) {
		return mainDao.getFreshCount(member);
	}

	@Override
	public Member getMember(Member member) {
		return mainDao.getMember(member);
	}

	@Override
	public Integer insertMemberAttend(Member member) {
		return mainDao.insertMemberAttend(member);
	}

	@Override
	public Integer updateMemberState(Member member) {
		return mainDao.updateMemberState(member);
	}

	@Override
	public Integer updateMemberAttend(Member member) {
		return mainDao.updateMemberAttend(member);
	}

	@Override
	public Integer getNo(String days) {
		return mainDao.getNo(days);
	}

	@Override
	public Integer insertIP(String ip, String action) {
		return mainDao.insertIP(ip, action);
	}
}
