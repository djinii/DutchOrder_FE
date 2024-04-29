<!-- 메뉴마다 결제 멤버 선택하는 카드 -->
<template>
    <div>
        <div class="input-group mb-2" v-for="(item, i) in ordList" :key=i >
            <select class="form-select" v-model="item.ordname" :disabled="this.completed">
                <option v-for="(friend, index) in friends" :key="index" :value="friend">{{ friend }}</option>
            </select>     
        <input type="text" class="form-control" v-model="item.ordprice" :disabled="this.completed">
                <!-- 해당 입력란 삭제 -->
                <button class="btn btn-outline-secondary" type="button" @click="rmForm(i)" :disabled="this.completed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                    </svg>
                </button>
        </div>
        <!-- 입력란 추가 -->
        <div class="d-grid gap-1 d-md-block d-flex">
            <button class="btn btn-primary col-6" type="button" @click="addForm" :disabled="this.completed">
                추가
            </button>
            <button class="btn btn-primary col-6" type="button" @click="update()">
                {{ label }}
            </button>
        </div>
    </div>

</template>


<script>
export default {
data(){

    return {
        inputStatus:"",
        friends: ['Friend1', 'Friend2', 'Friend3'],
        ordList: [],
        completed:false,
        label:'완료',
        // items: this.itemsProp,
        // 친구 0은 늘 유저
        selectedFriends: [],
        inputAmounts: [],
        insert:0
    }
},
props:{
    menu:{
        type:Object
    }
},
watch: {
    
},
created() {
    console.log(this.menu.fname + this.menu.fcount + "selFRD.vue");
    this.selectedFriends[0] = this.friends[0];
    console.log(this.friends);
    for (let i = 0; i < (this.menu.fcount); i++) {
        this.ordList.push({
            ordname: this.friends[0],
            ordprice: this.menu.fprice
        });
        console.log(this.menu.osnum + "selFrd")
    }
},
methods:{
addForm() {
    this.ordList.push(
        {
            osnum: this.menu.osnum,
            ordname: this.friends[0],
            ordprice: this.menu.fprice
        }
        ); 
        console.log(this.ordList)
    },
    rmForm(index) {
        // this.ordList[index].visible = false;
        if(this.ordList.length > 1){
            this.ordList.splice(index, 1);
            console.log(this.ordList)
            console.log(index)
        }else{
            alert("한개이상 입력하세요")
        }
    },
    update(){
        if(this.label === '완료'){
            // Input값 확인 
            let s = 0;
            this.ordList.forEach(item => {
                s += parseInt(item.ordprice);
            })
            console.log(s + "dooootodoatlt")
            if(s > this.menu.osprice || s < this.menu.osprice){
                alert("금액을 확인하세요")
            }else{
                this.completed=true
                this.label="수정"
                let sums = [];
                this.ordList.forEach(item => {
                    let found = sums.find(sum => sum.ordname === item.ordname);
                    if (found) {
                        found.ordprice += Number(item.ordprice);
                    } else {
                        sums.push({osnum: this.menu.osnum, ordname: item.ordname, ordprice: Number(item.ordprice)});
                    }
                });
                this.$store.commit('ordStore/ADD_ORD', sums)
                // this.$store.commit('ordStore/CAL_SUMS')
                // this.$emit('updateSums', sums);
            }
        }else{
            // console.log(this.ordList.ordname+"00000000");
            // 수정일때 클릭 -> 완료로 수정
            this.$store.commit('ordStore/RM_ORD', {
                osnum:this.menu.osnum,
                // ordname:this.ordList.ordname
                ordList: this.ordList.map(item => item.ordname)
                //제대로 전달되는지 확인
            })
            this.completed=false
            this.label="완료"
        }
    },

    eachPrice(){

    }
}
}
</script>