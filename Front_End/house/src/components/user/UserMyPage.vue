<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>

      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>My Page</template>

          <b-avatar src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/31/d399eb2b-154e-4585-bdbb-b8a86939577c.jpg" size="12rem"></b-avatar>
          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userid }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.username }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.email }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.joindate }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button type="button" variant="primary" class="mr-1" @click="movePage">정보수정</b-button>
          <b-button type="button" variant="danger" @click.prevent="confirmOut">회원탈퇴</b-button>
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
  name: "UserMyPage",
  components: {},
  computed: {
    ...mapState(memberStore, ["isDelete","isDeleteError","userInfo"]),
  },
  methods : {
    ...mapActions(memberStore, ["userDelete", "userLogout"]),
    async confirmOut() {
      await this.userDelete(this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      if (this.isDelete) {
        alert("탈퇴가 완료되었습니다");
        this.$router.push({ name: "main" });
      }
    },
    movePage() {
      this.$router.push({ name: "mypageEdit" });
    },
  }
};
</script>

<style></style>
