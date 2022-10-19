import React from 'react';
import './App.css';
import Provider from './context/myProvider';
import Table from './components/Table';
import Forms from './components/Form';

function App() {
  return (
    <Provider>
      <Forms />
      <Table />
    </Provider>
  );
}

export default App;
