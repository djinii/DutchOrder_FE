<template>
  <div class="container mt-5">
    <!-- 사업자 -->
    <h2 class="mb-4">개인정보수정</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="Mname" class="form-label">이름</label>
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
      <input
        type="tel"
        v-model="mtel"
        class="form-control"
        id="mtel"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        required
        @input="enableTelChange"
      />
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
        :disabled="!isTelChanged"
      >
        수정하기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mnum: "",
      mname: "",
      mnic: "",
      memail: "",
      mtel: "",
      error: "",
      isTelChanged: false,
    };
  },
  async mounted() {
    await this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        // store에서 userMnum 가져오기
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
        this.memail = memail;
        this.mtel = mtel;
      } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다.", error);
        this.error = "사용자 정보를 불러오는 중 오류가 발생했습니다.";
      }
    },
    async updateUserInfo() {
      if (!this.mtel.trim()) {
        alert("연락처를 입력하세요.");
        return;
      }

      try {
        // 백엔드로 전송할 객체
        const userInfo = {
          mname: this.mname,
          mnic: this.mnic,
          memail: this.memail,
          mtel: this.mtel,
        };

        await this.axios.put(`/updateInfo/${this.mnum}`, userInfo);

        // 추후 주문내역 페이지로 수정하기
        this.$router.push("/client/home");

        alert("정보가 성공적으로 업데이트 되었습니다.");
      } catch (error) {
        console.log("정보 업데이트 중 오류 발생", error);
        this.error = " 정보 업데이트 중 오류가 발생했습니다.";
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
