import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 방법 1) 스타일드 컴포넌트로 스타일 확장
const StyledCol = styled(Col)`
  cursor: pointer;
`;
// 방법 2) GlobalStyle에 공통 스타일로 작성 -> className에 해당 클래스 추가 className="cursor-pointer"


function ProductListItem({product}) {

  // 숫자 포맷 적용
  // Intl 객체 사용 => 다른 옵션도 많음~!
  // https://velog.io/@seo__namu/JavaScript-Intl-API-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0#:~:text=Intl%20%EA%B0%9C%EC%B2%B4%EB%8A%94%20ECMAScript%20%EA%B5%AD%EC%A0%9C%ED%99%94,%EC%8B%9C%EA%B0%84%20%ED%98%95%EC%8B%9D%EC%9D%84%20%EC%A0%9C%EA%B3%B5%ED%95%A9%EB%8B%88%EB%8B%A4.&text=Intl%20API%EB%A5%BC%20%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4,%EC%9D%84%20%ED%91%9C%EC%8B%9C%ED%95%B4%EC%A4%84%20%EC%88%98%20%EC%9E%88%EB%8B%A4.
  const formatter = new Intl.NumberFormat('ko-KR', {
    style:'currency',
    currency: 'KRW'
  });

  const navigator = useNavigate();

  return (
    <StyledCol md={4} sm={6} className="cursor-pointer" onClick={()=>{navigator(`/detail/${product.id}`)}}>
      <img src={product.imagePath} width={"80%"} />
      <h4>{product.title}</h4>
      <p>{formatter.format(product.price)}원</p>
    </StyledCol>
  );
};

export default ProductListItem;