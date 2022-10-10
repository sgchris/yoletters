import React from 'react';

import Container from 'react-bootstrap/Container';

import './App.css';

import LetterEdit from './components/LetterEdit';
import AlphabetEditor from './components/AlphabetEditor';

const App = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3" style={{overflow: "hidden"}}>
      <div style={{overflow: "hidden"}}>
        <AlphabetEditor />
      </div>
    </Container>
  </Container>
);

export default App;
