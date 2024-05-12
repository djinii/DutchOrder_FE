<template>
  <div class="container mt-5">
    <h2 class="mb-4">가게 등록</h2>
    <div v-if="shouldShowFileRegistrationSection" class="alert alert-info">
      <B_ShopReg :mnum="getUserMnum" />
    </div>
    <div
      v-else-if="shopStatus && shopStatus.bstaus_mikey === 501"
      class="alert alert-info"
    >
      가게 등록 승인 중입니다.
    </div>
    <div
      v-else-if="shopStatus && shopStatus.bstaus_mikey === 502"
      class="alert alert-success"
    >
      가게 등록이 승인 되었습니다.
    </div>
    <B_FileInsert
      v-if="shouldShowFileInsertSection"
      :mnum="getUserMnum"
      :bnum="getUserBnum"
    />
  </div>
</template>

<script>
import axios from "axios";
// import { mapGetters } from "vuex";
import B_ShopReg from "@/components/business/MS_B_ShopReg.vue";
import B_FileInsert from "@/components/business/MS_B_FileInsert.vue";

export default {
  name: "B_Files",

  components: {
    B_ShopReg,
    B_FileInsert,
  },

  data() {
    return {
      shopStatus: {},
      bFiles: {},
    };
  },

  mounted() {
    this.fetchData();
    console.log("User Mnum:", this.getUserMnum); // userMnum 값을 확인하기 위해 로그 출력
    console.log("User Bnum:", this.getUserBnum);
  },

  computed: {
    //...mapGetters(["authStore/getUserMnum", "authStore/getUserBnum"]), // Vuex 스토어의 userMnum 게터를 가져옴
    getUserMnum(){
      return this.$store.getters['authStore/getUserMnum']
    },
    getUserBnum(){
      return this.$store.getters['authStore/getUserBnum']

    },
    shouldShowFileRegistrationSection() {
      return (
        !this.shopStatus || !this.shopStatus.bstaus_mikey || !this.getUserMnum
      );
    },
    shouldShowFileInsertSection() {
      return !this.bFiles || !this.bFiles.bfnum;
    },
  },

  methods: {
    async fetchData() {
      try {
        const userMnum = this.getUserMnum; // Vuex 스토어에서 userMnum 값을 가져옴
        console.log("userMnum -> ", this.getUserMnum)
        const [shopStatusResponse, bFilesResponse] = await Promise.all([
          axios.post("/ShopAcceptStatus", { mnum: userMnum }), // 사용자의 mnum을 userMnum으로 전달
          axios.post("/BFileDetail", { mnum: userMnum }),
        ]);

        this.shopStatus = shopStatusResponse.data;
        this.bFiles = bFilesResponse.data;

        console.log("상태:", this.shopStatus);
        console.log("파일 상태:", this.bFiles.bfnum);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  margin-top: 10px;
}
</style>
