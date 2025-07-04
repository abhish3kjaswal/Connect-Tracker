import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function App() {
  return (
    <Wrapper>
      <Typography variant="h3" gutterBottom>
        Welcome to Connecct Tracker app
      </Typography>
      <Button variant="contained" color="primary">
        Test MUI Button
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  background: #f0f0f0;
`;

export default App;
