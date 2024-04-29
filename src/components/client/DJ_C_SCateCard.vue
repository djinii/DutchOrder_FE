<!-- 해당 카테고리에 해당하는 가게 리스트 카드 -->
<!-- 라우터로 연결받은 bkey(카테고리 키값)에 맞춰서 디비 요청 -->
<template>
    <div>
        <!-- card를 눌렀을때 연결해줄 Url -->
        <div v-for="shop in shopliProp" :key="shop.bnum">
            <router-link :to="{ path: '/shopInfo', query: { spec: shop.sname } } ">
            <div class="card h-100">
              <div class="col">
                <div class="card h-100">
                  <div class="card-body d-flex align-items-center">
                    <div class="StoreImg">
                      <!-- <img
                        :src="menu.fimg"
                        class="card-img-top"
                        alt="Restaurant Image"
                      /> -->
                    </div>
                    <div class="ml-3" style="margin-left: 20px">
                      <h5 class="card-title mb-0">{{ shop.sname }}</h5>
                      <p class="card-text">
                        운영시간 : {{ shop.start_time }} ~ {{ shop.end_time }}
                      </p>
                      <p class="card-text">최소주문 100원 부터</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
    </div>


    
  </template>
  
  <script>
//   import axios from "axios";
  export default {
    props:['shopliProp'],
    name: "C_ShopCard",
    data() {
      return {
      };
    },
    created(){
    },
    mounted() {
    },
    methods: {
    },

  };
  </script>
  
  
  <style scoped>
  .card {
    border: 1px solid #dee2e6;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .StoreImg {
    height: auto;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .card-text {
    color: #6c757d;
    font-size: 0.9rem;
  }
  </style>
  