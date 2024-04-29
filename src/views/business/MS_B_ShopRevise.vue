<template>
  <div class="container mt-5" style="overflow-y: auto">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">가게정보 수정</h4>
        <h2>{{ shop.sname }}</h2>
        <div id="imagePreview">
          <img
            v-if="shop.simg1"
            :src="shop.simg1"
            class="rounded mx-auto d-block"
            style="max-width: 100%; max-height: 300px"
          />
        </div>
        <form class="needs-validation" @submit.prevent="submitFormTime">
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="ShopName" class="form-label">상호명:</label>
              <input
                type="text"
                class="form-control"
                id="ShopName"
                :value="shop.sname"
                readonly
                disabled
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>
            <div class="col-sm-6">
              <label for="category" class="form-label">분류:</label>
              <input
                type="text"
                class="form-control"
                id="category"
                :value="getCategoryName(shop.fcategory_mikey)"
                readonly
                disabled
              />
              <div class="invalid-feedback">Valid last name is required.</div>
            </div>

            <div class="col-12">
              <label for="time" class="form-label">운영시간</label>

              <input
                type="text"
                class="form-control"
                id="start"
                placeholder="운영시작시간"
                v-model="shop.start_time"
                required
              />
              <input
                type="text"
                class="form-control"
                id="end"
                placeholder="운영종료시간"
                v-model="shop.end_time"
                required
              />
              <div class="invalid-feedback">시간을 입력해주세요.</div>
            </div>

            <div class="form-group col-md-5">
              <label for="my_number">전화번호</label>
              <input
                type="tel"
                class="form-control"
                name="my_number"
                id="my_pnumber"
                maxlength="13"
                placeholder="전화번호"
                :value="shop.stel"
                readonly
                disabled
              />
            </div>

            <div class="col-12">
              <label for="address" class="form-label">주소</label>
              <input
                type="text"
                class="form-control"
                id="address"
                :value="shop.saddr"
                readonly
                disabled
              />
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <B_MenuPlusMD :bnum="bnum" :menus="menus" :fetchMenuList="fetchMenuList" />
            <B_MenuPluse :bnum="this.bnum" :menus="menus" :fetchMenuList="fetchMenuList" />

            <button type="submit" class="btn btn-primary">저장</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import B_MenuPluse from "@/components/business/MS_B_MenuPluse.vue";
import B_MenuPlusMD from "@/components/business/Ms_B_MenuPlusMD.vue";
import axios from "axios";

export default {
  name: "B_ShopRevise",
  components: {
    B_MenuPlusMD,
    B_MenuPluse,
  },
  data() {
    return {
      shop: [],
      mnum: null, // mnum을 초기화
      bnum: null, // bnum을 초기화
      menus: [], // 메뉴 목록을 저장할 배열 추가
    };
  },
  created() {
    this.mnum = this.getUserMnum;
    this.bnum = this.getUserBnum;
    this.fetchStoreInfo(this.mnum); // mnum을 전달
    this.fetchMenuList(); // 메뉴 목록을 받아오는 메서드 호출
  },
  computed: {
    ...mapGetters(["getUserMnum"]), // getUserMnum getter 가져오기
    ...mapGetters(["getUserBnum"]), // getUserBnum getter 가져오기
  },

  methods: {
    getCategoryName(categoryCode) {
      switch (categoryCode) {
        case 301:
          return "한식";
        case 302:
          return "중식";
        case 303:
          return "일식";
        case 304:
          return "분식";
        default:
          return "기타"; // 기타 분류 코드에 대한 처리
      }
    },
    fetchStoreInfo(mnum) {
      axios
        .get(`/B_ShopDetail?mnum=${mnum}`) // mnum 전달
        .then((response) => {
          if (response.data.length === 0) {
            // 데이터가 비어 있는 경우
            alert("가게 정보가 존재하지 않습니다. 가게를 등록해주세요!");
            // 가게 정보가 없으므로 /business/Files 페이지로 이동
            this.$router.push("/business/Files");
          } else {
            this.shop = response.data;
            this.shop.bnum = response.data.bnum; // 예시로 bnum을 shop 객체에 추가
            console.log("bnum:", this.shop.bnum);
          }
        })
        .catch((error) => {
          console.error("가게 정보 가져오기 실패:", error);
        });
    },

    async fetchMenuList() {
      try {
        const res = await axios.post("/B_MenuDetail", {
          bnum: this.bnum,
        });
        this.menus = res.data.sort(
          (a, b) => new Number(b.fnum) - new Number(a.fnum)
        );
        console.log("Menu list fetched successfully:", this.menus);
      } catch (error) {
        console.error("Error fetching menu list:", error);
      }
    },

    submitFormTime() {
      //console.log("ddbnum!!!:", this.bnum);
      const formData = {
        bnum: this.bnum,
        start_time: this.shop.start_time,
        end_time: this.shop.end_time,
      };
      axios
        .post("/business/Modify", formData)
        .then((response) => {
          if (response.data === 1) {
            console.log("가게 운영시간 수정 완료");
          } else {
            console.error("가게 수정에 오류가 생겼습니다.");
            // 오류 메시지 표시
            alert("가게 수정에 오류가 생겼습니다.");
          }
        })
        .catch((error) => {
          console.error("서버 요청 실패:", error);
          // 오류 메시지 표시
          alert("서버 요청 실패. 가게 수정에 오류가 생겼습니다.");
        });
    },
    watch: {
      // menuAdded 이벤트가 발생하면 fetchMenuList 메소드 호출
      menuAdded: "fetchMenuList",
    },
  },
};
</script>
