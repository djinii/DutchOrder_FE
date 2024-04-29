<!-- 주소 입력 드롭리스트 -->
<template>
    <div class="dropdown">
        <div class="input-group">
            <button class="btn btn-secondary"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </button>

            <ul class="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px"  data-bs-theme="light">
                <li><h6 class="dropdown-header">이전에 사용한 주소</h6></li>
                <li v-for="addr in addrLi" :key="addr"  @click="selAddr(addr.adaddr)" ><a class="dropdown-item rounded-2" href="#">{{ addr.adaddr }}</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item rounded-2" href="#" @click="addAddr">새로운 주소 추가</a></li>
            </ul>
            <!-- <input type="text" aria-label="First name" class="form-control" :value="selectedAddr" readonly> -->
            <input type="text" aria-label="First name" class="form-control" value="남부순환로 267나길 10" readonly>
        </div>
      </div>
</template>
<script>
export default {
    props:{
        addrLi:{
            type:Array,
            required:true
        }
    },
    data(){
        return{
            // selectedAddr : '',
        }
    },
    created(){
        if(this.addrLi.length > 0){
            this.selectedAddr = this.addrLi[0].adaddr;
        }
    },
    computed:{
        selectedAddr(){
            return this.$store.getters['cartStore/GET_OADDR']
        }
    },
    mounted(){

  },
    methods:{
        addAddr(){
            alert("주소 추가")
        },
        selAddr(addr){
            console.log(addr)
            this.selectedAddr = addr;
            this.$emit('update:selectedAddr', addr); // 근처 꺼내는 용도

            this.$store.commit('cartStore/UPDATE_OADDR', addr)

    },
    }
}
</script>