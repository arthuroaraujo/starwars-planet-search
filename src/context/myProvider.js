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
  //   const [click, setClick] = useState(false);

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

  //   const handleClick = ({ target }) => {
  //     setClick(target.value);
  //   };

  const filterSelect = (array) => {
    //     if (click.length === 0) {
    //       return array;
    //     }
    array.filter((e) => {
      switch (operator) {
      case 'maior que': return Number(e[column]) > Number(quanti);
      case 'menor que': return Number(e[column]) < Number(quanti);
      case 'igual a': return Number(e[column]) === Number(quanti);
      default: return e;
      }
    });
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
