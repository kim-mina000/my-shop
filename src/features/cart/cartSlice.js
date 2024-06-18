import { createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import productSlice from "../product/productSlice";
// 장바구니 정보를 담을 slice 만들기

const initialState = {
  cartList :[
    {
      id:'1',
      title:'Arcsabar 11 Pro',
      price:299000,
      count: 2
    },
    {
      id:'3',
      title:'Aerus Z',
      price:199000,
      count: 1
    },

  ],

}

// proxy 안의 객체를 읽고싶으면 current 함수를 쓰기! current(state) 처럼!
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    // 상품 객체로 넘겨주면 cartList에 아이템을 추가하는 리듀서 만들기
    // 이미 들어있는 상품이면 수량만 증가
    // 장바구니에 없는 상품이면 추가
    addCartList :(state, { payload : {productDetail,orderCount} })=>{
      const newItem = {...productDetail, count:orderCount, price:orderCount*productDetail.price};
      const selectedItem = state.cartList.find((item)=>item.id === newItem.id);
      
      if (selectedItem === undefined) {
        state.cartList.push(newItem);
      } else {
        state.cartList.forEach((listItme)=>{
          if (listItme.id === newItem.id) {
            listItme.count += newItem.count;
          }
        });
      }
    },
    // 수량을 변경하는 리듀서 만들기
    // Quiz 전달받은 상품의 id 값으로 cartList에서 해당 상품을 찾아 수량을 1씩 증가/감소
    increaseCount: (state,{payload : productId})=>{
      const selectedItem = state.cartList.find((item)=>item.id === productId);
      selectedItem.count++;
    },
    decreaseCount: (state, action)=>{
      const selectedItem = state.cartList.find((item)=>item.id === action.payload);
      if (selectedItem.count < 1) {
        selectedItem.count = 0;
        } else {
          selectedItem.count--;
        }
    },
    // Quiz 장바구니에서 삭제하는 리듀서 마들기
    removeItemFromCart: (state, {payload:id}) =>{
      state.cartList = state.cartList.filter(item => item.id !== id);
      // splice 도 괜찮은 선택! 원본 배열을 변경하는 함수! filter는 원본을 변경하지않음!
      // splice(index, index로부터 지울 배열의 수)
  },
}

});

export default cartSlice.reducer;
export const selectCartList = state => state.cart.cartList;
export const {addCartList,increaseCount,decreaseCount,removeItemFromCart} = cartSlice.actions;