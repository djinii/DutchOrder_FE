<template>
  <div class="container" style="overflow-y: auto">
    <div class="row">
      <div
        v-for="(order, index) in filteredOrders"
        :key="index"
        class="col mb-3"
      >
        <div class="card mt-3">
          <div class="card-header">주문 정보</div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <strong>메뉴명:</strong> {{ order.fname }}
              </li>
              <li class="list-group-item">
                <strong>주문일시:</strong> {{ formatDate(order.odate) }}
              </li>
              <li class="list-group-item">
                <strong>주문일련번호:</strong> {{ order.osnum }}
              </li>
              <li class="list-group-item">
                <strong>주소:</strong> {{ order.oaddr }}
              </li>
            </ul>
          </div>
          <div class="card-footer">
            <button
              v-if="order.ostatus_mikey === 802"
              @click="setOstatusMikey(order)"
              class="btn btn-primary"
            >
              확인
            </button>
            <button
              v-if="order.ostatus_mikey === 803"
              @click="setOstatusMikey(order)"
              class="btn btn-success"
            >
              조리중
            </button>
            <button
              v-if="order.ostatus_mikey === 804"
              @click="setOstatusMikey(order)"
              class="btn btn-warning"
            >
              배달시작
            </button>
            <button
              v-if="order.ostatus_mikey === 805"
              @click="setOstatusMikey(order)"
              class="btn btn-info"
            >
              배달완료
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "B_OrdSpecCard",
  props: ["orderList", "orderStatus", "bnum"],
  computed: {
    filteredOrders() {
      if (!this.orderList || this.orderList.length === 0) {
        return [];
      }
      return this.orderList.filter((order) => {
        return order.ostatus_mikey === this.orderStatus;
      });
    },
  },
  methods: {
    formatDate(date) {
      const formattedDate = new Date(date);
      return formattedDate.toLocaleString();
    },

    async setOstatusMikey(order) {
      try {
        let newStatus;
        if (order.ostatus_mikey === 803) {
          newStatus = 804;
        } else if (order.ostatus_mikey === 804) {
          newStatus = 805;
        } else {
          newStatus = 803;
        }

        console.log("New Status:", newStatus);
        console.log("osnum:", order.osnum);
        console.log("mnum:", order.mnum);

        const response = await axios.post("/OrderStatusUpdate", {
          mnum: order.mnum,
          ostatus_mikey: newStatus,
        });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error updating ostatus_mikey:", error);
      }
    },
  },
};
</script>

<style scoped>
.card {
  width: 18rem;
  margin-top: 10px;
}
.card-header {
  background-color: #f5835d;
  color: #fff;
}
.list-group-item {
  background-color: #f8f9fa;
}
.card-footer {
  background-color: #f8f9fa;
}
.col.mb-3 {
  margin-right: 20px; /* 이 부분을 조절하여 원하는 간격으로 수정할 수 있습니다. */
}
</style>
