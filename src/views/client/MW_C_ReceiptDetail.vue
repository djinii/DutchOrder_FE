<template>
    <div class="container mt-4" v-if="order">
      <h2 class="mb-4">주문 상세 내역</h2>
      <div class="card mb-3" v-for="(item, index) in order" :key="index">
        <div class="card-body">
          <h5 class="card-title">{{ index+1 }}. {{ item.fname }}</h5>
          <p class="card-text">
            <span>수량: {{ item.fcount }}</span
            >&nbsp; <span>옵션: {{ item.keyvalue }}</span
            >&nbsp;&nbsp;
            <span>가격: {{ item.osprice }}</span>
          </p>
        </div>
      </div>
      <p style="text-align: right;">총금액: {{ totalAmount() }}</p> <!-- totalAmount 함수 호출 -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  // import axios from "axios";
  
  export default {
    name: "OrderDetail",
    props: ["onum"],
    setup(props) {
      const order = ref(null);
  
      const fetchOrderDetail = async () => {
        try {
          console.log(props.onum);
          const response = await this.axios.post("/api/orderspec", {
            onum: props.onum,
          });
          order.value = response.data;
          console.log(order.value);
        } catch (error) {
          console.error("Error fetching order detail:", error);
        }
      };
  
      onMounted(fetchOrderDetail);
  
      // totalAmount 함수 정의
      const totalAmount = () => {
        if (!order.value) return 0; // 주문이 없는 경우 0 반환
        let sum = 0;
        order.value.forEach(item => {
          sum += parseFloat(item.osprice);
        });
        return sum;
      };
  
      return { order, totalAmount };
    }
  };
  </script>
  
  <style>
  .card-text span {
    display: inline-block;
    margin-right: 20px; /* 적당한 간격을 조절합니다. */
  }
  </style>
  