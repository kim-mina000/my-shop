import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMoreProducts } from "../../api/productAPI";

// thunk를 이용한 비동기 작업 처리하기
// thunk 미들웨어: 액션을 디스패치 했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업(API요청 등)을 실행
// 액션과 리듀서 중간에 끼어있는 중간자 역할, 액션 -> (미들웨어) -> 리듀서
// 주로 API 요청 같은 비동기 작업을 수행할 때 사용

// thunk를 이용한 비동기 작업 처리 시 이점? 
// 1) API 요청에 대한 상태 관리 쉽게 가능(요청 시작-로딩중, 요청 성공 또는 실패 시 로딩이 끝났음을 쉽게 관리)
// 2) 요청이 성공하면 응답에 대한 상태 관리, 실패하면 에러에 대한 상태 관리가 쉬움
// 추가적으로 제공하는 내용들이 좋음! 편함!

// createAsyncThunk()는 비동기 작업을 처리하는 액션 생성 함수를 반환함

export const getMoreProductsAsync = createAsyncThunk(
  'product/getMoreProductsAsync', // 첫번째 인자값: 액션 타입
  // 동기작업 할때는 redux가 알아서 만들어줬는데 비동기 작업은 내가 만들어줘야함!
  async ()=> { // 두번째 인자값: 액션이 발생했을 때 실행할 비동기 작업 (주로 api요청)
    const result = await getMoreProducts(); // 비동기 함수니까 await로 기다려주고 반환된 내용을 변수에 담음
    // 비동기 함수 실행 시 pending 상태 (팬딩 풀필드 리젝티드 중 팬딩(대기처리))
    return result; // 값을 반환하면 fulfilled 상태로 바뀜(성공처리), action.payload에 담겨 리듀서 함수로 전달됨
  },
  // 세번째 인자값: 추가옵션 options ex) 비동기 처리 전 취소, 비동기 실행 중 취소 등의 옵션 (문제가있을때) 재실행등
  // 액션 -> 미들웨어 ->
  // 썽크와 싸가가 미들웨어의 대표적인 라이브러리
  // 과거에는 썽크가 다른 라이브러리였지만 현재는 리덕스툴킷에 포함됨 
);

// 상품 정보를 담을 slice 만들기
const initialState = {
  productList: [],
  detailProduct: null,
  status: 'idle', // API 요청 상태

}
const productSlice = createSlice({

  name: 'product',
  initialState,
  reducers:{
    getAllProducts: (state,action) => {
      state.productList = action.payload;
    },
    getDetailProduct: (state,action) => {
      state.detailProduct = action.payload;
    },
    clearSelectedProduct:(state)=>{
      state.detailProduct = null;
    },
    addMoreProducts: (state,action) => {
      // state.productList = [...state.productList,...action.payload];
      state.productList.push(...action.payload);
    }
  },
// thunk를 이용한 비동기적인 작업에는 extraReducers를 사용
  extraReducers: (builder) => {
  builder
    .addCase(getMoreProductsAsync.pending, (state) => { // pending 상태 일 때 동작할 리듀서
      state.status='loading';
    })
    .addCase(getMoreProductsAsync.fulfilled, (state, action) => { // fulfilled 상태 일 때 동작할 리듀서
      state.status='idle';
      state.productList.push(...action.payload);
      })
      .addCase(getMoreProductsAsync.rejected, (state) => { // rejected 상태 일 때 동작할 리듀서
        state.status='fail';
    })
  }

});

// 리듀서 함수들
export default productSlice.reducer;

// 액션 생성 함수
export const { 
  getAllProducts, 
  getDetailProduct, 
  clearSelectedProduct,
  addMoreProducts
} = productSlice.actions;

// 선택자 함수
export const selectProductList = state => state.product.productList;
export const selectGetDetailProduct = state => state.product.detailProduct;
export const selectStatus = (state) => state.product.status;