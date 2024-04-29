<template>
  <div id="pageName">
    <h2 class="text-center">리뷰답글</h2>
  </div>
  <hr class="my-4" />
  <!-- 클라이언트의 리뷰 보기 -->
  <div id="reviewContent" class="card text-center">
    <div class="card-header">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-star-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
        />
      </svg>
      : {{ review.rstar }} {{ review.mnic }} 님
    </div>
    <div class="card-body">
      <div id="imagePreview">
        <img
          v-if="review.rimg"
          :src="review.rimg"
          class="rounded mx-auto d-block"
          style="max-width: 100%; max-height: 300px"
        />
      </div>
      <p class="card-text">{{ review.rcontent }}</p>
    </div>
    <div class="card-footer text-body-secondary">
      {{ review.strRdate }}
    </div>
  </div>
  <hr class="my-4" />
  <!-- 답글 입력란 -->
  <div v-if="review.rstatus_mikey === 1001" class="form-floating">
    <textarea
      v-model="review.rcomment"
      class="form-control"
      :placeholder="contentPh"
      id="floatingTextarea2"
      style="height: 300px"
    ></textarea>
    <label for="floatingTextarea2">답글 입력</label>
  </div>
  <!-- 답글 표시 -->
  <div v-else>
    <div>
      <h3 class="text-center">내가 작성한 답변</h3>
    </div>
    <hr class="my-4" />
    <div id="myComment" class="card text-center">
      <div class="card-body">
        <p class="card-text">{{ review.rcomment }}</p>
      </div>
    </div>
  </div>
  <hr class="my-4" />
  <!-- 버튼 -->
  <div v-if="review.rstatus_mikey === 1001" class="reviewButton">
    <div v-if="message" class="alert alert-danger mt-2 error-message">
      {{ message }}
    </div>
    <button
      id="liveAlertBtn"
      class="btn btn-primary"
      @click="submitWriteComment"
    >
      답글작성완료
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      review: {}, // 리뷰 세부 정보를 저장할 객체
      message: "",
      contentPh: "답글을 입력하세요",
    };
  },
  // 리뷰 세부사항 마운트
  mounted() {
    this.fetchReviewComment();
  },
  methods: {
    async fetchReviewComment() {
      try {
        // HTTP POST 요청을 통해 리뷰 세부 정보를 가져옴
        const response = await this.axios.post("/JY_B_ReviewComment", {
          rnum: this.$route.query.rnum,
        });
        // 가져온 세부 정보를 저장
        this.review = response.data;
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching reviewComment:", error);
      }
    },

    async submitWriteComment() {
      // 답글칸이 비어있으면 해당 알림이 뜨도록 설정
      if (this.review.rcomment.trim() === "") {
        this.message = this.contentPh;
        return;
      }
      try {
        // rstatus_mikey가 답글작성 완료를 나타내는 분류인 1002로 변경
        this.review.rstatus_mikey = 1002;
        // 서버로 답글 작성 내용을 전송하는 코드
        const response = await this.axios.post("/JY_B_CommentWrite", this.review);
        // 서버로부터 응답을 받았을 때 실행할 작업
        console.log(response.data); // 서버 응답 확인
        // 성공적으로 작성된 경우 알람이 뜸
        alert("답글이 성공적으로 작성되었습니다.");
        // 성공알람 확인후 리스트로 이동
        this.$router.push("/business/reviewList");
      } catch (error) {
        // 에러가 발생했을 때 실행할 작업
        console.error("Error fetching reviewCommentWrite", error);
        // 에러 메시지 표시
        alert("답글 작성에 실패했습니다.");
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

.text-center {
  border-color: #f5835d;
}

.bi-star-fill {
  color: #f5835d;
}
.my-4 {
  border-color: blue;
}
#myComment {
  border: none;
}
</style>
