<template>
  <div id="pageName">
    <h2 class="text-center">리뷰작성</h2>
  </div>
  <hr class="my-4" />
  <!-- 가게 점수주기 -->
  <div
    id="starRating"
    class="btn-group"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="btnradio1"
      autocomplete="off"
      @click="selectRating(1)"
    />
    <label class="btn btn-outline-primary" for="btnradio1">1</label>

    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="btnradio2"
      autocomplete="off"
      @click="selectRating(2)"
    />
    <label class="btn btn-outline-primary" for="btnradio2">2</label>

    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="btnradio3"
      autocomplete="off"
      @click="selectRating(3)"
    />
    <label class="btn btn-outline-primary" for="btnradio3">3</label>

    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="btnradio4"
      autocomplete="off"
      @click="selectRating(4)"
    />
    <label class="btn btn-outline-primary" for="btnradio4">4</label>

    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="btnradio5"
      autocomplete="off"
      @click="selectRating(5)"
    />
    <label class="btn btn-outline-primary" for="btnradio5">5</label>
  </div>
  <h2>
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
    : {{ myRating }}
  </h2>
  <hr class="my-4" />
  <!-- 리뷰 사진 첨부 -->
  <div id="reviewImg" class="custom-file">
    <input id="customFile" type="file" ref="image" @change="upload" />
    <label class="custom-file-label" for="customFile">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        class="bi bi-card-image"
        viewBox="0 0 16 16"
      >
        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        <path
          d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"
        />
      </svg>
    </label>
  </div>
  <br />
  <!-- 이미지 미리보기 -->
  <div id="imagePreview">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      class="rounded mx-auto d-block"
      style="max-width: 100%; max-height: 300px"
    />
  </div>
  <!-- 리뷰 입력란 -->
  <div id="reviewWrite" class="form-floating">
    <textarea
      v-model="reviewContent"
      class="form-control"
      :placeholder="contentPh"
      id="floatingTextarea2"
      style="height: 300px"
    ></textarea>
    <label for="floatingTextarea2">리뷰 입력</label>
  </div>
  <hr class="my-4" />
  <!-- 버튼 -->
  <div class="reviewButton">
    <div v-if="message" class="alert alert-danger mt-2 error-message">
      {{ message }}
    </div>
    <button
      id="liveAlertBtn"
      class="btn btn-primary"
      @click="submitReviewWrite"
    >
      리뷰작성완료
    </button>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      info: {},
      reviewContent: "",
      myRating: "",
      image: null,
      imageUrl: null,
      message: "",
      ratingPh: "별점을 주세요",
      contentPh: "내용을 입력하세요",
    };
  },
  mounted() {
    this.fetchWrtieInfo();
  },
  methods: {
    async fetchWrtieInfo() {
      try {
        // HTTP POST 요청을 통해 리뷰 세부 정보를 가져옴
        const response = await this.axios.post("/JY_C_WriteInfo", {
          onum: this.$route.query.onum,
        });
        // 가져온 세부 정보를 저장
        this.info = response.data;
        this.mnum = this.info.mnum; // mnum 할당
        this.bnum = this.info.bnum; // bnum 할당
        this.onum = this.info.onum; // onum 할당
        console.log("kkk Response:", response.data);
      } catch (error) {
        console.error("Error fetching writeInfo:", error);
      }
    },
    // 사진 변환 메소드 (base64 형식: 데이터를 텍스트 형식으로 변환하는 인코딩 방식{데이터 크기가 증가함})
    async upload() {
      // 사용자가 선택한 이미지 파일을 가져옴
      this.image = this.$refs.image.files[0];
      console.log(this.image);

      // 만약 이미지가 선택되지 않은 경우에는 처리를 종료
      if (!this.image) return;

      // 객체를 생성, 이 객체를 사용하여 파일을 읽을 수 있음
      const reader = new FileReader();
      // 파일을 성공적으로 읽었을 때 발생하는 이벤트
      reader.onload = (e) => {
        // 이미지 파일이 읽혔을 때 발생하는 onload 이벤트 핸들러에서
        // `e.target.result`를 사용하여 데이터 URL을 가져와 this.imageUrl 변수에 할당
        this.imageUrl = e.target.result;
      };
      // FileReader 객체를 사용하여 이미지 파일을 데이터 URL로 읽어들임
      // 데이터 URL은 파일을 텍스트 형식으로 인코딩한 문자열
      reader.readAsDataURL(this.image);
    },

    // 작성완료 클릭시 실행되는 메소드
    async submitReviewWrite() {
      // 별점, 내용칸이 비어있으면 해당 알림이 뜨도록 설정
      if (!this.myRating) {
        this.message = this.ratingPh;
        return;
      }
      if (this.reviewContent.trim() === "") {
        this.message = this.contentPh;
        return;
      }

      try {
        const currentTime = new Date(); // 현재 시간
        const reviewData = {
          onum: this.onum,
          mnum: this.mnum,
          bnum: this.bnum,
          rcontent: this.reviewContent,
          rstar: this.myRating,
          rdate: currentTime.toISOString(),
          rstatus_makey: 1000,
          rstatus_mikey: 1001,
          rcomment: null,
        };
        // 이미지가 존재하는 경우에만 이미지 URL 추가
        if (this.imageUrl) {
          reviewData.rimg = this.imageUrl;
        }
        console.log("reviewData->" + reviewData); // 서버 응답 확인

        const response = await this.$axios.post("/JY_C_ReviewWrite", reviewData);

        // 서버로부터 응답을 받았을 때 실행할 작업
        console.log(response.data); // 서버 응답 확인
        // 성공적으로 작성된 경우 알람이 뜸
        alert("리뷰가 성공적으로 작성되었습니다.");
        // 성공알람 확인후 리스트로 이동
        this.$router.push("/client/reviewList");
      } catch (error) {
        // 에러가 발생했을 때 실행할 작업
        console.error("Error fetching reviewWrite", error);
        // 에러 메시지 표시
        alert("리뷰 작성에 실패했습니다.");
      }
    },
    selectRating(score) {
      this.myRating = score;
    },
  },
};
</script>

<style>
.btn-primary {
  background-color: #f5835d;
  border-color: #ffe0c7;
}

.bi-star-fill {
  color: #f5835d;
}

.bi-card-image {
  color: #f5835d;
  margin: auto;
}

#customFile {
  display: none;
}

.my-4 {
  border-color: blue;
}
</style>
