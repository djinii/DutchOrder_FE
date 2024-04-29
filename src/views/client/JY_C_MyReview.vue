<template>
  <div id="pageName">
    <h2 class="text-center">내가쓴 리뷰</h2>
  </div>
  <hr class="my-4" />
  <!-- 나의 리뷰 보기 -->
  <div id="reviewContent" class="card text-center">
    <div class="card-header">
      별점 : {{ review.rstar }} {{ review.mnic }} 님
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
  <!-- 사장의 답글 보기 -->
  <div>
    <h3 class="text-center">사장님의 답변</h3>
  </div>
  <hr class="my-4" />
  <div id="onerComment" class="card text-center">
    <div class="card-body">
      <p v-if="review.rcomment === null" class="card-text text-body-secondary">
        아직 답변이 달리지 않았어요
      </p>
      <p v-else class="card-text">{{ review.rcomment }}</p>
    </div>
  </div>
  <hr class="my-4" />
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      review: {}, // 리뷰 세부 정보를 저장할 객체
    };
  },
  // 리뷰 세부사항 마운트
  mounted() {
    this.fetchMyReview();
  },
  methods: {
    async fetchMyReview() {
      try {
        // HTTP POST 요청을 통해 리뷰 세부 정보를 가져옴
        const response = await this.axios.post("/JY_C_MyReview", {
          rnum: this.$route.query.rnum,
        });
        // 가져온 세부 정보를 저장
        this.review = response.data;
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching reviewComment:", error);
      }
    },
  },
};
</script>

<style>
.text-center {
  border-color: #f5835d;
}

#onerComment {
  border: none;
}

.my-4 {
  border-color: blue;
}
</style>
