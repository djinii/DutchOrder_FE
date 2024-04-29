<template>
  <div id="pageName">
    <h2 class="text-center">공지 수정</h2>
  </div>
  <hr class="my-4" />
  <div id="notiveModify">
    <!-- 공지 제목 수정 입력 -->
    <div id="noticeModifyTitle" class="form-floating mb-3">
      <input
        type="title"
        class="form-control"
        id="floatingInput"
        v-model="notice.notitle"
        :placeholder="titlePh"
      />
      <label for="floatingInput">제목 입력(수정)</label>
    </div>
    <!-- 공지 내용 수정 입력 -->
    <div id="noticeModifyContent" class="form-floating">
      <textarea
        class="form-control"
        id="floatingTextarea2"
        v-model="notice.nocon"
        :placeholder="contentPh"
        style="height: 300px"
      ></textarea>
      <label for="floatingTextarea2">내용 입력(수정)</label>
    </div>
    <hr class="my-4" />
    <!-- 수정완료 버튼 -->
    <div class="noticeButton">
      <div v-if="message" class="alert alert-danger mt-2 error-message">
        {{ message }}
      </div>
      <button
        id="modifyComplete"
        type="submit"
        class="btn btn-primary"
        @click="update"
      >
        수정완료
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notice: {},
      titlePh: "제목을 입력하세요",
      contentPh: "내용을 입력하세요",
      message: "",
    };
  },
  mounted() {
    this.fetchNoticeModify();
  },
  methods: {
    async fetchNoticeModify() {
      try {
        // HTTP POST 요청을 통해 공지사항 세부 정보를 가져옴
        const response = await this.axios.post("/JY_A_NoticeDetails", {
          nonum: this.$route.query.nonum,
        });
        // 가져온 세부 정보를 저장
        this.notice = response.data;
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching noticeDetails:", error);
      }
    },
    async update() {
      // 제목, 내용칸이 비어있으면 해당 알림이 뜨도록 설정
      if (this.notice.notitle.trim() === "") {
        this.message = this.titlePh;
        return;
      }
      if (this.notice.nocon.trim() === "") {
        this.message = this.contentPh;
        return;
      }

      try {
        const currentTime = new Date().toISOString(); // 현재 시간
        this.notice.nodate = currentTime; // 시간 정보 업데이트

        const response = await this.axios.post("/JY_A_NoticeModify", this.notice);
        console.log(response.data);
        alert("공지가 성공적으로 수정되었습니다.");
        this.$router.push("/admin/noticeList");
      } catch (error) {
        console.error("Error fetching noticemodify:", error);
      }
    },
  },
};
</script>

{
<style>
.btn-primary {
  background-color: #f5835d;
  border-color: #ffe0c7;
}

.my-4 {
  border-color: blue;
}
</style>
}
