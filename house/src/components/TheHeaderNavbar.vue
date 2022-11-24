<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <router-link :to="{ name: 'main' }">
        <b-img :src="require('@/assets/아빠차.png')" id="logo" class="d-inline-block align-top" alt="logo"></b-img>
      </router-link>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            <router-link :to="{ name: 'main' }" class="link"> 메인 </router-link>
            <router-link :to="{ name: 'board' }" class="m-2 link"> 게시판 </router-link>
            <router-link :to="{ name: 'house' }" class="m-2 link"> 아파트정보 </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- after login -->
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center">
            <b-avatar
              variant="info"
              src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/31/d399eb2b-154e-4585-bdbb-b8a86939577c.jpg"
            ></b-avatar>
            <b>{{ userInfo.username }}</b
            >님 환영합니다.
          </b-nav-item>
          <b-nav-item class="align-self-center">
            <router-link :to="{ name: 'mypage' }" class="link align-self-center">내정보보기</router-link>
          </b-nav-item>
          <b-nav-item class="align-self-center link" @click.prevent="onClickLogout">로그아웃</b-nav-item>
        </b-navbar-nav>
        <!-- before login -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item right>
            <router-link :to="{ name: 'login' }" class="link"> 로그인</router-link>
            <router-link :to="{ name: 'join' }" class="link"> 회원가입</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "TheHeaderNavbar",
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    onClickLogout() {
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
  },
};
</script>

<style scoped>
#logo {
  width: 80px;
}

.link {
  color: black;
  font-size: larger;
  font-weight: 1000;
}
</style>
