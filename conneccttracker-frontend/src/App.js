import "./App.css";
import styled from "styled-components";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Register from "./Features/auth/Register";
import Login from "./Features/auth/Login";

function App() {
  return (
    <Wrapper>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  background: #f0f0f0;
  height:100vh;
`;

export default App;
