<template>
  <hr class="my-4" />
  <!-- 공지 제목 보여주는칸 -->
  <div id="noticeTitle" class="card text-center">
    <div class="card-body">
      <h3 class="card-text">{{ notice.notitle }}</h3>
    </div>
  </div>
  <!-- 공지게시 시간 보여주는칸 -->
  <div id="noticeDate">
    <p class="text-center">{{ notice.strNodate }}</p>
  </div>
  <hr class="my-4" />
  <!-- 공지 내용 보여주는칸 -->
  <div id="noticeContent" class="card text-center">
    <div class="card-body">
      <p class="card-text">{{ notice.nocon }}</p>
    </div>
  </div>
  <hr class="my-4" />
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      notice: {}, // 공지사항 세부 정보를 저장할 객체
    };
  },
  // 공지 세부사항 마운트
  mounted() {
    this.fetchNoticeDetails();
  },
  methods: {
    async fetchNoticeDetails() {
      try {
        // HTTP POST 요청을 통해 공지사항 세부 정보를 가져옴
        const response = await this.axios.post("/JY_C_NoticeDetails", {
          nonum: this.$route.query.nonum,
        });
        // 가져온 세부 정보를 저장
        this.notice = response.data;
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching notice details:", error);
      }
    },
  },
};
</script>

<style>
#noticeTitle {
  border: none;
}

#noticeContent {
  border: none;
}

.my-4 {
  border-color: blue;
}
</style>
