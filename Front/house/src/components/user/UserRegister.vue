<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3>회원가입</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isRegistError">다른아이디를 사용하세요</b-alert>
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.userid"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이름:" label-for="username">
              <b-form-input
                id="username"
                v-model="user.username"
                required
                placeholder="이름 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이메일:" label-for="email">
              <b-form-input
                id="email"
                v-model="user.email"
                required
                placeholder="이메일 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>

            <b-button type="button" variant="success" class="m-1" @click="confirm">회원가입</b-button>
            <b-button type="button" variant="danger" class="m-1" @click="movePage">취소</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserRegister",
  data() {
    return {
      // isRegistError: false,
      user: {
        userid: null,
        userpwd: null,
        username: null,
        email: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isRegist", "isRegistError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["registConfirm"]),
    async confirm() {
      if (
        this.checkUserId(this.user.userid) &&
        this.checkPassword(this.user.userpwd) &&
        this.checkName(this.user.username) &&
        this.checkMail(this.user.email)
      ) {
        var MD5 = require("crypto-js/md5");
        this.user.userpwd = MD5(this.user.userpwd).toString();
        await this.registConfirm(this.user);
        if (this.isRegist) {
          this.movePage();
        }
      }
    },

    checkUserId(id) {
      var idRegExp = /^[a-zA-z0-9]{4,12}$/; //아이디 유효성 검사
      if (!idRegExp.test(id)) {
        alert("아이디는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!");
        return false;
      }
      return true; //확인이 완료되었을 때
    },

    checkPassword(password1) {
      var password1RegExp = /^[a-zA-z0-9]{4,12}$/; //비밀번호 유효성 검사
      if (!password1RegExp.test(password1)) {
        alert("비밀번호는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!");
        return false;
      }
      return true; //확인이 완료되었을 때
    },
    checkMail(mail) {
      var emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
      if (!emailRegExp.test(mail)) {
        alert("이메일 형식이 올바르지 않습니다!");
        return false;
      }
      return true; //확인이 완료되었을 때
    },

    checkName(name) {
      var nameRegExp = /^[가-힣]{2,4}$/;
      if (!nameRegExp.test(name)) {
        alert("이름이 올바르지 않습니다.");
        return false;
      }
      return true; //확인이 완료되었을 때
    },

    movePage() {
      this.$router.push({ name: "main" });
    },
  },
};
</script>

<style></style>