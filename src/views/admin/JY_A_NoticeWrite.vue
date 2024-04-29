<template>
  <div id="pageName">
    <h2 class="text-center">공지 등록</h2>
  </div>
  <hr class="my-4" />
  <div class="NoticeWrite">
    <!-- 공지 제목 입력 -->
    <div id="notiveWriteTitle" class="form-floating mb-3">
      <input
        v-model="noticeTitle"
        type="title"
        class="form-control"
        id="floatingInput"
        :placeholder="titlePh"
      />
      <label for="floatingInput">제목 입력</label>
    </div>
    <!-- 공지 내용 입력 -->
    <div id="noticeWriteContent" class="form-floating">
      <textarea
        v-model="noticeContent"
        class="form-control"
        :placeholder="contentPh"
        id="floatingTextarea2"
        style="height: 300px"
      ></textarea>
      <label for="floatingTextarea2">내용 입력</label>
    </div>
    <hr class="my-4" />
    <!-- 작성완료 버튼 -->
    <div class="noticeButton">
      <div v-if="message" class="alert alert-danger mt-2 error-message">
        {{ message }}
      </div>
      <button
        type="button"
        class="btn btn-primary"
        id="liveAlertBtn"
        @click="submitWrite"
      >
        작성완료
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeTitle: "",
      noticeContent: "",
      message: "",
      titlePh: "제목을 입력하세요",
      contentPh: "내용을 입력하세요",
    };
  },
  methods: {
    // 작성완료 클릭시 실행되는 메소드
    async submitWrite() {
      // 제목, 내용칸이 비어있으면 해당 알림이 뜨도록 설정
      if (this.noticeTitle.trim() === "") {
        this.message = this.titlePh;
        return;
      }
      if (this.noticeContent.trim() === "") {
        this.message = this.contentPh;
        return;
      }

      const currentTime = new Date(); // 현재 시간

      try {
        // 서버로 공지 작성 내용을 전송하는 코드
        const response = await this.axios.post("/JY_A_NoticeWrite", {
          // 새로운 번호가 자동으로 부여될 것이므로 nonum은 전송X
          // mnum: this.$store.state.userMnum, // 로그인한 관리자 mnum
          mnum: this.$store.state["authStore/userMnum"], // 로그인한 관리자 mnum

          notitle: this.noticeTitle,
          nocon: this.noticeContent,
          nodate: currentTime.toISOString(),
        });

        // 서버로부터 응답을 받았을 때 실행할 작업
        console.log(response.data); // 서버 응답 확인
        // 성공적으로 작성된 경우 알람이 뜸
        alert("공지가 성공적으로 작성되었습니다.");
        // 성공알람 확인후 리스트로 이동
        this.$router.push("/admin/noticeList");
      } catch (error) {
        // 에러가 발생했을 때 실행할 작업
        console.error("Error fetching noticeWrite", error);
        // 에러 메시지 표시
        alert("공지 작성에 실패했습니다.");
      }
    },
  },
};
</script>

<style>
.btn-primary {
  background-color: #f5835d;
  border-color: #ffe0c7;
}

.my-4 {
  border-color: blue;
}
</style>
