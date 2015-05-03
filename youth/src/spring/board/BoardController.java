package spring.board;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import spring.board.model.Member;
import spring.board.model.Pray;
import spring.board.model.Statistic;
import spring.board.model.Team;
import spring.board.model.TeamReport;
import spring.board.service.MainService;

@Controller
public class BoardController {

	@Inject
	@Named("mainService")
	private MainService mainService;


	@RequestMapping(value="/getTeamAttendList", produces="application/json; charset=utf-8")
	@ResponseBody
	public String getAttendList(Member member) throws Throwable{
		
		Integer no = mainService.getNo(member.getDays());	// 湲곗닔 媛��졇�삤湲�
		
		List<Member> memberList = mainService.getAttendList(member.setNo(no));
		
		if( memberList.size() == 0 )	{
			memberList = mainService.getMidfieldMemberList(member.setNo(no).setDays(null));
		}
		
		return new ObjectMapper().writeValueAsString(memberList);
	}
	
	@RequestMapping(value="/getTeamPrayList", produces="application/json; charset=utf-8")
	@ResponseBody
	public String getTeamPrayList(Pray pray) throws Throwable{
		
		Integer no = mainService.getNo(pray.getDays());	// 湲곗닔 媛��졇�삤湲�
		
		return new ObjectMapper().writeValueAsString(mainService.getPrayList(pray.setNo(no)));
	}	

	@RequestMapping(value="/setThisWeekTeamFresh", produces="application/json; charset=utf-8")
	@ResponseBody
	public Integer setThisWeekTeamFresh(@RequestBody List<Member> fMemberlist) throws Throwable{
		
		int this_week_attend = 0;
		int this_week_fresh = 0;

		Integer no = mainService.getNo(fMemberlist.get(0).getDays());	// 湲곗닔 媛��졇�삤湲�
		
		for(Member fMember : fMemberlist)	{

			// �씠踰� 異쒖꽍�뿉 �뾾�쑝硫� 異쒖꽍�뿉 異붽�
			if(mainService.getAttendList(fMember.setAttend(null).setNo(no)).size() == 0)	{
				this_week_attend++;
				this_week_fresh++;
				mainService.insertMemberAttend(fMember.setAttend(true));
			}
			// 誘몃뱶�븘�뜑 硫ㅻ쾭�뿉 �뾾�쑝硫� 異붽�
			if(mainService.getMember(fMember) == null)	{
				mainService.insertMember(fMember.setState('F'));
			}
			// �엳�쑝硫� 異쒖꽍 紐뉗＜李⑥씤吏� �솗�씤�븯怨� 5二쇱감�씠硫� 硫ㅻ쾭濡� �긽�깭蹂�寃�
			else	{
				int freshCount  = mainService.getAttendCount(fMember.setDays(null));
				if( freshCount == 5 )	{
					mainService.updateMemberAttend(fMember.setFresh(false));
					mainService.updateMemberState(fMember.setState('O'));
					this_week_fresh--;
				}
			}
		}
		
		Statistic statistic = new Statistic();
		statistic.setDays(fMemberlist.get(0).getDays())
				 .setTeamCode(fMemberlist.get(0).getTeamCode())
				 .setDepartment(fMemberlist.get(0).getDepartment());
		
		statistic = mainService.getTeamStatistic(statistic).get(0);
		
		statistic.setThis_week_attend( statistic.getThis_week_attend() + this_week_attend )
				 .setThis_week_fresh( statistic.getThis_week_fresh() + this_week_fresh );
		
		mainService.updateTeamStatistic(statistic);

		return 1;
	}
	
	@RequestMapping(value="/setThisWeekTeamAttend", produces="application/json; charset=utf-8")
	@ResponseBody
	public Integer setThisWeekTeamAttend(@RequestBody List<Member> tMemberlist) throws Throwable{
		
		Integer no = mainService.getNo(tMemberlist.get(0).getDays());	// 湲곗닔 媛��졇�삤湲�
		
		Member member = new Member();
		member.setDays(tMemberlist.get(0).getDays())
			  .setTeamCode(tMemberlist.get(0).getTeamCode())
			  .setTeam(tMemberlist.get(0).getTeam())
			  .setDepartment(tMemberlist.get(0).getDepartment())
			  .setNo(no);
		
		// �빐�떦 �궇吏� 異쒖꽍�쓣 �엯�젰�뻽�뒗吏� �솗�씤
		List<Member> memberList = mainService.getAttendList(member.setAttend(null));

		// �엯�젰 �긽�깭�씪硫� �닔�젙 / 誘몄엯�젰 �긽�깭�씪硫� �엯�젰
		Integer count = (memberList.size() == 0) ? mainService.insertThisWeekTeamAttend(tMemberlist) : mainService.updateThisWeekTeamAttend(tMemberlist);
		
		Integer t_count = 0;
		// �� �넻怨� / 遺��꽌 �넻怨� �닔�젙
		if( count > 0 )	{
			
			Integer this_week_attend_count = mainService.getAttendCount(member.setAttend(true));	// �씠踰덉＜ 異쒖꽍 �씤�썝 �닔
			Integer this_week_absence_count = tMemberlist.size() - this_week_attend_count;			// �씠踰덉＜ 寃곗꽍 �씤�썝 �닔
			Integer this_week_fresh_count = mainService.getAttendCount(member.setAttend(true).setFresh(true));	// �씠踰덉＜ �깉媛�議� �씤�썝 �닔
			
			Statistic statistic = new Statistic();
			statistic.setDays(member.getDays())
					 .setTeamCode(member.getTeamCode())
					 .setDepartment(member.getDepartment())
					 .setThis_week_attend(this_week_attend_count)
					 .setThis_week_absence(this_week_absence_count)
					 .setThis_week_fresh(this_week_fresh_count);
			
			t_count = ( mainService.getTeamStatistic(statistic).size() == 0 )? mainService.insertTeamStatistic(statistic) : mainService.updateTeamStatistic(statistic);
		}
		
		return t_count;
	}	

