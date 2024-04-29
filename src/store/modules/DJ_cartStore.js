// 최종 
const cartStore = {
    namespaced: true,
    // 변수 정의
    state: {
        cartList: [
            {   
                bnum : 1006,
                osnum: 1122,
                fname: '짬뽕',
                fnum: 11,
                foption_mikey: 1002,    // 곱배끼
                fprice: 5000,   // 가격
                osprice:5000,    //총합
                fcount: 1,
            },
            {
                bnum : 1006,
                osnum: 1222,
                fname: '탕수육',
                fnum: 12,
                foption_mikey: 1001,    // 기본
                fprice: 11000,
                osprice:22000,
                fcount: 2,
            }
        ],
        oaddr:'',
        bnum:''
    },
    getters: { // 상태 가져오는 함수
        GET_CART_LIST: state => state.cartList,
        TOTAL_CART:(state)=>{
            let sum = 0
            state.cartList.forEach(order => {
                sum += order.osprice;
            });
            console.log(sum + "c_cartStore 합계")
            return sum;
        },
        GET_OADDR:state => state.oaddr,
        GET_BNUM : state => state.bnum
    },
    // 상태 변경
    mutations: {
        MU_CART_LIST: (state, payload) => { 
            state.cartStore = payload;
        },
        ADD_CART_LIST: (state, product) => {
            state.cartList.push(product);
            console.log(product.osnum + "?????")
            console.log(product.osprice + "  stroe produ");
        },
        INCREASE_CNT:(state,osnum) => {
        
            console.log(osnum + "increased!!!")
            // 해당 osfnum을 가진 상품
            const target_product = state.cartList.find(item => item.osnum == osnum.osnum);
console.log(target_product.fcount + "#3####")
            // console.log(target_product.fprice + " -> fprice " + target_product.fcount);
            target_product.fcount++;
            target_product.osprice = parseInt(target_product.fprice) * parseInt(target_product.fcount);

        },
        DECREMENT_CNT :(state,osnum)=>{

            // 해당 osfnum을 가진 상품
            const target_product = state.cartList.find(item => item.osnum == osnum);
            // console.log(target_product)
            // console.log(target_product.fcnt + " :Before");
            target_product.fcount--;
            // console.log(target_product.fcnt + " :After");
            target_product.osprice = parseInt(target_product.fprice) * target_product.fcount;
        },

        RM_CART_LIST:(state, osnum) =>{
            const target_product = state.cartList.find(item => item.osnum == osnum);
            // state.cartList.splice(index, 1);
            console.log(state.cartList)
            // state.cartList.splice(osfnum, osfnum)
            
            state.cartList = state.cartList.filter(obj => !compareObjects(obj, target_product));
            
            function compareObjects(obj1, obj2) {
                return JSON.stringify(obj1) === JSON.stringify(obj2);
            }
            console.log(state.cartList)
        },
        UPDATE_OADDR:(state, new_oaddr) => {
            console.log("update_oaddr " + new_oaddr)
            state.oaddr = new_oaddr
        },
        UPDATE_BNUM:(state, new_bnum) => {
            state.bnum = new_bnum;
            console.log("new b_num ->  "+state.bnum)
        }
    } ,
}
export default cartStore