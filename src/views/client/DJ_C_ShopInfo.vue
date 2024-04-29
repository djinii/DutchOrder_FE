<template>
    <div>
        <DJ_C_ShopCard :shopInfo="shopInfo" />
        <p></p>
        <div class="card">
            <!-- Map key 만큼 반복 -->
            <ul class="list-group list-group-flush"> 
                <!-- map key안에서 개수만큼 반복 -->
                <div v-for="menu in menus" :key="menu">
                  <C_MenuLiVue :menu="menu" />
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
// import axios from "axios";
import DJ_C_ShopCard from '@/components/client/DJ_C_ShopCard.vue'
import C_MenuLiVue from '@/components/client/DJ_C_MenuLi.vue'
export default {
    components: { DJ_C_ShopCard, C_MenuLiVue},
    data(){
        return{
            shopInfo:[],
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
          this.shopInfo = res.data.shopInfo;
          this.menus = res.data.menus;
          // this.menus = res.shopInfo.menus
          console.log("결과 "+this.menus)
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