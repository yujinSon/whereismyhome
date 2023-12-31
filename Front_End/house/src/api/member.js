import { apiInstance } from "./index.js";

const api = apiInstance(); //api가 axios

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

//회원가입
async function regist(user, success, fail) {
  await api.post(`/user/join`, JSON.stringify(user)).then(success).catch(fail);
}

async function deleteUser(userid, success, fail) {
  await api.delete(`/user/deleteUser/${userid}`).then(success).catch(fail);
}

async function updateUser(user, success, fail) {
  await api.put(`/user/updateUser`, JSON.stringify(user)).then(success).catch(fail);
}

async function findByPwd(userid, success, fail) {
  await api
    .get(`/user/info/${userid}`, {
      param: {
        userid,
      },
    })
    .then(success)
    .catch(fail);
}

export { login, findById, tokenRegeneration, logout, regist, deleteUser, updateUser, findByPwd };
