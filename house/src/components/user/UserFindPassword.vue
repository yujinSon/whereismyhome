<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>비밀번호 찾기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.userid"
                required
                placeholder="아이디 입력...."
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
            <b-button type="button" variant="primary" class="m-1" @click="confirm">비밀번호 찾기</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import emailjs from "emailjs-com";
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserFindPassword",
  data() {
    return {
      // isLoginError: false,
      user: {
        userid: null,
        username: null,
        email: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isFind", "isFindError", "oldInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userFindConfirm", "getUserInfo", "updateConfirm"]),
    async confirm() {
      await this.userFindConfirm(this.user.userid);
      if (
        this.user.email === this.oldInfo.email &&
        this.user.userid === this.oldInfo.userid &&
        this.user.username === this.oldInfo.username
      ) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        var MD5 = require("crypto-js/md5");
        this.oldInfo.userpwd = MD5(result).toString();
        await this.updateConfirm(this.oldInfo);

        let templateParams = {
          to_email: this.oldInfo.email,
          to_name: this.oldInfo.username,
          message: result,
        };

        emailjs.init("SDJ760ilDDU4pew6L");
        emailjs.send("whereismyHome", "template_gd1br9j", templateParams).then(function () {
          alert("비밀번호를 이메일로 전송하였습니다.");
        });
        this.$router.push({ name: "main" });
      } else {
        alert("틀린게 있습니다.");
      }
    },
  },
};
</script>

<style></style>
