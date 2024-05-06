<!-- 최종 -->
<template>
    <div class="container">
        <DJ_C_SelAddrVue :addrLi="addrLi" @update:selectedAddr="selectedAddr = $event" />
        <hr class="my-4" />
        <!-- <p>{{ this.selectedAddr }}</p> -->
        
        <p style="padding-bottom: 10px;"></p>

        <!-- 카테고리 -->
        <!-- <DJ_C_CategoryVue :cateLi="cateLi" /> -->
        <DJ_C_CategoryVue :cateLi="cateLi" @update:category="fetchShopsByCategory" />
        <p></p>
        <!-- 검색 -->
        <!-- <C_SearchKeyVue /> -->
        <DJ_C_MainShopLi :shopLi="shopLi" style="width: 350px;"/>
    </div>
</template>
<script>
import DJ_C_CategoryVue from '@/components/client/DJ_C_Category.vue'
import DJ_C_SelAddrVue from '@/components/client/DJ_C_SelAddr.vue'
import DJ_C_MainShopLi from '@/components/client/DJ_C_MenuLiShop.vue'
//import C_SearchKeyVue from '@/components/client/C_SearchKey.vue'
export default {
    data(){
        return{
            selectedAddr : '',
            // user addr에서 가져와야함, mnum이 유저mnum인 adaddr을 가져와라
            addrLi:[],
            shopLi:[],
            cateLi:
            [{
                id: "Kfood",
                name: "한식",
                image: require("@/assets/img/food_img/Kfood.png"),
                fkey : 301
            },
            {
                id: "Jfood",
                name: "일식",
                image: require("@/assets/img/food_img/Jfood.png"),
                fkey : 303
            },
            {
                id: "Cfood",
                name: "중식",
                image: require("@/assets/img/food_img/Cfood.png"),
                fkey : 302
            },
            {
                id: "KSfood",
                name: "분식",
                image: require("@/assets/img/food_img/KSfood.png"),
                fkey : 304
            },],
            check:"",
            // DB common에서 가져와야함 : 우선순위 후
            // cateLi:["한식", "중식", "일식", "분식"]
        }
    },
    watch: {
    //   '$route.query.category': {
    //     immediate: true,
    //     // URL이 변경될 때마다 데이터를 가져오도록
    //     handler(newVal) {
    //     //   this.cateId = newVal;
    //     //   this.fetchData(newVal); 
            
    //     this.fetchData(newVal);

    //     },
    //   },
    },
    async created(){
        await this.axios.get('/client/home')
        .then((res)=>{
            console.log(res.data)
            this.addrLi = res.data.listAddr;
            this.shopLi = res.data.listShops;
            console.log(this.shopLi + " " + this.addrLi + "  res");
        }).catch((err) => {
            console.error('get_Main.vue', err)
        })
    },
    components:{
        DJ_C_CategoryVue,
        DJ_C_SelAddrVue, 
        DJ_C_MainShopLi
        // C_SearchKeyVue
    },
    methods:{
        addAddr(){
            alert("주소 추가")
        },
        selAddr(addr){
            this.selectedAddr = addr
        },

        fetchShopsByCategory(category) {
        this.axios.get('/client/shoplist', {
            params: {
                category: category
            }
        })
        .then(response => {
            this.shopLi = response.data;
        })
        .catch(error => {
            console.error(error);
        });
    }
    }
}
</script>