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
  <!-- 공지 삭제버튼과 수정버튼 -->
  <div class="noticeButton">
    <!-- 삭제버튼을 누르면 상단에 재확인 모달이 뜨고 설정한 비밀번호를 입력해야 삭제가능 -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      공지사항 삭제하기
    </button>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              공지사항을 정말 삭제하시겠습니까?
            </h1>
          </div>
          <!-- <div class="modal-body">
                      비밀번호를 입력해주세요 -후에 구현예정
                  </div> -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="deleteNotice(notice.nonum)"
            >
              삭제
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 공지사항 수정으로 이동하는 버튼 -->
    <button
      id="noticeModify"
      type="button"
      class="btn btn-primary"
      @click="moveModify(notice.nonum)"
    >
      공지사항 수정하기
    </button>
  </div>
</template>

<script>
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
        const response = await this.axios.post("/JY_A_NoticeDetails", {
          nonum: this.$route.query.nonum,
        });
        // 가져온 세부 정보를 저장
        this.notice = response.data;
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching notice details:", error);
      }
    },

    // 공지 수정페이지로 이동
    async moveModify(nonum) {
      try {
        // 라우터를 사용하여 페이지 이동
        this.$router.push({ path: "/admin/noticeModify", query: { nonum } });
      } catch (error) {
        console.error("Error fetching noticeDetails:", error);
      }
    },

    // 공지사항 삭제 메소드
    async deleteNotice(nonum) {
      try {
        // HTTP POST 요청을 통해 공지사항을 삭제하는 메서드 호출
        const response = await this.axios.post("/JY_A_NoticeDelete", { nonum });
        // 서버로부터 받은 응답을 처리
        const deleteCount = response.data;
        console.log("Response:", response.data);
        if (deleteCount > 0) {
          // 삭제된 공지사항이 있을 경우
          alert("공지사항이 성공적으로 삭제되었습니다.");
          // 삭제 후 공지사항 목록 페이지로 이동
          this.$router.push("/admin/noticeList");
        } else {
          // 삭제된 공지사항이 없을 경우
          alert("공지사항 삭제에 실패했습니다.");
          console.log(deleteCount);
        }
      } catch (error) {
        console.error("Error deleting notice:", error);
        alert("공지사항 삭제 중 오류가 발생했습니다.");
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
