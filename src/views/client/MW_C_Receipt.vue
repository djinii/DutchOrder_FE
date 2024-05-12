<template>
    <div class="container mt-4">
      <h2 class="mb-4">주문 내역</h2>
      <div class="list-group">
        <router-link
          v-for="order in orders"
          :key="order.id"
          :to="{ name: 'OrderDetail', params: { onum: order.onum } }"
          class="list-group-item list-group-item-action"
        >
          <div class="d-flex justify-content-start align-items-start flex-column">
            <h5 class="mb-1 text-center">상호명: {{ order.sname }}</h5>
            <p class="mb-1">주문 번호: {{ order.onum }}</p>
            <p class="mb-1">요청사항: {{ order.omsg }}</p>
            <p class="mb-1">주문날짜: {{ formatDate(order.odate) }}</p>
            <p class="mb-1">주문상태: {{ order.keyvalue }}</p>
          </div>
          <!-- 주문에 대한 추가 정보 표시 -->
        </router-link>
      </div>
    </div>
  </template>
  
  <script> 
  import { ref, onMounted } from 'vue';  
  export default {
    name: 'OrderList',
    computed:{
      userMnum() {
      return this.$store.getters['authStore/getUserMnum'];
      }
    }, 
    setup() {
      const orders = ref([]);
  
      // 주문 목록을 가져오는 비동기 함수를 정의합니다.
      const fetchOrders = async () => {
        try {
          const response = await this.axios.post('/api/ordering', {
            mnum: this.userMnum
          });
          // 가져온 데이터를 orders 변수에 할당합니다.
          orders.value = response.data;
          console.log(orders.value);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
  
      // 컴포넌트가 마운트된 후에 주문 목록을 가져오도록 합니다.
      onMounted(fetchOrders);
  
      // orders와 fetchOrders 함수를 반환합니다.
      return { orders, fetchOrders };
    },
    methods: {
      // 주문 날짜를 원하는 형식으로 변환하는 메서드
      formatDate(dateString) {
        // 'T'를 공백으로 대체하여 문자열을 자릅니다.
        const date = new Date(dateString.replace('T', ' '));
        // 필요한 형식에 맞게 Date 객체를 변환합니다.
        return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Additional styling can be added here if needed */
  </style>