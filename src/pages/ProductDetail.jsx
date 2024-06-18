import axios from "axios";
import { Alert, Button, Col, Container, Form, Modal, Nav, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled, {keyframes} from "styled-components";

import { clearSelectedProduct, getDetailProduct, selectGetDetailProduct } from "../features/product/productSlice";
import { toast } from "react-toastify";
import TabContent from "../components/TabContent";
import { addCartList } from "../features/cart/cartSlice";


// styled component를 이용한 애니메이션 속성 적용
const highlight = keyframes`
  from { background-color: #cff4fc; }
  50% { background-color: #f2fafc; }
  to { background-color: #cff4fc; }
`;

const StyledAlert = styled(Alert)`
  animation: ${highlight} 0.8s linear infinite;
`;




function ProductDetail() {
  const {id} = useParams();

  const dispatch = useDispatch();
  const [timeOut, setTimeOut] = useState(true);
  const [orderCount, setOrderCount] = useState(1);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [tabKey, setTabKey] = useState('detail');
  const [recentList, setRecentList] = useState([]);

  const handleChangeOrderCount = (e) =>{
    // 숫자 외 입력시 유효성 검사 후 경고 토스트 띄우기
    if (isNaN(e.target.value)) {
      toast('✋숫자만 입력하세요!');
      return;
    } else {
      setOrderCount(Number(e.target.value));
    }
  }
  
  // 처음 마운트 됐을 때 서버에 상품 id를 이용하여 데이터를 요청하고
  // 그 결과를 리덕스 스토어에 저장
  useEffect(() => {
    // 서버에 특정 상품의 데이터 요청
    // axios.get(`https://my-json-server.typicode.com/kim-mina000/MyJsonServer-shop/products/${id}`)
    // .then(res => dispatch(getDetailProduct(res.data)))
    // .catch((err)=>{
    //   console.error(err);
    // });

    // async await 사용
    const fetchProductByID = async ()=> {
      try {
        const response = await axios.get(`https://my-json-server.typicode.com/kim-mina000/MyJsonServer-shop/products/${id}`);
        dispatch(getDetailProduct(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductByID();
    
    // 상품 상세 페이지가 언마운트 될 때 전역 상태 초기화
    return () =>{
      dispatch(clearSelectedProduct());
      };
      }, []);
      
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeOut(false);
    }, 3000);
    // 불필요하게 타이머가 계속 쌓이는 것을 정리
    return () =>{
      clearTimeout(timer);
    }
  }, []);
  const randomNum = Math.floor(Math.random()*1000%100);
  
  const formatter = new Intl.NumberFormat('ko-KR', {
    style:'currency',
    currency: 'KRW'
  });
  
  const productDetail = useSelector(selectGetDetailProduct);
  const nevigate = useNavigate();


  // 모달
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect
  // 상품 상세페이지에 들어갔을 때 해당 상품이 존재할때만 id값을 localStorage에 추가
  useEffect(() => {

    if(!productDetail) return;

    let recentProducts = JSON.parse(localStorage.getItem("recentProducts")) || [] ; // 처음엔 null이 들어올 예정이니까 기본값으로 빈배열을 넣어줌

    // id 값을 넣기 전에 기존 배열에 존재하는지 검사하거나
    // 아니면 일단 배열에 넣고 Set 자료형을 이용하여 중복 제거
    recentProducts.unshift(productDetail.id);
    recentProducts = new Set(recentProducts); // 배열을 Set 객체로 만듦 (중복 요소가 제거됨)
    recentProducts = [...recentProducts]; // 배열 -> Set 객체 -> 배열
    localStorage.setItem("recentProducts",JSON.stringify(recentProducts));

  }, [productDetail]);

  return (
    <Container className="pt-3">
      {/* alert 을 띄우고 3초 뒤에 사라지게 만들기 */}
      {/* 힌트: 처음 렌더링 됐을 때 setTimeout으로 타이머 설정 + 조건부 렌더링 */}
      {timeOut && <StyledAlert variant="info" onClose={() => setTimeOut(false)} dismissible>현재 {randomNum}명이 이 상품을 보고 있습니다</StyledAlert>}

      <Row>
        {/* Quiz: 데이터 바인딩 작업 */}
        <Col md={6}>
          <img src={productDetail?.imagePath} width={"80%"}/>
        </Col>

        <Col md={6}>
          <h4 className="pt-5">{productDetail?.title}</h4>
          <p>{productDetail?.content}</p>
          <p>{formatter.format(productDetail?.price)}원</p>

          <Col md={4} className="m-auto mb-3" >
          {/* Quiz: text input을 제어 컴포넌트로 만들기 */}
            <Form.Control type="text" onChange={handleChangeOrderCount} value={orderCount} />
          </Col>

          <Button variant="primary">주문하기</Button>
          <Button variant="warning" onClick={()=>{dispatch(addCartList({productDetail,orderCount})); handleShow(); }}>장바구니</Button>
        </Col>
        {/* 
        기존의 데이터 초기값이 null이기 때문에 오류가 났던것!
        해결하기 위해 여러가지 방법이 있는데 if문 써주거나 내려받은 값이 null이면 아예화면을 로딩하지 않거나
        ? <옵셔널 체이닝을 통해 해결 가능 하다
        */}
      </Row>

      {/* 탭 버튼 UI */}
      {/* defaultActiveKey: 기본으로 active 할 탭, active클래스가 들어가있음 */}
        <Nav variant="tabs" defaultActiveKey="/link-0"
          className="my-3"
        >
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{setCurrentTabIndex(0); setTabKey('detail')}}>상세정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{setCurrentTabIndex(1); setTabKey('review')}}>리뷰</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=>{setCurrentTabIndex(2); setTabKey('qa')}}>Q&amp;A</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" onClick={()=>{setCurrentTabIndex(3); setTabKey('exchange')}}>반품/교환정보</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 탭의 내용을 다 만들어 놓고 조건부 렌더링 하면 됨 */}
      {/* 방법1: 삼항 연산자 사용 (가독성 나쁨) */}
      {currentTabIndex === 0 
      ?<div>탭 내용 1</div> 
      : currentTabIndex === 1
        ?<div>탭 내용 2</div>
        : currentTabIndex === 2 
          ?<div>탭 내용 3</div>
          : currentTabIndex === 3
            ?<div>탭 내용 4</div>
            :null
      }
      {/* 방법2: 컴포넌트로 추출 (가독성 개선) */}
      <TabContent currentTabIndex={currentTabIndex} />

      {/* 방법3(편법): 배열이나 객체 형태로 만들어서 조건부 렌더링 */}
      {/* 배열 형태 */}
      {[
        <div>탭 내용 1</div>,
        <div>탭 내용 2</div>,
        <div>탭 내용 3</div>,
        <div>탭 내용 4</div>
      ][currentTabIndex]}

      {/* Quiz:객체 형태 */}
      {{
        'detail':<div>탭 내용 1</div>,
        'review':<div>탭 내용 2</div>,
        'qa':<div>탭 내용 3</div>,
        'exchange':<div>탭 내용 4</div>,
      }[tabKey]}

      {/* 장바구니 모달 -> 추후 범용적인 공통 모달로 만들고 구체화하여 사용하는 것이 좋음*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>🛒 미나네 샵 알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        장바구니에 상품을 담았습니다. <br/>
        장바구니로 이동하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={()=>{handleClose(); nevigate('/cart');}}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductDetail;