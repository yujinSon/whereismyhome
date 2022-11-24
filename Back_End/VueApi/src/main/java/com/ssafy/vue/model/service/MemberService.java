package com.ssafy.vue.model.service;

import java.sql.SQLException;

import com.ssafy.vue.model.MemberDto;

public interface MemberService {

	public MemberDto login(MemberDto memberDto) throws Exception;
	public MemberDto userInfo(String userid) throws Exception;
	public void saveRefreshToken(String userid, String refreshToken) throws Exception;
	public Object getRefreshToken(String userid) throws Exception;
	public void deleRefreshToken(String userid) throws Exception;
	public int regist(MemberDto memberDto) throws SQLException;
	public int deleteUser(String userid) throws SQLException;
	public int updateUser(MemberDto memberDto) throws SQLException;
	public String findPwd(MemberDto memberDto) throws SQLException;
	
}
