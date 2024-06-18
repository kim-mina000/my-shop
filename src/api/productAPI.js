
// 상품과 관련된 api 요청 함수들을 정의
// 가독성도 좋고 여러 곳에서 재사용 할 수 있도록 함수로 만듦

import axios from "axios";

// 상품 목록 조회

// 특정 상품 조회

// 상품 더보기
export const getMoreProducts = async () => {
  try {
    const response = await axios.get("https://my-json-server.typicode.com/kim-mina000/MyJsonServer-shop/more-products");
    
    if (response.status === 200) { // 응답 코드가 200 OK 일때만 결과를 리턴
      return response.data;
    } else { // 서버가 에러 코드 전송 시 throw 함!
      // axios는 이런 코드 안붙여줘도 알아서 에러를 만들어서 보내줌
      // fetch 사용할때는 필요
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }

    
  } catch (error) {
  // 서버가 죽었거나, 인터넷이 끊겼거나, url이 잘못되었을 때 등
  // 서버로부터 api를 받아올때는 항상 에러가 나올 가능성을 염두해 두어야함
    console.error(error);     
  }
};