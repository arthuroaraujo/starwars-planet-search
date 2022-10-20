/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [quanti, setQuanti] = useState(0);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleOperator = ({ target }) => {
    setOperator(target.value);
  };

  const handleQuanti = ({ target }) => {
    setQuanti(target.value);
  };

  const filterSelect = () => {
    switch (operator) {
    case 'maior que': {
      const arr = data.filter((e) => Number(e[column]) > Number(quanti));
      setData(arr);
    }
      break;
    case 'menor que': {
      const arr = data.filter((e) => Number(e[column]) < Number(quanti));
      setData(arr);
    }
      break;
    case 'igual a': {
      const arr = data.filter((e) => Number(e[column]) === Number(quanti));
      setData(arr);
    }
      break;
    default: return operator;
    }
  };

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setData(results);
    //   console.log(results);
    };
    requestAPI();
  }, []);

  const contextValue = {
    data,
    name,
    handleName,
    column,
    handleColumn,
    operator,
    handleOperator,
    quanti,
    handleQuanti,
    filterSelect,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
