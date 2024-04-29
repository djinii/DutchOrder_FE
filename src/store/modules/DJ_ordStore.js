const ordStore = {
    namespaced : true,
    state:{
        ordMap:new Map(),
        receiptLi:[], //결제목록, 결제금액, 배달비, 각 멤버 금액 등
        friends: new Set() //선택받은 친구들 이름 저장
    },
    getters:{
        GET_ORD: state => state.ordMap,
        GET_REC  : state => state.receiptLi,
    },
    mutations: {
        // 각 메뉴에 멤버별 금액 저장
        // 객체 리스트로 전달받음 -> osfnum을 key값으로, 나머지는 value로 저장
        ADD_ORD: function(state, payload) {
            payload.forEach(item => {
                let { osnum, ...receipt } = item;
                if (!state.ordMap.has(osnum)) {  // Map의 has 메서드 사용
                    state.ordMap.set(osnum, []);  // Map의 set 메서드 사용
                }
                this.commit('ordStore/ADD_FRD', item.ordname);
                state.ordMap.get(osnum).push(receipt);  // Map의 get 메서드 사용
            });
            console.log(payload);
            console.log(state.ordMap);
        },
        
        // map이 생성될때 ordname을 addFRD를 이용해서 저장
        ADD_FRD(state, name){
            // if(!state.friends.includes(name)){
                // state.friends.push(name);
                state.friends.add(name);
            // }
            console.log(state.friends," add_frd")
        },

        ADD_REC(state, data){
            state.receiptLi.push({item: data.item, amount: data.amount});
        },

        ADD_REC1(state, amount){
            state.receiptLi.push({item: "배달비", amount: amount});
        }, 
        // 애초에 전달받을때 드롭에서 선택된 이름도 받아와서 friends리스트에서 삭제
        // rm이 작동안함 add를 콜하는 유?

        RM_ORD(state, k){
            console.log(k.osnum + "osnum + 지우는 카드")
            state.ordMap.delete(k.osnum);
            for (let frd in k.ordList){
                console.log(k.ordList[frd] + " rmORd")
                state.friends.delete(k.ordList[frd]);
            }

            // 리스트에서 안사라짐
        },
        
        
        // recLi 만드는 거
        SET_REC(state, ordname){
            let sum = 0;
            // eslint-disable-next-line no-unused-vars
            for(let [key, value] of state.ordMap){
                if(Array.isArray(value)){
                    value.forEach(item => {
                        if(item.ordname === ordname){
                            sum += (item.ordprice)
                        }
                    });
                }else{
                    if(value.ordname === ordname){
                        sum += (value.ordprice)
                    }
                }
            }
            state.receiptLi.push({item: ordname, amount: sum});
            console.log(state.receiptLi,"se_rec")
        },
        // 자신이 주문한 값의 합을 구하고 receiptLi에 저장
        CAL_SUM:function(state){
            for(let friend of state.friends){
                this.commit('ordStore/SET_REC', friend)
            }
        },
        RM_ALL(state){

            state.receiptLi = [];
            state.friends.clear()
            state.ordMap.clear();

            console.log(state.receiptLi.length + " after")

            // for (let val in state.receiptLi){
                
                // console.log(val)
            // }
            // state.receiptLi.clear();
            // console.log(state.receiptLi.length)
        }        
    }   ,
}
export default ordStore;