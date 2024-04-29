<template>
  <div id="pageName">
    <h2 class="text-center">공지사항</h2>
  </div>
  <hr class="my-4" />
  <!-- 공지사항 리스트 -->
  <div class="noticeList">
    <div v-for="notice in listNotice" :key="notice">
      <div class="d-grid gap-2 col-10 mx-auto">
        <button
          class="btn btn-outline-dark"
          type="button"
          @click="moveDetails(notice.nonum)"
        >
          <p
            id="blind"
            class="d-inline-block text-truncate"
            style="max-width: 280px"
          >
            <strong>{{ notice.notitle }}</strong>
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      listNotice: [], // 공지사항 리스트 정보를 저장할 객체
    };
  },
  // 공지 리스트 마운트
  mounted() {
    this.fetchNoticeList();
  },
  methods: {
    async fetchNoticeList() {
      try {
        const response = await this.axios.post("/JY_C_NoticeList", {});
        this.listNotice = response.data.map((notice) => {
          // 날짜 데이터를 올바른 포맷으로 수정
          notice.nodate = this.formatDate(notice.nodate);
          return notice;
        });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching noticeList:", error);
      }
    },
    async moveDetails(nonum) {
      try {
        // 라우터를 사용하여 페이지 이동
        this.$router.push({ path: "/client/noticeDetails", query: { nonum } });
      } catch (error) {
        console.error("Error fetching noticeDetails:", error);
      }
    },

    formatDate(nodate) {
      if (!nodate) return ""; // date 값이 없는 경우 빈 문자열 반환

      const d = new Date(nodate);
      if (isNaN(d.getTime())) return ""; // 유효하지 않은 날짜인 경우 빈 문자열 반환

      // ISO 형식으로 변환한 날짜를 시간과 분까지만 포맷
      return `${d.toISOString().slice(0, 16).replace("T", " ")}`;
    },
  },
};
</script>

<style>
.btn-outline-dark {
  margin-top: 10px;
  height: 100px;
  border-color: #f5835d;
}

#blind {
  line-height: 90px;
}

.my-4 {
  border-color: blue;
}
</style>
