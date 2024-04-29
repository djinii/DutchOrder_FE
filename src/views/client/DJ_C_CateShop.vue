<!-- 카드ㅇ화 시켜야함 -->
<template>
    <div>
      <router-link :to="{ path: '/shoplist', query: { category: 301 } } ">한식</router-link> |
      <router-link :to="{ path: '/shoplist', query: { category: 302 } }">중식</router-link> |
      <router-link :to="{ path: '/shoplist', query: { category: 303 } }">일식</router-link> |
      <router-link :to="{ path: '/shoplist', query: { category: 304 } }">분식</router-link> |
      <!-- <router-link :to="{ path: '/shoplist', query: { category: 305 } }">양식</router-link> -->
      <h2>{{ cateId }}의 shop list 페이지</h2>
      <!-- fkey에 해당하는 카드 꺼내는 컴포넌트 -->
      <DJ_C_SCateCard :shopliProp="shopLi" />
    </div>
  </template>
  
  <script>
  import DJ_C_SCateCard from '@/components/client/DJ_C_SCateCard.vue';
  // import axios from 'axios';
  
  export default {
    data() {
      return {
        cateId: null,
        shopLi:[]
      };
    },
    watch: {
      '$route.query.category': {
        immediate: true,
        // URL이 변경될 때마다 데이터를 가져오도록
        handler(newVal) {
          this.cateId = newVal;
          this.fetchData(newVal); 
        },
      },
    },
    components:{
      DJ_C_SCateCard
    },
    methods: {
      async fetchData(categoryId) {
          await this.axios.get('/shoplist', {
            params: {
              category: categoryId
            }
          }).then((res)=>{
            this.shopLi = res.data;
            console.log(this.shopLi)
          })
        .catch( (error)=>{
          console.error('Error while fetching data:', error);
        })
      },
    },
    mounted() {
      this.fetchData(this.$route.query.category);
    },
  };
  </script>
  