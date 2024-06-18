import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigator = useNavigate();
  return (
    <>
      {/* 헤더 */}
      {/* 헤더 영역 : 상단 내비게이션 바 */}
      <header>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home" onClick={()=>{navigator('/')}}>⸝₍̗⁽ˆ⁰ˆ⁾₎͕⸍∘˚˳°✧𝐦𝐢𝐧𝐚 𝐬𝐡𝐨𝐩</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>navigator('/')}>𝐡𝐨𝐦𝐞</Nav.Link>
              <Nav.Link onClick={()=>navigator('/cart')}>𝐜𝐚𝐫𝐭</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>

      {/* 자식 컴포넌트가 렌더링 될 위치 */}
      <Outlet />

      <footer>
        <p className='py-5 mb-0 bg-dark text-white'>
          &copy;  𝙺𝙼𝙰 𝚖𝚒𝚗𝚊 𝚔𝚒𝚖. 𝐀𝐥𝐥 𝐑𝐢𝐠𝐡𝐭𝐬 𝐑𝐞𝐬𝐞𝐫𝐯𝐞𝐝.
        </p>
      </footer>
    </>
  );
};

export default Layout;