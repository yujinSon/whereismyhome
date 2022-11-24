<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col> </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>My Page</template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row id="rows">
              <b-col cols="2"></b-col>
              <b-card class="text-center mt-3" style="max-width: 40rem" align="center" id="wcenter">
                <b-form class="text-left">
                  <b-form-group label="아이디:" label-for="userid" description="필수입력">
                    <b-form-input
                      id="userid"
                      v-model="userInfo.userid"
                      required
                      readonly
                      placeholder="아이디 입력...."
                      @keyup.enter="confirm"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group label="비밀번호:" label-for="userpwd" description="필수입력">
                    <b-form-input
                      type="password"
                      id="userpwd"
                      v-model="userInfo.userpwd"
                      required
                      placeholder="비밀번호 입력...."
                      @keyup.enter="confirm"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group label="이름:" label-for="username" description="필수입력">
                    <b-form-input
                      id="username"
                      v-model="userInfo.username"
                      required
                      placeholder="이름 입력...."
                      @keyup.enter="confirm"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group label="이메일:" label-for="email">
                    <b-form-input
                      id="email"
                      v-model="userInfo.email"
                      required
                      placeholder="이메일 입력...."
                      @keyup.enter="confirm"
                    ></b-form-input>
                  </b-form-group>
                  <b-button type="button" variant="primary" class="mr-1" @click="update">정보수정</b-button>
                </b-form>
              </b-card>
            </b-row>
          </b-container>
          <hr class="my-4" />
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserMyPageEdit",
  components: {},
  computed: {
    ...mapState(memberStore, ["isUpdate", "isUpdateError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["updateConfirm"]),
    async update() {
      var MD5 = require("crypto-js/md5");
      this.userInfo.userpwd = MD5(this.userInfo.userpwd).toString();
      await this.updateConfirm(this.userInfo);
      if (this.isUpdate) {
        this.movePage();
      }
    },
    movePage() {
      this.$router.push({ name: "mypage" });
    },
  },
};
</script>

<style></style>
