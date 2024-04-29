<!-- 최종 장바구니 화면 -->
<template>
    <div class="container">
        <div class="row" style="margin: 0px 0px 5px 2px">
            <div class="py-4 text-center">
                <h2>장바구니</h2>
            </div>
            <hr class="my-4" style="padding-bottom: 15px" />
        </div>

        <div class="card mb-2 mg-2" v-for="menu in menus" :key="menu">
            <C_MenuLi :menu="menu" :clickable="false"></C_MenuLi>
            <div class=" d-flex">
                <div class="p-2 flex-grow-1">
                    <button type="button" class="btn btn-outline-danger" @click="rmCard(menu.osnum)">삭제</button>
                </div>
                <div class="input-group p-2" style="width: 135px">
                      <!-- 수량 버튼 -->
                    <button class="btn btn-outline-secondary" type="button" @click="decrement(menu.osnum, menu.fcount)"> - </button>
                    <input type="number" :id="'button-' + menu.osnum" class="form-control" :value="menu.fcount" readonly/>
                    <button class="btn btn-outline-secondary" type="button" @click="increment(menu.osnum)"> +</button>
                </div>
            </div>
        </div>

        <br>
        <button class="btn btn-primary" style="width: 100%" @click="ordering" type="button">
            주문하기
        </button>
        <!-- 주문과 동시에 유저이름으로 item과 amount생성 + 주문금액, 배달비 까지 -->
  </div>
</template>
<script>
import C_MenuLi from '@/components/client/DJ_C_MenuLi.vue' 
import Cookies from 'js-cookie';

export default {
    data(){
        return{
            ordtotal:0,
            mnum:''
        }
    },
    computed:{
        menus(){
            return this.$store.getters['cartStore/GET_CART_LIST'];
        },
        total(){
            return this.$store.getters['cartStore/TOTAL_CART'];
        },
        oaddr(){
            return this.$store.getters['cartStore/GET_OADDR'];
        }
            
    },
    created(){
        this.mnum = Cookies.get('mnum');
        console.log(this.mnum + " cart.vue")

    },
    methods:{
        async ordering(){
            let data = [
                {item : '주문금액', amount : this.total },
                {item : '배달비', amount : 0}
            ];
            let postData = 
                {   cart : this.menus,
                    bnum : this.menus.bnum,
                    oaddr : this.oaddr
                }
            
            this.$store.commit("ordStore/ADD_REC", data)
            
            await this.axios.post('/client/ordPlaced', postData )
                .then((res)=>{
                    if(res.status === 200){
                        console.log(res.data);
                        this.$router.push({ path: '/client/ordPlaced' });
                    }else{
                        console.error('error!!! ' + res);
                    }
                })
        },

        // ordering(){
        //     //ordStore에 결제내역 꺼낼때 쓰려고 만든거
        //     this.$store.commit("ordStore/ADD_REC", this.total)
        //     this.$store.commit("ordStore/ADD_REC1", 100)
        //     // ADD-REC가 아니여도됨? 아마도.. 아니면 add_REC사용
        //     this.$router.push({ path: '/ordPlaced'});
        // },
        increment(osnum){
            console.log(osnum);
            this.$store.commit("cartStore/INCREASE_CNT", osnum);
        },
        decrement(osnum, fcount){
            if(fcount > 1){
                this.$store.commit("cartStore/DECREMENT_CNT", osnum);
            }
        },
        rmCard(osnum){
            this.$store.commit("cartStore/RM_CART_LIST", osnum);
        } 
    },
    components:{
        C_MenuLi
    },
}
</script>