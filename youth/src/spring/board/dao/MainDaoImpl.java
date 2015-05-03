package spring.board.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import spring.board.model.Member;
import spring.board.model.Pray;
import spring.board.model.Statistic;
import spring.board.model.Team;


@Repository("mainDao")
public class MainDaoImpl implements MainDao {
	
	@Resource
	SqlSession sqlSession;
	
	@Override
	public List<Statistic> getTeamStatistic(Statistic statistic) {
		return sqlSession.selectList("main.getTeamStatistic", statistic);
	}

	@Override
	public List<Statistic> getTeamStatistic(String days1, String days2) {
		
		Map<String, String> map = new HashMap<String, String>(2);
		map.put("days1", days1);
		map.put("days2", days2);
		
		return sqlSession.selectList("main.getTeamStatistic2weeks", map);
	}
	
	@Override
	public List<Pray> getPrayList(Pray pray) {
		return sqlSession.selectList("main.getPrayList", pray);
	}

	@Override
	public List<Member> getAttendList(Member member) {
		return sqlSession.selectList("main.getAttendList", member);
	}

	@Override
	public List<Team> getTeamList(Integer no) {
		return sqlSession.selectList("main.getTeamList", no);
	}

	@Override
	public Integer getTeamCount() {
		return sqlSession.selectOne("main.getTeamCount");
	}

	@Override
	public List<Statistic> getDepartmentStatistic(Statistic statistic) {
		return sqlSession.selectList("main.getDepartmentStatistic", statistic);
	}

	@Override
	public List<Member> getMidfieldMemberList(Member member) {
		return sqlSession.selectList("main.getMidfieldMemberList", member);
	}

	@Override
	public Integer insertThisWeekTeamAttend(List<Member> memberlist) {
		return sqlSession.insert("team.insertThisWeekTeamAttend", memberlist);
	}

	@Override
	public Integer updateThisWeekTeamAttend(List<Member> memberlist) {

		Integer count = 0;
		for(Member member : memberlist)	{
			count += sqlSession.update("team.updateThisWeekTeamAttend", member);
		}
		
		return count;
	}

	@Override
	public Integer insertThisWeekTeamPray(List<Pray> praylist) {
		return sqlSession.insert("team.insertThisWeekTeamPray", praylist);
	}

	@Override
	public Integer deleteTeamPray(Pray pray) {
		return sqlSession.delete("team.deleteTeamPray", pray);
	}

	@Override
	public Integer getAttendCount(Member member) {
		return sqlSession.selectOne("main.getAttendCount", member);
	}

	@Override
	public Integer insertTeamStatistic(Statistic statistic) {
		return sqlSession.insert("team.insertTeamStatistic", statistic);
	}

	@Override
	public Integer updateTeamStatistic(Statistic statistic) {
		return sqlSession.update("team.updateTeamStatistic", statistic);
	}

	@Override
	public Integer insertDepartmentStatistic(Statistic statistic) {
		return sqlSession.insert("team.insertDepartmentStatistic", statistic);
	}

	@Override
	public Integer updateDepartmentStatistic(Statistic statistic) {
		return sqlSession.update("team.updateDepartmentStatistic", statistic);
	}

	@Override
	public Integer deleteTeamAttend(Member member) {
		return sqlSession.delete("team.deleteTeamAttend", member);
	}

	@Override
	public Integer deleteTeamStatistic(Statistic statistic) {
		return sqlSession.delete("team.deleteTeamStatistic", statistic);
	}

	@Override
	public Integer insertMember(Member member) {
		return sqlSession.insert("team.insertMember", member);
	}

	@Override
	public Integer getFreshCount(Member member) {
		return sqlSession.selectOne("main.getFreshCount", member);
	}

	@Override
	public Member getMember(Member member) {
		return sqlSession.selectOne("main.getMember", member);
	}

	@Override
	public Integer insertMemberAttend(Member member) {
		return sqlSession.insert("team.insertMemberAttend", member);
	}

	@Override
	public Integer updateMemberState(Member member) {
		return sqlSession.update("team.updateMemberState", member);
	}

	@Override
	public Integer updateMemberAttend(Member member) {
		return sqlSession.update("team.updateMemberAttend", member);
	}

	@Override
	public Integer getNo(String days) {
		return sqlSession.selectOne("main.getNo", days);
	}

	@Override
	public Integer insertIP(String ip, String action) {
		
		Map<String, String> map = new HashMap<String, String>(2);
		map.put("ip", ip);
		map.put("action", action);
		return sqlSession.selectOne("main.insertIP", map);
	}
}
