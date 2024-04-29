<template>
  <div class="container mt-5">
    <!-- 개인 -->
    <h2 class="mb-4">개인정보수정</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="mname" class="form-label">이름</label>
        <input
          type="text"
          v-model="mname"
          class="form-control"
          id="mname"
          required
          disabled
        />
      </div>
    </form>
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
          @input="enableNickNameChange"
        />
        <button
          type="button"
          class="btn btn-primary"
          @click="checkDuplicates('mnic')"
          :disabled="!isNickNameChanged"
        >
          중복확인
        </button>
      </div>
    </div>
    <div class="mb-3">
      <label for="memail" class="form-label">이메일</label>
      <input
        type="memail"
        v-model="memail"
        class="form-control"
        id="memail"
        required
        disabled
      />
    </div>
    <div class="mb-3">
      <label for="mtel" class="form-label">연락처</label>
      <div class="input-group">
        <input
          type="tel"
          v-model="mtel"
          class="form-control"
          id="mtel"
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          required
          @input="enableTelChange"
        />
      </div>
      <small class="text-muted">예시: 010-1234-5678</small>
    </div>
    <div class="form-buttons">
      <button
        type="submit"
        class="btn btn-primary withdraw"
        @click="updateAccountStatus"
      >
        탈퇴하기
      </button>
      <button
        type="submit"
        class="btn btn-primary"
        @click="updateUserInfo"
        :disabled="!isTelChanged && !isNickNameChanged"
      >
        수정하기
      </button>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      mnum: "",
      mname: "",
      mnic: "",
      memail: "",
      mtel: "",
      originalMnic: "",
      originalMtel: "",
      isNickNameChanged: false,
      isTelChanged: false,
      error: "",
    };
  },
  async mounted() {
    await this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        // store에서 userMnum 가져오기
        // const mnum = this.$store.getters.getUserMnum;
        const mnum = this.$store.getters['authStore/getUserMnum'];
        console.log("mnum : " + mnum);

        // 백엔드에서 사용자 정보 조회
        const response = await this.axios.get(`/updateInfo/${mnum}`);
        console.log("response : " + response);

        // 응답 데이터로부터 사용자 정보 추출
        const { mname, mnic, memail, mtel } = response.data;
        console.log("response.data : " + response.data);

        // 가져온 데이터로 입력 폼 채우기
        this.mnum = mnum;
        this.mname = mname;
        this.mnic = mnic;
        this.originalMnic = mnic;
        this.memail = memail;
        this.mtel = mtel;
        this.originalMtel = mtel;
      } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다.", error);
        this.error = "사용자 정보를 불러오는 중 오류가 발생했습니다.";
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
          }
        } catch (error) {
          console.error("닉네임 중복 확인 오류:", error);
          alert("닉네임 중복 확인 중 문제가 발생했습니다.");
        }
      }
    },

    async updateUserInfo() {
      console.log("authStore/updateUserInfo Start!");
      if (!this.isNickNameChanged && !this.isTelChanged) {
        alert("수정할 내용이 없습니다.");
        return;
      }

      if (this.isNickNameChanged) {
        // 닉네임이 변경되었는지 확인 후 중복 확인
        try {
          const response = await this.axios.get(
            `/check-duplicate/mnic?mnic=${this.mnic}`
          );
          if (response.data.isDuplicate) {
            alert("이미 사용 중인 닉네임입니다.");
            return;
          }
        } catch (error) {
          console.error("닉네임 중복 확인 오류:", error);
          alert("닉네임 중복 확인 중 문제가 발생했습니다.");
          return;
        }
      }

      try {
        // 백엔드로 전송할 객체
        const userInfo = {
          mname: this.mname,
          mnic: this.mnic,
          memail: this.memail,
          mpw: this.newMpw,
          mtel: this.mtel,
        };
        await this.axios.put(`/updateInfo/${this.mnum}`, userInfo);
        // 추후 주문내역 페이지로 수정하기
        this.$router.push("/client/home");

        alert("정보가 성공적으로 업데이트 되었습니다.");
      } catch (error) {
        console.log("정보 업데이트 중 오류 발생", error);
        this.error = "닉네임 중복을 확인해주세요";
        alert("닉네임 중복을 확인해주세요");
      }
    },
    async updateAccountStatus() {
      if (
        !confirm("정말로 탈퇴하시겠습니까? 탈퇴한 계정은 복구할 수 없습니다.")
      ) {
        return;
      }
      try {
        await this.axios.put(`/updateAccountStatus/${this.mnum}`);

        this.$store.commit("authStore/setLoginStatus", false);
        this.$store.commit("authStore/setUserLevel", null);
        this.$store.commit("authStore/setUserMnum", null);
        sessionStorage.removeItem("setLoginStatus");
        sessionStorage.removeItem("userLevel");
        sessionStorage.removeItem("userMnum");

        this.$router.push("/selectMemberType");
        alert("탈퇴되었습니다. 안녕히 가세요.");
      } catch (error) {
        console.log("계정 삭제 중 오류 발생", error);
        alert("탈퇴하는 중 오류가 발생했습니다.");
      }
    },
    enableTelChange() {
      this.isTelChanged = true;
    },
    enableNickNameChange() {
      this.isNickNameChanged = true;
    },
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
.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.btn {
  margin-top: 10px;
  margin-bottom: 5px;
  margin-right: 10px;
  color: black;
  background-color: #f5beae;
  border-color: #f5beae;
}

.btn:hover {
  background-color: #f5835d;
}
</style>
