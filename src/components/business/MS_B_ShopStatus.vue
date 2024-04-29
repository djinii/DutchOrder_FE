<template>
  <div style="position: absolute; top: 10px; right: 10px">
    <button
      v-if="sstatus_mikey === 401"
      @click="confirmShopClosure(402, '영업을 종료하시겠습니까?')"
      class="status-button"
      style="background-color: #f44336"
    >
      운영종료하기
    </button>
    <button
      v-if="sstatus_mikey === 402"
      @click="confirmShopClosure(401, '영업을 시작하시겠습니까?')"
      class="status-button"
    >
      운영시작하기
    </button>
    <!-- 영업 중지 문구 -->
    <div
      v-if="sstatus_mikey === 402"
      class="alert alert-warning"
      role="alert"
      style="
        right: 230px;
        margin-top: -50px;
        background-color: #f44336;
        color: white;
      "
    >
      영업이 중지되었습니다.
    </div>
    <!-- <span v-if="sstatus_mikey === 402">(영업종료)</span> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "B_ShopStatus",
  props: ["bnum"],
  data() {
    return {
      sstatus_mikey: null,
    };
  },
  created() {
    this.fetchShopStatus();
  },
  methods: {
    async fetchShopStatus() {
      try {
        const response = await axios.post("/ShopStatus", {
          bnum: this.bnum, // bnum을 서버로 전달합니다.
        });

        this.sstatus_mikey = response.data.sstatus_mikey;
        console.log("Shop Status Response:", response.data);
      } catch (error) {
        console.error("운영 상태 값을 가져오는 중 오류 발생:", error);
      }
    },
    async confirmShopClosure(newStatus, message) {
      if (confirm(message)) {
        console.log("새로운 상태:", newStatus);
        try {
          const response = await axios.post("/ShopStatusUpdate", {
            sstatus_mikey: newStatus,
            bnum: this.bnum,
          });
          const updatedStatus = response.data.sstatus_mikey;
          console.log("setStatusMikey Response:", updatedStatus);
          this.fetchShopStatus();
        } catch (error) {
          console.error("운영 상태 값을 업데이트하는 중 오류 발생:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.status-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
}

.status-button:hover {
  background-color: #45a049;
}

.status-button:active {
  background-color: #3e8e41;
}
</style>