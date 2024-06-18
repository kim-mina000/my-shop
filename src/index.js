import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// css 초기화 코드를 index.html에 넣어줌
// index.html에서 css 초기화 후 -> index.js로 넘어와서 렌더링하고 -> App.js로 렌더링 넘어감
// 부트스트랩 css가 날아가지 않게됨!
import 'bootstrap/dist/css/bootstrap.min.css'; //boot strap css 추가
import 'react-toastify/dist/ReactToastify.css'; // React Toastify css 추가

import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
