<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h3 class="text-center">비밀번호 찾기</h3>
        <!-- <h3>{{ $route.params.level }}</h3> -->
        <form @submit.prevent="findMyPw">
          <div class="form-group row">
            <label for="memail" class="col-sm-4 col-form-label">아이디</label>
            <div class="col-sm-11">
              <input
                type="email"
                class="form-control"
                id="memail"
                v-model="memail"
                required
                placeholder="아이디를 입력하세요"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="mtel" class="col-sm-4 col-form-label">연락처</label>
            <div class="col-sm-11">
              <input
                type="tel"
                v-model="mtel"
                class="form-control"
                id="mtel"
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                required
                placeholder="예시: 010-1234-5678"
              />
            </div>
            <div class="col-sm-12 text-right">
              <button type="submit" class="btn btn-primary">확인</button>
            </div>
          </div>
        </form>
        <div class="resultMessage text-center">
          <div v-if="myPwFound !== null && myPwFound !== ''">
            <button
              type="button"
              class="btn btn-primary btn-block"
              @click="sendVerificationCode"
            >
              인증번호 받기
            </button>
            <div class="form-group">
              <input
                type="text"
                v-model="verificationCode"
                required
                class="form-control"
                placeholder="인증번호를 입력해주세요"
              />
            </div>
            <button
              @click="confirmVerificationCode"
              class="btn btn-primary btn-block"
            >
              인증번호 확인
            </button>
          </div>
          <div v-else-if="myPwFound === ''">
            해당하는 정보를 찾을 수 없습니다.
          </div>
          <div v-if="verificationCodeValid">
            <div class="form-group row">
              <label for="password" class="col-sm-4 col-form-label"
                >새 비밀번호</label
              >
              <div class="col-sm-11">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="confirmPassword" class="col-sm-4 col-form-label"
                >비밀번호 확인</label
              >
              <div class="col-sm-11">
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  required
                />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-12 text-center">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="updatePassword"
                >
                  비밀번호 변경
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      memail: "",
      mtel: "",
      myPwFound: null,
      verificationCode: "",
      password: "",
      confirmPassword: "",
      isEmailVerified: false,
      verificationCodeValid: false,
    };
  },
  methods: {
    findMyPw() {
      this.axios
        .post("/updatePassword", {
          memail: this.memail,
          mtel: this.mtel,
        })
        .then((response) => {
          // 서버로부터의 응답 처리
          this.myPwFound = response.data ? response.data : "";
        })
        .catch((error) => {
          // 에러 처리
          console.error("Error:", error);
          this.myPwFound = ""; // 에러가 발생했을 때 처리
        });
    },
    // 이메일인증 시작
    sendVerificationCode() {
      // 이메일 인증 코드 발송 기능 구현
      this.axios
        .post("/sendVerificationEmail", {
          email: this.memail,
        })
        .then((response) => {
          // 서버로부터 받은 응답 처리
          alert("서버 응답: " + response.data);
          console.log("서버 응답:", response.data);
        })
        .catch((error) => {
          console.error("서버 오류:", error);
          alert("서버 오류 발생!");
        });
    },
    async confirmVerificationCode() {
      // 인증번호 확인 기능 구현
      this.axios
        .post("/confirmVerificationCode", {
          email: this.memail,
          eccode: this.verificationCode,
        })
        .then((response) => {
          // 서버로부터 받은 응답 처리
          alert("서버 응답: " + response.data);
          console.log("서버 응답:", response.data);
          this.isEmailVerified = true;
          this.verificationCodeValid = true;
        })
        .catch((error) => {
          console.error("서버 오류:", error);
          alert("서버 오류 발생!");
        });
    },
    // 이메일인증 끝
    updatePassword() {
      if (this.password !== this.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      this.axios
        .post("/updatePassword", {
          memail: this.memail,
          newMpw: this.newMpw,
        })
        .then(() => {
          alert("비밀번호가 업데이트 되었습니다.");
          this.$router.push("/selectMemberType");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("비밀번호 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.");
        });
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 10px;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  margin-bottom: 0;
}

.btn {
  margin-top: 10px;
  margin-bottom: 10px;
  color: black;
  display: block;
  background-color: #f5beae;
  border-color: #f5beae;
}

.btn:hover {
  background-color: #f5835d;
}
</style>
