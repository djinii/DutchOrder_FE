<template>
    <div class="container" style="overflow-y: auto">
      <div class="row">
        <div v-for="(order, index) in orderList" :key="index" class="col-4 mb-3">
          <div class="card mt-3">
            <div class="card">
              <div
                class="card-header"
                style="background-color: #f5835d; color: #fff"
              >
                주문 정보
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <strong>메뉴명:</strong> {{ order.fname }}
                </li>
                <li class="list-group-item">
                  <strong>주문일시:</strong> {{ formatDate(order.odate) }}
                </li>
                <li class="list-group-item">
                  <strong>주문번호:</strong> {{ order.osnum }}
                </li>
                <li class="list-group-item">
                  <strong>주소:</strong> {{ order.oaddr }}
                </li>
              </ul>
            </div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "B_Ordcard",
    props: {
      bnum: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        orderList: [],
      };
    },
    mounted() {
      this.fetchOrderList();
    },
  
    methods: {
      formatDate(date) {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleString();
      },
      async fetchOrderList() {
        try {
          const response = await this.axios.post("/business/home", {
            bnum: this.bnum,
          });
          this.orderList = response.data.sort(
            (a, b) => new Date(b.odate) - new Date(a.odate)
          );
          console.log("Response:", response.data);
        } catch (error) {
          console.error("Error fetching orderList:", error);
        }
      },
    },
    watch: {
      bnum: {
        handler() {
          this.fetchOrderList();
        },
        immediate: true, // 초기에도 실행하도록 설정
      },
    },
  };
  </script>