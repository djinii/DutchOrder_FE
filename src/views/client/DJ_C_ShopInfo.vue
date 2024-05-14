<template>
<div class = 'container py-3'>
  <!-- 가게 정보 -->
  <div class="card" id="menuCard">
    <h3 class="card-header mb-0" >{{ shopInfo.sname }}</h3>
    <svg class="bd-placeholder-img bd-placeholder-img-lg img-fluid" width="100%" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Responsive image" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96"></rect>
        <!-- {{ shopInfo.simg1 }} -->
        <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Responsive image</text>
    </svg>
      
    <div class="col p-4 d-flex flex-column position-static">
      <!-- 이름 리뷰보러가기 -->
      <strong class="d-inline-block mb-2 text-primary-emphasis">
        <a href="/client/shopReviews" class="icon-link gap-1 icon-link-hover stretched-link">
          리뷰 보러가기 >
          <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
        </a>
      </strong>
      <div class="mb-1 text-body-secondary">주소 : {{shopInfo.saddr}}</div>
      <div class="mb-1 text-body-secondary">전화번호 : {{shopInfo.stel}}</div>
      <div class="mb-1 text-body-secondary">운영시간 : {{ shopInfo.start_time }} ~ {{ shopInfo.end_time }}</div>
      <div class="mb-1 text-body-secondary">최소주문금액 : 없음</div>
      <p class="card-text mb-auto">배달비 : 없음</p>
    </div>
  </div> <!-- 가게 정보 div-->
  <p></p>
  <div class="py-3">
    <!-- Map key 만큼 반복 -->
    <ul class="list-group list-group-flush"> 
        <!-- map key안에서 개수만큼 반복 -->
        <h5 class="border-bottom pb-2 mb-0" style="padding-left: 8px;" >메뉴</h5>
        <div v-for="menu in menus" :key="menu">
          <shopMenus :menu="menu" />
        </div>
    </ul>
  </div>
</div>
</template>
<script>
import shopMenus from '@/components/client/DJ_ShopMenus.vue'
export default {
    components: { shopMenus},
    data(){
        return{
            shopInfo:Object,
            menus:[]
        }
    },
    watch: {
    '$route.query.spec': {
      immediate: true,
      // URL이 변경될 때마다 데이터를 가져오도록
      handler(newVal) {
        this.sname = newVal;
        this.fetchData(newVal); 
      },
    },
},
    methods: {
    async fetchData(sname) {
        await this.axios.get('/client/shopInfo', {
          params: {
            spec: sname
          }
        }).then((res)=>{
          // this.shopInfo = res.data;
          this.shopInfo = res.data.shopInfo;
          this.menus = res.data.menus;
          // this.menus = res.data.menuList;
          // this.menus = res.shopInfo.menus
          // console.log("결과 "+res.data.menuList)
        })
      .catch( (error)=>{
        console.error('Error while fetching data:', error);
      })
    },

  },
  mounted() {
    this.fetchData(this.$route.query.spec);
  },
}
</script>
<style>
#menuCard{
  background-color: #ffe1d8 !important;
}
</style>