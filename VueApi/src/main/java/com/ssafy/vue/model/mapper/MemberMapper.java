package com.ssafy.vue.model.mapper;

import java.sql.SQLException;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.vue.model.MemberDto;

@Mapper
public interface MemberMapper {
	//로그인
	public MemberDto login(MemberDto memberDto) throws SQLException;
	public MemberDto userInfo(String userid) throws SQLException;
	public void saveRefreshToken(Map<String, String> map) throws SQLException;
	public Object getRefreshToken(String userid) throws SQLException;
	public void deleteRefreshToken(Map<String, String> map) throws SQLException;
	
	//회원가입
	public int regist(MemberDto memberDto) throws SQLException;
	public int deleteUser(String userid) throws SQLException;
	public int updateUser(MemberDto memberDto) throws SQLException;
	public String findPwd(MemberDto memberDto) throws SQLException;
}
