import React from 'react';

import Container from 'react-bootstrap/Container';

import './App.css';

import Main from './components/Main';

const App = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3" style={{overflow: "hidden"}}>
      <Main />
    </Container>
  </Container>
);

export default App;
