<!-- 실제 사용중인 메뉴 카드 -->
<template>
    <ul class="list-unstyled">
        <li @click="clickable && showDetail(menu)">
            <div class="link-body-emphasis text-decoration-none border-top">
                <div class="hstack gap-3">
                    <div class="p-2">
                        <p class="mb-0">{{ menu.fname }} <span v-if="!addFrd">{{ menu.fcount }} 개</span></p>
                        <small class="text-body-secondary">{{ opt_msg()}}</small>
                    </div>  
                    <div class="p-2 ms-auto">
                        <h6 class="mb-0" v-if="addFrd"> {{menu.osprice}} 원</h6>
                        <h6 class="mb-0" v-else> {{menu.osprice}} 원</h6>
                    </div>
                </div>
            </div>
            <C_SelFrd v-if="addFrd" :menu="menu" @updateSums = "handleUpdateSums" />
        </li>
    </ul>
</template>
<script>
import C_SelFrd from "@/components/client/DJ_C_SelFrd.vue"
export default {
    components:{
        C_SelFrd
    },
    props: {
        menu: {
            type: Object,
            required: true
        },
        clickable: {
            type: Boolean,
            default: true
        },
        addFrd:{
            type : Boolean,
            default: false
        }
    },
    data() {
        return {
            // opt_msg:""
        };
    },
    methods: {
        showDetail(m) {
            console.log(m); // 객체의 내용을 콘솔에 출력
            let fnum_16 = (m.fnum*100).toString(16);
            console.log(fnum_16 + "  -   " + m.fnum);
            console.log((parseInt(fnum_16, 16))*0.01 + " -- " + fnum_16);
            this.$router.push({ path: '/client/shopInfo/itemView', 
            query: { fdeT: fnum_16 } });
            // 라우팅 주소에 메뉴정보를 전달해서 가져와야함
        },
        opt_msg(){
            let msg = "";
            if(this.menu.foption_mikey ==1002){
                msg = "옵션 : 곱배기 (+500원)"
            }else{
                msg = "옵션 : 없음"
            }
            return msg
        }
    }
}
</script>