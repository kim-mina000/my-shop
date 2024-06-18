import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RecentProductsWrapper = styled(Card)`
  width: 8rem;
  height: auto;
  position: fixed;

  top: 100px;
  right:20px;
  box-shadow: 4px 4px  10px 0 rgba(0, 0, 0, 0.25);

`;


function RecentProducts({productList}) {
  const nevigate = useNavigate();
  const recentProducts = JSON.parse(localStorage.getItem("recentProducts"));

  // 렌더링 막기
  if(!recentProducts) return null;

  // id 값으로 최근 본 상품들만 찾아서 배열로 만들기
  const recentProductsList = recentProducts.map((id)=>{
    return productList.find(product => product.id === id);
  })


  return (
    <>
      <RecentProductsWrapper>
        <Card.Header>최근 본 상품</Card.Header>
        <ListGroup variant="flush">
          {recentProductsList.slice(0,3).map(product=>(
            <React.Fragment key={product.id}>
              <img
                src={product.imagePath}
                alt={product.title}
                className="cursor-pointer"
                onClick={()=>nevigate(`/detail/${product.id}`)}
              />
              <ListGroup.Item className="text-ellipsis">{product.title}</ListGroup.Item>
            </React.Fragment>
          ))}
        </ListGroup>
        {/* 더보기 버튼 눌러서 최근 본 페이지 목록으로 이동하기 */}
        {recentProductsList.length > 3 &&
          <Card.Body>
            <Card.Link href="#">더보기</Card.Link>
          </Card.Body>
        }
      </RecentProductsWrapper>
    </>
  );
};

export default RecentProducts;