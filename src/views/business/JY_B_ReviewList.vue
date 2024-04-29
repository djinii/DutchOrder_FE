<template>
  <div id="pageName">
    <h2 class="text-center">리뷰목록</h2>
  </div>
  <hr class="my-4" />
  <!-- 작성별 드롭다운 -->
  <div id="answerSort" class="dropdown dropend">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ sortStatusText }}
    </button>
    <ul class="dropdown-menu">
      <li>
        <a
          id="writeComplete"
          class="dropdown-item"
          @click="filterByStatus(1001)"
          >작성 미완료</a
        >
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li>
        <a
          id="writeIncomplete"
          class="dropdown-item"
          @click="filterByStatus(1002)"
          >작성 완료</a
        >
      </li>
    </ul>
  </div>
  <!-- 시간별 드롭다운 -->
  <div id="timeSort" class="dropdown dropend">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ sortTimeText }}
    </button>
    <ul class="dropdown-menu">
      <li>
        <a id="newest" class="dropdown-item" @click="sortNewest">최신순</a>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li>
        <a id="oldest" class="dropdown-item" @click="sortOldest">오래된순</a>
      </li>
    </ul>
  </div>
  <hr class="my-4" />
  <!-- 리뷰 리스트 -->
  <div class="reviewList">
    <div v-for="review in filteredReviewList" :key="review">
      <div class="d-grid gap-2 col-10 mx-auto">
        <button
          class="btn btn-outline-dark"
          type="button"
          @click="moveComment(review.rnum)"
        >
          <p class="text-start">{{ review.strRdate }}</p>
          <span class="d-inline-block text-truncate" style="max-width: 200px">
            <strong>{{ review.rcontent }}</strong>
          </span>
          <p class="text-end">
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
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      listReview: [], // 리뷰 리스트 정보를 저장할 객체
      sortTimeText: "시간별 정렬",
      sortStatusText: "작성별 정렬",
    };
  },
  // 리뷰 리스트 마운트
  mounted() {
    this.fetchReviewList();
  },
  computed: {
    filteredReviewList() {
      if (this.sortStatusText === "작성 완료") {
        console.log(this.listReview);
        return this.listReview.filter(
          (review) => review.rstatus_mikey === 1002
        );
      } else if (this.sortStatusText === "작성 미완료") {
        console.log(this.listReview);
        return this.listReview.filter(
          (review) => review.rstatus_mikey === 1001
        );
      } else {
        console.log("computed: ", this.listReview);
        return this.listReview;
      }
    },
  },
  methods: {
    async fetchReviewList() {
      try {
        const response = await this.axios.post("/JY_B_ReviewList", {
          // bnum: this.$store.state.userBnum
          bnum: this.$store.state["authStore/userBnum"]
        });
        this.listReview = response.data
          .map((review) => {
            // 날짜 데이터를 올바른 포맷으로 수정
            review.rdate = this.formatDate(review.rdate);
            return review;
          });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching reviewList:", error);
      }
    },
    async moveComment(rnum) {
      try {
        // 라우터를 사용하여 페이지 이동
        this.$router.push({ path: "/business/reviewComment", query: { rnum } });
      } catch (error) {
        console.error("Error fetching reviewComment:", error);
      }
    },

    formatDate(rdate) {
      if (!rdate) return ""; // date 값이 없는 경우 빈 문자열 반환

      const d = new Date(rdate);
      if (isNaN(d.getTime())) return ""; // 유효하지 않은 날짜인 경우 빈 문자열 반환

      // ISO 형식으로 변환한 날짜를 시간과 분까지만 포맷
      return `${d.toISOString().slice(0, 16).replace("T", " ")}`;
    },

    filterByStatus(status) {
      if (status === 1002) {
        this.sortStatusText = "작성 완료";
      } else if (status === 1001) {
        this.sortStatusText = "작성 미완료";
      }
    },

    sortNewest() {
      // rdate를 기준으로 최신순으로 정렬
      this.listReview.sort((a, b) => new Date(b.rdate) - new Date(a.rdate));
      this.sortTimeText = "최신순"; // 버튼 텍스트 변경
      console.log(this.listReview);
    },
    sortOldest() {
      // rdate를 기준으로 오래된순으로 정렬
      this.listReview.sort((a, b) => new Date(a.rdate) - new Date(b.rdate));
      this.sortTimeText = "오래된순"; // 버튼 텍스트 변경
      console.log(this.listReview);
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

.btn-primary {
  background-color: #f5835d;
  border-color: #ffe0c7;
}

.dropdown-menu {
  border-color: #f5835d;
}

.dropdown-divider {
  border-color: #f5835d;
}

.bi-star-fill {
  color: #f5835d;
}

.my-4 {
  border-color: blue;
}
</style>
