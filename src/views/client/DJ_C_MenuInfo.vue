<!-- 메뉴 상세화면 -->
<template>
<div class = 'container py-3'>
    <div class="card" id="menuCard">
      <!-- 사진 + 이름 + 설명 -->
      <svg class="bd-placeholder-img bd-placeholder-img-lg img-fluid" width="100%" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Responsive image" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96"></rect>
        <!-- {{ shopInfo.simg1 }} -->
        <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Responsive image</text>
      </svg>
      <h3 class="card-header mb-0">{{ menuInfo.fname }}
        <p style="font-size: 15px;" class="mb-1 text-body-secondary">{{ menuInfo.finfo }}</p>
        <p style="font-size: 20px;" class="d-flex justify-content-end">{{ menuInfo.fprice }} 원</p>
      </h3>
    </div>
    <p></p>
    
    <!-- 가격 옵션이 있는 메뉴라면 -->
    <div class="list-group" v-if="this.menuInfo.foption == 1">
      <label class="list-group-item d-flex gap-2">
        <input class="form-check-input flex-shrink-0" type="radio" id="listGroupRadios1" value="1001" v-model="option" checked />
        <span> 기본 <small class="d-block text-body-secondary">+0원</small></span>
      </label>
      <label class="list-group-item d-flex gap-2">
        <input class="form-check-input flex-shrink-0" type="radio" id="listGroupRadios2" value="1002" v-model="option" />
        <span> 사이즈 업 <small class="d-block text-body-secondary">+500원</small></span>
      </label>
    </div>
    <p></p>
  
    <div class="d-grid gap-2">
      <!-- 담기 버튼 -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirm" @click="confirm"> 장바구니 담기 </button>  
    </div>
  
    <!-- 확인 모달창 -->
    <div class="modal" tabindex="-1" id="confirm" >
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-3 shadow">
          <div class="modal-body p-4 text-center">
            <h5 class="mb-0">{{this.msg}}</h5>
          </div>
          <div class="modal-footer flex-nowrap p-0 d-flex justify-content-center">
            <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none py-3 m-0 rounded-0" data-bs-dismiss="modal">확인</button>
          </div>
        </div>
      </div>
    </div> 

</div>
  </template>
    
  <script>
  // import axios from "axios";
  import Cookies from 'js-cookie'
  export default {
    computed: {
      cart() {
        return this.$store.getters['cartStore/GET_CART_LIST'];
      },
      total(){
        return this.$store.getters['cartStore/TOTAL_CART'];
      },
      // 같은 가게의 상품인지 확인
      cart_bnum(){
        return this.$store.getters['cartStore/GET_BNUM'];
      }
    },
    mounted(){
      this.mnum = Cookies.get('mnum') // 쿠키 읽기
      console.log(this.mnum)
    },
    data() {
      return {
        mnum:"",
        menuInfo: {},
        selected: "",
        option: 1001, // 기본
        asking:false,
        msg:"장바구니에 담겼습니다",
        osnum:0
      };
    },
    methods: {
      // 같은 가게의 상품인지, 이미 담겨있는 상품인지 확인후 담기
      confirm(){
        console.log("confirm() now")
        // 같은 가게의 상품인지 확인
        if(this.menuInfo.bnum != this.cart_bnum){
          this.msg = "동일한 가게의 상품만 담을 수 있습니다."
          this.asking 
        }
        // 이미 카트에 담겨있는 상품인지 osfnum = bnum + fnum + option(1001 or 1002)
        else{
          let osnum = this.cart_bnum.toString()+this.menuInfo.fnum.toString() + this.option.toString();
          console.log("현재 osnum -> ", this.menuInfo.fnum)
          console.log("현재 osnum -> ", osnum)
          // const exists = this.cart.some(cart_item => cart_item.osnum == osnum);
          if(this.cart.some(cart_item => cart_item.osnum == osnum)){
            this.msg = "이미 담겨있는 상품입니다."
          }else{
            this.addToCart(osnum);
            this.asking = true
            this.msg = "장바구니에 담겼습니다."
            console.log(this.cart)
          }
        }

        
        // if(this.menuInfo.bnum !== check_bnum){
        //   alert("같은 가게의 상품만 담을 수 있습니다.")
        // }
        // else{
        //   console.log("osnum 현재 " + osnum )
    
        //   console.log("existe " + exists + " -osnum " + osnum);

        //   if(exists){
        //     // 담을건지 묻는 알림창 
        //     this.osnum = osnum;
        //     // this.asking = true;
        //     this.confirm("계속?")
        //   }
          
        // }
        // 담겨있는 상품인지 확인
  
        // // 이미 리스트에 존재하는 osnum인지
        
        
        
        // // // console.log(this.cart().length()+"!!!")
        // // console.log(this.cart.length + "!!!");
        // // 존재하는 장바구니 상품이 있으면 
        // if(this.cart.length > 0){
        //   // 존재하는 bnum인지
        //   var exists2 = this.cart.some(item => item.bnum == this.menuInfo.bnum);
        //   console.log(exists2 +" exstist 값은 이거 야 "); 
        //   // 같은 bnum이면
        //   if(exists2){
        //     // 담겨있는 상품인지 확인
        //     if(!exists){
        //       this.addToCart()
        //     }
        //     if(exists){
        //       this.osnum = osnum
        //       this.asking = true;
        //       this.msg = "이미 담겨있는 상품입니다."
        //     // }else{
        //     //   this.addToCart(osnum);
        //     //   this.asking=false;
        //     // }
        //     }
        //     // 없는 상품이면
        //   }else{
        //     this.msg = "같은 가게의 메뉴만 담을 수 있습니다.";
        //   }
        // }
        // else{
        //   this.addToCart();
        // }

      },
      okay(){
        let option_price = (this.option == '1002' ? 500 : 0);
        console.log(this.menuInfo.bnum)
        console.log(this.osnum)
        console.log(this.menuInfo.fnum)
        console.log(this.menuInfo.fname)
        console.log(option_price)
      },
      // menuInfo 안에 bnum, fnum, fname, fprice, finfo, foption
      // 옵션없는 단일메뉴 foption=2
      // foption이 2라면 안띄움

      
      async fetchData() {
        let fdeT = this.$route.query.fdeT;
        await this.axios
        .get("/client/shopInfo/itemView", {
          params: {
            fdeT: fdeT,
          },
        })
        .then((res) => {
          this.menuInfo = res.data;
          console.log(this.menuInfo.bnum);
          // this.price = parseInt(this.menuInfo.fprice);
        })
        .catch((error) => {
          console.error("Error fetching menu data:", error);
        });
      },

      // 새 메뉴 저장할때
      // osnum, fnum, fopion_makkey, foption_mikey, fcount, osprice(장바구니 해당 메뉴 합산 totalPrice)
      addToCart(num) {
        console.log("----addToCart()-----")
        let option_price = (this.option == '1002' ? 500 : 0);
        this.$store.commit("cartStore/UPDATE_BNUM", this.menuInfo.bnum);
        this.$store.commit("cartStore/ADD_CART_LIST", {
          osnum : num,
          fname : this.menuInfo.fname,
          fnum : this.menuInfo.fnum,
          foption : this.menuInfo.foption,
          foption_mikey: this.option,
          fprice : parseInt(this.menuInfo.fprice) + option_price, // 선택된 옵션에 따른 fprice 조정
          osprice : parseInt(this.menuInfo.fprice) + option_price,
          fcount : 1
        });  
      },
    },
    created() {
      this.fetchData(this.$route.query.f);
    },
  };
  </script>
<style>
  #menuCard{
    background-color: #ffe1d8 !important;
  }
</style>