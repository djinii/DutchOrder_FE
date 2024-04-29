<template>
  <div class="container mt-2">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">WELCOME</h3>
            <h6 class="text-center">각자 결제하는 배달시스템 더치오더입니다</h6>
            <!-- <h3>({{ $route.params.level }})</h3> -->
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">아이디</label>
                <input
                  type="text"
                  v-model="memail"
                  class="form-control"
                  id="username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">비밀번호</label>
                <input
                  type="password"
                  v-model="mpw"
                  class="form-control"
                  id="password"
                  required
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100"
              >
                로그인
              </button>
              <button @click="goToJoin" class="btn btn-primary w-100">
                회원가입
              </button>
            </form>
            <div v-if="error" class="alert alert-danger mt-2 error-message">
              {{ error }}
            </div>
            <div class="mt-2 text-center">
              <a href="#" @click.prevent="findMyEmail">아이디 찾기</a> |
              <a href="#" @click.prevent="findMyPw">비밀번호 찾기</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      mnum: "",
      memail: "",
      mpw: "",
      // mgroup_mikey: "",
      error: "",
    };
  },
  mounted() {
    // 가져온 사용자 레벨 값으로 로직 수행
    console.log("사용자 레벨:", this.$route.params.level);
    console.log("회원번호:", this.$route.params.mnum);
    console.log("회원번호:", this.$route.params.bnum);
  },
  methods: {
    async login() {
      // 로그인 로직
      // console.log("로그인 시도:", this.memail, this.mpw);

      // 아이디와 암호가 입력되었는지 확인
      if (!this.memail || !this.mpw) {
        this.error = "아이디와 암호를 입력해주세요.";
        return;
      }
      try {
        const loginResponse = await this.axios.post("/login", {
          // mnum: this.mnum,
          memail: this.memail,
          mpw: this.mpw,
        });

        if (loginResponse.data === true) {
          let userLevel = await this.getUserLevel(this.memail);
          const userMnum = await this.getUserMnum(this.memail);
          const userBnum = await this.getUserBnum(this.memail);
          Cookies.set('mnum', userMnum, { expires: 1 }) // 쿠키 설정
          
          // Vuex 스토어의 상태 업데이트
          this.$store.commit("authStore/setLoginStatus", true);
          this.$store.commit("authStore/setUserLevel", userLevel);
          this.$store.commit("authStore/setUserMnum", userMnum);
          this.$store.commit("authStore/setUserBnum", userBnum);

          const path =
            userLevel === 101
              ? "/client/home"
              : userLevel === 102
              ? "/business/home"
              :  userLevel === 103
              ? "/admin/home"
              : "/selectMemberType"
          this.$router.push(path);

        } else {
          this.$store.commit("authStore/setLoginStatus", false);
          this.error = "아이디 또는 비밀번호가 잘못되었습니다.";
        }
      } catch (error) {
        this.$store.commit("authStore/setLoginStaus", false);
        console.error("로그인 중 오류가 발생했습니다.", error);
        this.error = "로그인 중 오류가 발생했습니다.";
      }
    },

    async getUserLevel(memail) {
      console.log(memail);
      // 사용자 레벨 불러오기
      try {
        const response = await this.axios.post("/getUserLevel", {
          memail,
        });
        return response.data; // 백엔드에서 받은 데이터를 반환
      } catch (error) {
        console.log(error);
      }
    },

    async getUserMnum(memail) {
      console.log(memail);
      // 사용자 회원번호 불러오기
      try {
        const response = await this.axios.post("/getUserMnum", {
          memail,
        });
        return response.data; // 백엔드에서 받은 데이터를 반환
      } catch (error) {
        console.log(error);
      }
    },

    async getUserBnum(memail) {
      console.log(memail);
      // 사용자 회원번호 불러오기
      try {
        const response = await this.axios.post("/getUserBnum", {
          memail,
        });
        return response.data; // 백엔드에서 받은 데이터를 반환
      } catch (error) {
        console.log(error);
      }
    },

    // 나머지 메서드들
    goToJoin() {
      // 회원가입 페이지로 이동하는 로직
      const userLevel = this.$route.params.level;
      this.$router.push({ path: `/${userLevel}/join` });
      console.log("회원가입 페이지로 이동");
    },
    findMyEmail() {
      // 아이디 찾기 페이지로 이동하는 로직
      const userLevel = this.$route.params.level;
      this.$router.push({ path: `/${userLevel}/findMyEmail` });
      console.log("아이디 찾기 페이지로 이동");
    },
    findMyPw() {
      const userLevel = this.$route.params.level;
      this.$router.push({ path: `/${userLevel}/findMyPw` });
      console.log("비밀번호 찾기 페이지로 이동");
    },
  },
};
</script>

<style scoped>
.text-center {
  margin-top: 10px;
  margin-bottom: 10px;
}

.btn {
  margin-top: 10px;
  margin-bottom: 5px;
  color: black;
  background-color: #f5beae;
  border-color: #f5beae;
}

.btn:hover {
  background-color: #f5835d;
}

.error-message {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  text-align: center;
  color: #000000;
  background-color: #dae9e7;
  border-color: #dae9e7;
}
</style>



