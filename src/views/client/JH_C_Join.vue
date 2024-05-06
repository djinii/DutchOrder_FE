<template>
  <div class="container mt-5">
    <h2 class="mb-4">회원가입</h2>
    <!-- 개인 -->
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="mname" class="form-label">이름</label>
        <input
          type="text"
          v-model="mname"
          class="form-control"
          id="mname"
          required
        />
      </div>
      <div class="mb-3">
        <label for="mnic" class="form-label">닉네임</label>
        <div class="input-group">
          <input
            type="text"
            v-model="mnic"
            class="form-control"
            id="mnic"
            required
            placeholder="친구 추가시 사용됩니다"
          />
          <button
            type="button"
            class="btn btn-primary"
            @click="checkDuplicates('mnic')"
          >
            중복확인
          </button>
        </div>
      </div>
      <div class="mb-3 row">
        <!-- 이메일 입력창 -->
        <div class="col-sm-12">
          <label for="memail" class="form-label">이메일</label>
          <input
            type="email"
            v-model="memail"
            class="form-control"
            id="memail"
            required
            placeholder="더치오더 아이디로 사용됩니다"
          />
        </div>
      </div>

      <div class="mb-3 row">
        <!-- 중복확인 버튼 -->
        <div class="col-sm-12 text-end">
          <button
            type="button"
            class="btn btn-primary btn-block"
            @click="checkDuplicates('memail')"
          >
            중복확인
          </button>
          <!-- 인증번호 받기 버튼 -->
          <button
            type="button"
            class="btn btn-primary btn-block"
            @click="sendVerificationCode"
          >
            인증번호 받기
          </button>
        </div>
      </div>

      <div class="mb-3">
        <label for="verificationCode" class="form-label">이메일 인증번호</label>
        <div class="input-group">
          <input
            type="text"
            v-model="verificationCode"
            class="form-control"
            id="verificationCode"
            required
            placeholder="이메일로 전송된 인증번호를 입력하세요"
          />
          <button
            type="button"
            class="btn btn-primary"
            @click="confirmVerificationCode"
            :disabled="!memail.trim() || !verificationCode.trim()"
          >
            인증번호 확인
          </button>
          <!-- 이메일 인증확인 끝 -->
        </div>
      </div>

      
      <div class="mb-3">
        <label for="mpw" class="form-label">비밀번호</label>
        <input
          type="password"
          v-model="mpw"
          class="form-control"
          id="mpw"
          required
        />
      </div>
      <div class="mb-3">
        <label for="confirm_mpw" class="form-label">비밀번호 확인</label>
        <input
          type="password"
          v-model="confirm_mpw"
          class="form-control"
          id="confirm_mpw"
          required
        />
      </div>
      <div class="mb-3">
        <label for="mtel" class="form-label">연락처</label>
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
      <div class="info-agree">
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="termsCheckbox"
            v-model="termsChecked"
            required
          />
          <label class="form-check-label" for="termsCheckbox"
            >이용약관 동의 (필수)</label
          >
        </div>
        <div class="info-box">
          <div class="info-text">
            <div class="info-title">- 개인정보의 수집 및 이용 목적 -</div>
            <div class="info-detail">
              <div>
                1. 회사명(더치오더)은 회원정보(이름, 이메일(아이디), 비밀번호,
                연락처)를 수집 및 이용하며, 이는 회원 가입 및 서비스 제공을 위한
                목적으로 수집됩니다.
              </div>
              <div>
                2. 수집된 회원정보는 회원 탈퇴 후 5일까지 보관되며, 이용약관에
                동의하지 않을 경우 회원 가입이 제한될 수 있습니다.
              </div>
              <div>
                3. 회원은 개인정보의 제공에 동의하지 않거나 동의를 철회할 권리가
                있으며, 이 경우 서비스 이용이 제한될 수 있습니다.
              </div>
              <div>
                4 더치오더는 회원정보를 안전하게 관리하고 이를 제3자에게
                제공하거나 판매하지 않습니다.
              </div>
              <div>
                5. 회원은 언제든지 회사(더치오더)에 문의하여 자신의 개인정보를
                열람, 정정, 삭제할 수 있습니다.
              </div>
            </div>

            <p class="notice">
              ※ 위 약관에 대해 동의를 거부할 권리가 있으며, 동의를 거부할 경우
              회원 가입이 제한됩니다.
            </p>
          </div>
        </div>
      </div>
      <div class="center-btn">
        <button type="submit" class="btn btn-primary">가입하기</button>
      </div>
    </form>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      mname: "",
      mnic: "",
      memail: "",
      mpw: "",
      confirm_mpw: "",
      mtel: "",
      termsChecked: false,
      verificationCode: "",
      duplicateChecked: false, // 중복 확인 여부를 나타내는 변수 추가
      isEmailVerified: false,
    };
  },

  methods: {
    async submitForm() {
      if (
        !this.mname.trim() ||
        !this.mnic.trim() ||
        !this.memail.trim() ||
        !this.mpw.trim() ||
        !this.confirm_mpw.trim() ||
        !this.mtel.trim() ||
        !this.termsChecked
      ) {
        alert("모든 필드를 채워주세요.");
        return;
      } else if (!this.duplicateChecked) {
        alert("닉네임 또는 이메일 중복을 확인해주세요");
        return;
      } else if (!this.isEmailVerified) {
        console.log(this.isEmailVerified);
        alert("이메일 인증을 완료해주세요.");
        return;
      }

      // 비밀번호와 비밀번호 확인이 일치하는지 확인
      if (this.mpw !== this.confirm_mpw) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      try {
        const response = await this.axios.post("/client/join", {
          mname: this.mname,
          mnic: this.mnic,
          memail: this.memail,
          mpw: this.mpw,
          mtel: this.mtel,
          mgroup_makey: "100",
          mgroup_mikey: "101",
          mstatus_makey: "200",
          mstatus_mikey: "201",
        });

        if (response.status === 200) {
          alert("회원가입이 완료되었습니다.");
          this.$router.push("/selectMemberType");
        } else {
          alert("회원가입에 실패했습니다.");
        }
      } catch (error) {
        console.error("회원가입 오류:", error);
        alert("닉네임 또는 이메일 중복을 확인해주세요");
      }
    },

    validateEmail() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.memail)) {
        alert("유효하지 않은 이메일 형식입니다.");
        this.memail = "";
      }
    },
    async checkDuplicates(field) {
      if (field === "mnic") {
        // 닉네임 중복 확인
        if (!this.mnic.trim()) {
          alert("닉네임을 입력해주세요.");
          return;
        }
        try {
          const response = await this.axios.get(
            `/check-duplicate/mnic?mnic=${this.mnic}`
          );
          if (response.data.isDuplicate) {
            alert("이미 사용 중인 닉네임입니다.");
          } else {
            alert("사용 가능한 닉네임입니다.");
            this.duplicateChecked = true; // 중복 확인 완료
          }
        } catch (error) {
          console.error("닉네임 중복 확인 오류:", error);
          alert("닉네임 중복 확인 중 문제가 발생했습니다.");
        }
      } else if (field === "memail") {
        // 이메일 중복 확인
        if (!this.memail.trim()) {
          alert("이메일을 입력해주세요.");
          return;
        }
        try {
          const response = await this.axios.get(
            `/check-duplicate/memail?memail=${this.memail}`
          );
          if (response.data.isDuplicate) {
            alert("이미 사용 중인 이메일입니다.");
          } else {
            alert("사용 가능한 이메일입니다.");
            this.duplicateChecked = true; // 중복 확인 완료
          }
        } catch (error) {
          console.error("이메일 중복 확인 오류:", error);
          alert("이메일 중복 확인 중 문제가 발생했습니다.");
        }
      }
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
           
        })
        .catch((error) => {
          console.error("서버 오류:", error);
          alert("서버 오류 발생!");
        });
    },
    // 이메일인증 끝
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 최소 높이 설정 */
}

.mb-4 {
  text-align: center;
}

.form-label {
  color: rgb(97, 97, 97);
}

.btn {
  margin: 5px;
  color: black;
  background-color: #f5beae;
  border-color: #f5beae;
}

.btn:hover {
  background-color: #f5835d;
}

.center-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.input-group .form-control {
  flex: 1;
  margin-right: 8px;
}

.input-group .btn {
  flex: 0 0 auto;
}

.input-group .form-control,
.input-group .btn {
  height: 38px;
  padding: 6px 12px;
}

.input-group .btn {
  line-height: 1.5;
}

.info-box {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6; /* 테두리 지정 */
  border-radius: 0.25rem;
  padding: 10px;
  margin-bottom: 20px;
}

.info-title {
  margin-bottom: 10px;
}

.info-text {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  color: gray;
}

.notice {
  margin-top: 15px; /* 상단 여백 지정 */
}

.info-agree {
  margin-top: 50px;
}
</style>