	@RequestMapping(value="/deleteTeamReport", produces="application/json; charset=utf-8")
	@ResponseBody	
	public Integer deleteTeamReport(Member member, Statistic statistic, Pray pray) throws Throwable{
		
		mainService.deleteTeamAttend(member);
		mainService.deleteTeamStatistic(statistic);
		mainService.deleteTeamPray(pray);
		
		return 1;
	}		
	
	@RequestMapping(value="/setThisWeekTeamPray", produces="application/json; charset=utf-8")
	@ResponseBody
	public Integer setThisWeekTeamPray(@RequestBody List<Pray> pPraylist) throws Throwable{
		
		Pray pray = new Pray();
		pray.setDays(pPraylist.get(0).getDays())
			.setTeamCode(pPraylist.get(0).getTeamCode());
		
		// �빐�떦 �궇吏쒖뿉 �엯�젰�븳 湲곕룄�젣紐⑹씠 �엳�쑝硫� �궘�젣(媛쒖닔�굹 �궡�슜 蹂��룞�씠 �엳�쓣 �닔 �엳�쑝誘�濡�)
		mainService.deleteTeamPray(pray);
		
		// �깉濡� �엯�젰
		Integer count = mainService.insertThisWeekTeamPray(pPraylist);
		
		HttpServletRequest req = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		String ip = req.getHeader("X-FORWARDED-FOR");
		if (ip == null)	{
			ip = req.getRemoteAddr();
		}
		
		mainService.insertIP(ip, pPraylist.get(0).getTeamCode() + " insert");
		
		return count;
	}	

	@RequestMapping(value="/getTeamList", produces="application/json; charset=utf-8")
	@ResponseBody
	public String getTeamList(@RequestParam String days) throws Throwable{
		
		HttpServletRequest req = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		String ip = req.getHeader("X-FORWARDED-FOR");
		if (ip == null)	{
			ip = req.getRemoteAddr();
		}
		
		mainService.insertIP(ip, "visit");
		
		return new ObjectMapper().writeValueAsString(mainService.getTeamList(mainService.getNo(days)));
	}	
	
	@RequestMapping(value="/getTeamStatistic", produces="application/json; charset=utf-8")
	@ResponseBody
	public String getTeamStatisticTwoWeeks(Statistic statistic) throws Throwable{
		return new ObjectMapper().writeValueAsString(mainService.getTeamStatistic(statistic));
	}
	
	@RequestMapping(value="/getThisWeekTeamReport", produces="application/json; charset=utf-8")
	@ResponseBody
	public String getTeamReport(@RequestParam String days) throws Throwable{

		List<TeamReport> teamReportList = new ArrayList<TeamReport>();
		
		List<String> absenceList = null;
		List<String> freshList = null;
		List<String> prayList = null;
		
		Integer no = mainService.getNo(days);	// 湲곗닔 媛��졇�삤湲�
		
		TeamReport report = null; 
		for(Team teamObj : mainService.getTeamList(no))	{	// �뙆�씪誘명꽣濡� �꽆�뼱�삩 議곌굔 + ��紐�
			
			report = new TeamReport();
			absenceList = new ArrayList<String>();
			freshList = new ArrayList<String>();
			for(Member nameObj : mainService.getAttendList( new Member().setNo(no).setDays(days).setTeamCode(teamObj.getTeamCode()) ) )	{
				
				if( !nameObj.getAttend() )	{
					absenceList.add(nameObj.getName());
				}
				else if( nameObj.getFresh() )	{
					freshList.add(nameObj.getName());
				}
			}
			
			prayList = new ArrayList<String>();
			for(Pray prayObj : mainService.getPrayList( new Pray().setNo(no).setDays(days).setTeamCode(teamObj.getTeamCode())) )	{
				prayList.add(prayObj.getTitle());
			}
			
			report
					.setTeam(teamObj.getTeam())
					.setfreshList(freshList)
					.setAbsenceList(absenceList)
					.setPrayList(prayList);
			
			teamReportList.add(report);
			
		}
		
		return new ObjectMapper().writeValueAsString(teamReportList);
	}

}
