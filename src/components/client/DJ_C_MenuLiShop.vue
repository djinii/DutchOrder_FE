<!-- 가게 상세에 들어가는 메뉴판  -->
<!-- map으로 꺼내오기, 카테고리를 key값으로 -->
<template>
     <div class="container">
         <div class="card">
             <!-- Map key 만큼 반복 -->
             <ul class="list-group list-group-flush"> 
                 <li class="list-group-item" v-for="shop in shopLi" :key="shop" @click="show(shop.sname)">
                     <p></p>
                     <h5>{{ shop.sname }}</h5>
                     <p>영업시간<br>{{ shop.start_time }} ~ {{ shop.end_time }}</p>
                     <!-- <p>최소주문 100원 부터</p> -->
                 </li>
             </ul>
         </div>
         <p></p>
     </div>

</template>
<script>

export default {
    props:{
        shopLi:{
            type:Array,
            required:true
        },
        theme:{
            type:String
        }
    },
    methods:{
        show(shopName){
            this.$router.push({ path: '/client/shopInfo', query: { spec: shopName } });
        }
    },
    computed:{

    }
}
</script>