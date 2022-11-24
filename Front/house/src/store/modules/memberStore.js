import jwtDecode from "jwt-decode";
import router from "@/router";
import { login, findById, tokenRegeneration, logout, regist, deleteUser, updateUser, findByPwd } from "@/api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
    isRegist: false,
    isRegistError: false,
    isDelete: false,
    isDeleteError: false,
    isUpdate: false,
    isUpdateError: false,
    isFindPwd: false,
    isFindPwdError: false,
    oldInfo: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_IS_REGIST: (state, isRegist) => {
      state.isRegist = isRegist;
    },
    SET_IS_REGIST_ERROR: (state, isRegistError) => {
      state.isRegistError = isRegistError;
    },
    SET_IS_DELETE: (state, isDelete) => {
      state.isDelete = isDelete;
    },
    SET_IS_DELETE_ERROR: (state, isDeleteError) => {
      state.isDeleteError = isDeleteError;
    },
    SET_IS_UPDATE: (state, isUpdate) => {
      state.isUpdate = isUpdate;
    },
    SET_IS_UPDATE_ERROR: (state, isUpdateError) => {
      state.isUpdateError = isUpdateError;
    },
    SET_IS_FINDPWD: (state, isFindPwd) => {
      state.isFindPwd = isFindPwd;
    },
    SET_IS_FINDPWD_ERROR: (state, isFindPwdError) => {
      state.isFindPwdError = isFindPwdError;
    },
    GET_USER_INFO: (state, oldInfo) => {
      state.oldInfo = oldInfo;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async registConfirm({ commit }, user) {
      await regist(
        user,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_REGIST", true);
            commit("SET_IS_REGIST_ERROR", false);
          } else {
            commit("SET_IS_REGIST", false);
            commit("SET_IS_REGIST_ERROR", true);
          }
        },
        (error) => {
          commit("SET_IS_REGIST", false);
          commit("SET_IS_REGIST_ERROR", true);
          console.log(error);
        }
      );
    },
    async userDelete({ commit }, userid) {
      await deleteUser(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_DELETE", true);
            commit("SET_IS_DELETE_ERROR", false);
          } else {
            commit("SET_IS_DELETE", false);
            commit("SET_IS_DELETE_ERROR", true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async updateConfirm({ commit }, user) {
      await updateUser(
        user,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_UPDATE", true);
            commit("SET_IS_UPDATE_ERROR", false);
          } else {
            commit("SET_IS_UPDATE", false);
            commit("SET_IS_UPDATE_ERROR", true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async userFindConfirm({ commit }, user) {
      await findByPwd(
        user,
        ({ data }) => {
          if (data.message === "success") {
            commit("GET_USER_INFO", data.userInfo);
            commit("SET_IS_UPDATE", true);
            commit("SET_IS_UPDATE_ERROR", false);
          } else {
            commit("SET_IS_UPDATE", false);
            commit("SET_IS_UPDATE_ERROR", true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
          }
        },
        async (error) => {
          console.log(error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                console.log(data);
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default memberStore;
