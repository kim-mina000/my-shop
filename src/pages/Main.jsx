import { useEffect } from "react";
import styled from "styled-components";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader, ScaleLoader } from "react-spinners";

import productSlice, { addMoreProducts, getAllProducts, getMoreProductsAsync, selectProductList, selectStatus } from "../features/product/productSlice";
import ProductListItem from "../components/ProductListItem";
// 리액트(JS)에서 이미지 파일 가져오기
// 1) src 폴더 안 이미지(상대경로로 import해서 사용)
import siri from "../images/yonex.jpg";
import { getMoreProducts } from "../api/productAPI";
import RecentProducts from "../components/RecentProducts";
// 2) public 폴더 안 이미지 (root 경로로 바로 접근)
// 빌드 시 src 폴더 안에 있는 코드와 파일은 압축이 되지만 public 폴더에 있는 것들은 그대로 보존
// 이미지 같은 수정이 필요 없는 static 파일의 경우 public에 보관하기도 함

const MainBackground = styled.div`
  height: 500px;
  background-image: url(${siri}); // 1번 방법
  /*background-image: url("/images/yonex.jpg");*/ // 2번 방법
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
function Main() {
  const dispatch = useDispatch();
  // const list = useSelector(state => state.product.productList);
  const productList = useSelector(selectProductList);
  const status = useSelector(selectStatus); // API 요청 상태 (로딩 상태)

  // 처음 마운트 됐을 때 서버에 상품 목록 데이터를 요청하고
  // 그 결과를 리덕스 스토어에 전역 상태로 저장
  useEffect(() => {
    // 서버에 상품 목록 요청
    axios.get("https://my-json-server.typicode.com/kim-mina000/MyJsonServer-shop/products")
    .then(response => {
      dispatch(getAllProducts(response.data));
    })
    .catch((err)=>{
      console.error(err);
    });
    
      // useEffect에서 return은 언마운트 될때 실행됨
      // ex) 타이머기능 정리 등
    }, []);
    

    const handleGetMoreProducts = async () => {
      const getMore = await getMoreProducts();
      dispatch(addMoreProducts(getMore));
    };

    const handleGetMoreProductsAsync = () => {
      dispatch(getMoreProductsAsync());
    };
    
  

    return (
    <>
    {/* 메인 이미지 섹션 */}
      <section>
        <MainBackground/>
      </section>
      {/* 상품 목록 섹션 */}
      <section>
        <Container>
          <Row>
            {/* 부트스트랩 이용한 반응형 작업 */}
            {/* md >= 768px 이상에서 전체 12등분 중 4:4:4로 보여줌 그 이하에서는 하나씩 나옴 */}
            {/* Container - Row - Col 안에서 만 사용가능 */}
            {/* map함수로 돌리기 */}
            {/* ProductListItem 컴포넌트 만들어서 반복 렌더링을 바꾸고 데이터 바인딩 */}
            {productList.map((product)=>{
              return <ProductListItem key={product.id} product={product}/>
            })} 

            {/* 로딩 페이지 만들기 */}
            {status === 'loading' &&
              <div>
                <BeatLoader 
                  color="#888"
                  speedMultiplier={5}
                  cssOverride={{
                    margin: "30px 0px 30px"
                  }}
                />
              </div>
            }
          </Row>

        </Container>
        {/* 상품 더보기 기능 만들기
        더보기 버튼 클릭 시 axios를 사용하여 데이터 요청
        받아온 결과를 전역 상태에 추가하기 위해 리듀서 추가 및 액션 생성 함수 export
        스토어에 dispatch로 요청(액션) 보내기
        */}
        <Button variant="secondary" className="mb-4" onClick={handleGetMoreProducts}>
          더보기
        </Button>
        
        {/* thunk를 이용한 비동기 작업 처리하기 */}
        <Button variant="secondary" className="mb-4" onClick={handleGetMoreProductsAsync}>
          더보기 {status}
        </Button>
      </section>
      
      {/* 최근 본 상품 컴포넌트 */}
      {productList.length > 0 && <RecentProducts productList={productList} />}
    </>
  );
};

export default Main;


// 가짜(Fake) API 서버 만들기
// 실무와 비슷한 느낌으로 하기 위해 가짜(Fake) API 서버를 만들거임

// 1. json-server (혼자 CRUD 연습하기 좋음)
// 이 도구를 사용하면 json 파일 하나만 있으면 로컬에 연습용 서버를 쉽게 구성 할 수 있음
// (즉, 사용하려는 컴퓨터에서 매번 로컬 서버를 띄워야 함)

// json-server 사용법
// ./src/data.json 이라는 파일을 작성
// npx json-server ./src/data.json --port 4000
// 또는 
// npm i -g json-server
// json-server --watch ./src/data.json --port 4000

// 더 자세한 사용법 참고
// https://github.com/typicode/json-server
// https://redux-advanced.vlpt.us/3/01.html

// 2. My JSON Server (Read만 가능)
// 이 서비스를 사용하면 GitHub와 연동하여 연습용 서버를 쉽게 구성 할 수 있음

// My JSON Server 사용법
// GitHub에 저장소 생성(<your-username>/<your-repo>)
// db.json파일 만들기
// 서버에 액세스하려면 https://my-json-server.typicode.com/<your-username>/<your-repo>를 방문

// 사용 예
// https://my-json-server.typicode.com/geoblo/db-shop
// https://my-json-server.typicode.com/geoblo/db-shop/products
// https://my-json-server.typicode.com/geoblo/db-shop/products/1
