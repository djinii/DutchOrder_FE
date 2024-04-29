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
        <a id="writeComplete" class="dropdown-item" @click="filterByStatus(0)"
          >작성 미완료</a
        >
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li>
        <a id="writeIncomplete" class="dropdown-item" @click="filterByStatus(1)"
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
  <!-- 가게, 주문목록 보기 (ostatus_mikey가 805일때만) -->
  <div class="shopInfo" v-for="ordering in filteredShopList" :key="ordering">
    <div v-if="ordering.ostatus_mikey === 805">
      <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              :src="ordering.simg1"
              class="rounded mx-auto d-block"
              style="max-width: 100%; max-height: 300px"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-text">
                <small class="text-body-secondary">{{
                  ordering.strOdate
                }}</small>
              </p>
              <h5 class="card-title">
                <strong>{{ ordering.sname }}</strong>
              </h5>
              <button
                v-if="ordering.rnum > 0"
                class="btn btn-secondary"
                type="button"
                @click="moveMyReview(ordering.rnum)"
              >
                작성한 리뷰 보기
              </button>
              <button
                v-else
                class="btn btn-primary"
                type="button"
                @click="moveWrite(ordering.onum)"
              >
                리뷰 작성하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      shopList: [], // 가게 리스트 정보를 저장할 객체
      sortTimeText: "시간별 정렬",
      sortStatusText: "작성별 정렬",
    };
  },
  // 리뷰 리스트 마운트
  mounted() {
    this.fetchShopList();
  },
  computed: {
    filteredShopList() {
      if (this.sortStatusText === "작성 완료") {
        console.log(this.shopList);
        // rnum 값이 있으면 작성완료
        return this.shopList.filter((ordering) => ordering.rnum > 0);
      } else if (this.sortStatusText === "작성 미완료") {
        console.log(this.shopList);
        // rnum 값이 없으면 작성미완료
        return this.shopList.filter((ordering) => ordering.rnum === 0);
      } else {
        console.log("computed: ", this.shopList);
        return this.shopList;
      }
    },
  },
  methods: {
    async fetchShopList() {
      try {
        const response = await this.axios.post("/JY_C_ReviewList", {
          mnum: this.$store.state.userMnum
        });
        this.shopList = response.data
          .map((ordering) => {
            // 날짜 데이터를 올바른 포맷으로 수정
            ordering.odate = this.formatDate(ordering.odate);
            // simg1 필드가 있는지 확인하고, 없으면 빈 문자열로 설정
            ordering.simg1 = ordering.simg1 ? ordering.simg1 : "";
            return ordering;
          });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching shopList:", error);
      }
    },
    async moveWrite(onum) {
      try {
        // 라우터를 사용하여 페이지 이동
        this.$router.push({ path: "/client/reviewWrite", query: { onum } });
      } catch (error) {
        console.error("Error fetching reviewWrite:", error);
      }
    },

    async moveMyReview(rnum) {
      try {
        // 라우터를 사용하여 페이지 이동
        this.$router.push({ path: "/client/myReview", query: { rnum } });
      } catch (error) {
        console.error("Error fetching reviewWrite:", error);
      }
    },

    formatDate(odate) {
      if (!odate) return ""; // date 값이 없는 경우 빈 문자열 반환

      const d = new Date(odate);
      if (isNaN(d.getTime())) return ""; // 유효하지 않은 날짜인 경우 빈 문자열 반환

      // ISO 형식으로 변환한 날짜를 시간과 분까지만 포맷
      return `${d.toISOString().slice(0, 16).replace("T", " ")}`;
    },

    filterByStatus(status) {
      if (status === 1) {
        this.sortStatusText = "작성 완료";
      } else if (status === 0) {
        this.sortStatusText = "작성 미완료";
      }
    },

    sortNewest() {
      // rdate를 기준으로 최신순으로 정렬
      this.shopList.sort((a, b) => new Date(b.odate) - new Date(a.odate));
      this.sortTimeText = "최신순"; // 버튼 텍스트 변경
      console.log(this.shopList);
    },
    sortOldest() {
      // rdate를 기준으로 오래된순으로 정렬
      this.shopList.sort((a, b) => new Date(a.odate) - new Date(b.odate));
      this.sortTimeText = "오래된순"; // 버튼 텍스트 변경
      console.log(this.shopList);
    },
  },
};
</script>

<style>
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

.mb-3 {
  border-color: #f5835d;
}

.my-4 {
  border-color: blue;
}
</style>
