<!-- 최종 주문정보 입력화면 -->
<template>
<div>
    <div class="container">
        <div class="py-4 text-center">
            <h2>주문정보 입력</h2> 
        </div>    
        <hr class="my-4" style="padding-bottom: 15px" />
    </div>
    <!-- <a v-if="isChecked" href="#frd"> -->
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="isChecked">
          <label class="form-check-label" for="flexSwitchCheckDefault">{{ label }}</label>
        </div>
    <!-- </a> -->
    <br>

    <!-- 주문정보 작성 -->
    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">주소</label>
        <input class="form-control" type="text" :value=oaddr readonly>
    </div>
    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"></label>
        <div class="input-group mb-3">
            <input type="tel" class="form-control" placeholder="010-1234-1234" name="otel"  :value=mtel />
            <button class="btn btn-outline-secondary" type="button" id="changeNum">변경</button>
        </div>
        <p class="text-start text-body-secondary" style="font-size: 13px">
            * 주소를 정확히 입력해주세요. 잘못 입력된 경우 재배달 및 환불이 되지
            않습니다.<br />
            * 부재시 여러 번 통화 시도 후 가까운 곳으로 임의로 배달될 수
            있습니다-
            .
        </p>
    </div>
    <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label" >요청사항</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" name="omsg" rows="3"></textarea>
    </div>
    <br>
    

    <!-- 장바구니에 담아뒀던 주문 목록 -->
    <p id="frd" class="fw-semibold">주문내역</p>
<!-- 밖에서 메뉴들 반복시키고 안에 메뉴만 전달해야함, ordervue에서 가져온 메뉴들을 가지고 for -->
    <div v-for="menu in menus" :key="menu">
        <C_MenuLi :addFrd="addFrd" :menu="menu"></C_MenuLi>
    </div>

    <br>
    <p v-if="this.show" id="send" class="fw-semibold p-1 rounded">결제 금액</p>
    <DJ_C_OrdLi v-if="show" :total="total" :receipt="receipt"></DJ_C_OrdLi>

    <!-- <br> -->
    <!-- 금액 확인하기 -?>  결제 요청 -->
<!-- 결제요청 버튼 -->
    <a href="#send">
        <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button" @click="showRecLi">{{ msg }}</button>
        </div>
    </a>
</div>

</template>
  

  <!-- 친구 리스트 불러오기
        addr이랑, 요청사항 -> ordering 저장
         각 객체별 금액 -> ordSpec
    -->
<script>

// import axios from 'axios'
import C_MenuLi from '@/components/client/DJ_C_MenuLi.vue'
import DJ_C_OrdLi from '@/components/client/DJ_C_OrdLi.vue'
import Cookies from 'js-cookie';
export default {
    beforeRouteLeave(to, from, next) {
    if (to.path !== '/paying') {
        let result = confirm("작성한 내용이 사라집니다.\n계속하시겠니까?")
        if(result){
            this.$store.commit('ordStore/RM_ALL')
            next()
        }else{
            next(false)
            
        }
    }
    next();
  },
    data() {
      return {
        isChecked: false,
        addFrd: false,
        ordList:[],
        msg:'금액 확인하기',
        show:false,
        receipt:[],
        mtel:""
      }
    },
    components:{
        DJ_C_OrdLi,C_MenuLi
        
    },
    async created(){
    this.mnum = Cookies.get('mnum');
    await this.axios.get('/ordPlaced')
    .then((res)=>{
        console.log(res.data)
        this.mtel = res.data;
    }).catch((err) => {
        console.error('get_Main.vue', err)
        })
    },

   
    watch:{
        isChecked(update) {
            this.addFrd = update; // isChecked가 변경될 때 addFrd를 업데이트
            if(this.isChecked){
                location.href = "#frd"
            }
            console.log(this.addFrd);
        },
    },
    computed: {
        menus() {
            return this.$store.getters['cartStore/GET_CART_LIST'];
        },
        label() {
            return this.isChecked ? '함께 주문하기' : '혼자 주문하기';
        },
        total(){
            return this.$store.getters['cartStore/TOTAL_CART'];
        },
        oaddr(){
            return this.$store.getters['cartStore/GET_OADDR']
        }
    },
    mounted(){
        console.log(this.receipt)
    },
    methods:{
        async showRecLi() {
        if (!this.show) {
            await
                this.$store.commit('ordStore/CAL_SUM');
                this.receipt = this.$store.getters['ordStore/GET_REC'];
                console.log(this.receipt, "!!!!!")
                this.show = true;
                this.msg = '결제하기';
            }else{
                alert('결제요청 완료')
            }
        }
    },
  }
  </script>
  