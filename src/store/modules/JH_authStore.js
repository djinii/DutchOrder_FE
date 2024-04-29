import axios from 'axios';
const authStore = {
    namespaced : true,
    state: {
        isLoggedIn: sessionStorage.getItem("setLoginStatus") === "true",
        userLevel: sessionStorage.getItem("userLevel") || null,
        userMnum: sessionStorage.getItem("userMnum"),
        userBnum: sessionStorage.getItem("userBnum"),
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        getUserLevel: (state) => state.userLevel,
        getUserMnum: (state) => state.userMnum,
        getUserBnum: (state) => state.userBnum,
    },
    mutations: {
        setLoginStatus(state, status) {
          state.isLoggedIn = status;
          sessionStorage.setItem("setLoginStatus", String(status));
        },
        setUserLevel(state, level) {
          state.userLevel = level;
          sessionStorage.setItem("userLevel", level);
          console.log("jhStore, setUserLevel -> " + level)
        },
        setUserMnum(state, mnum) {
          state.userMnum = mnum;
          sessionStorage.setItem("userMnum", mnum);
          console.log("jhStore, userMnum -> " + mnum)
        },
        setUserBnum(state, bnum) {
          state.userBnum = bnum;
          sessionStorage.setItem("userBnum", bnum);
        },
        setUserInfo(state, userInfo) {
          state.userMname = userInfo.mname;
          state.userMnic = userInfo.mnic;
          state.userMemail = userInfo.memail;
          state.userMpw = userInfo.mpw;
          state.userMtel = userInfo.mtel;
        },
    },
    actions: {
        updateLoginStatus({ commit }, status) {
          commit("setLoginStatus", status);
        },
        async login({ commit }, { memail, mpw }) {
          try {
            const response = await axios.post("/login", { memail, mpw });
            if (response.data.success) {
              // 예를 들어 백엔드가 success 프로퍼티를 반환한다고 가정
              commit("setLoginStatus", true);
              commit("setUserLevel", response.data.userLevel);
              commit("setUserMnum", response.data.userMnum);
              commit("setUserBnum", response.data.userBnum);
              // 세션 스토리지에 저장
              sessionStorage.setItem("setLoginStatus", "true");
              sessionStorage.setItem("userLevel", response.data.userLevel);
              sessionStorage.setItem("userMnum", response.data.userMnum);
              sessionStorage.setItem("userBnum", response.data.userBnum);
            } else {
              // 로그인 실패 처리
              commit("setLoginStatus", false);
            }
          } catch (error) {
            console.error("로그인 중 오류 발생", error);
            commit("setLoginStatus", false);
          }
        },
        logout({ commit }) {
          commit("setLoginStatus", false);
          commit("setUserLevel", null);
          commit("setUserMnum", null);
          commit("setUserBnum", null);
          sessionStorage.removeItem("setLoginStatus");
          sessionStorage.removeItem("userLevel");
          sessionStorage.removeItem("userMnum");
          sessionStorage.removeItem("userBnum");
        },
        async fetchUserInfo({ commit, state }) {
          try {
            const response = await axios.get(`/updateInfo/${state.userMnum}`);
            if (response.data) {
              commit("setUserInfo", response.data);
            }
          } catch (error) {
            console.log("사용자 정보를 불러오는 데 실패했습니다", error);
          }
        },
    },
}
export default authStore;