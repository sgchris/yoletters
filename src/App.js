import React, { useState } from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';

import './App.css';

import LetterBox from './components/LetterBox';
import LetterEdit from './components/LetterEdit';

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <Toast show={show} onClose={() => toggleShow(!show)}>
      <Toast.Header>
        <strong className="mr-auto">React-Bootstrap</strong>
      </Toast.Header>
      <Toast.Body>{children}</Toast.Body>
    </Toast>
  );
};

const App = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3" style={{overflow: "hidden"}}>
      <div style={{overflow: "hidden"}}>
        <LetterBox letter="א" />
        <LetterBox letter="ב" />
        <LetterBox letter="ג" />
        <LetterBox letter="ד" />
      </div>
      <br />
      <div style={{overflow: "hidden"}}></div>
      <hr />
      <LetterEdit wrapperSize="400" />
    </Container>
  </Container>
);

export default App;
