import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  // const [originalArr, setOriginalArr] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [quanti, setQuanti] = useState(0);
  const [filters, setFilters] = useState([]);

  const colArr = useMemo(() => (['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']), []);

  const [columnArr, setColumnArr] = useState(colArr);

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

  const filterSelect = useCallback(() => {
    const filterColumn = colArr.filter((e) => e !== column);
    setFilters([...filters, { column, operator, quanti }]);
    setColumn(filterColumn[0]);
    // setOperator(operator);
    // setQuanti(quanti);
    setColumnArr(filterColumn);
    // console.log(filters, column, operator, quanti);
  }, [colArr, column, filters, operator, quanti]);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setData(results);
    };
    requestAPI();
  }, []);

  useEffect(() => {
    filters.forEach(({ operator: op, column: cl, quanti: qt }) => {
      switch (op) {
      case 'maior que': {
        const arr = data.filter((e) => Number(e[cl]) > Number(qt));
        setData(arr);
      }
        break;
      case 'menor que': {
        const arr = data.filter((e) => Number(e[cl]) < Number(qt));
        setData(arr);
      }
        break;
      case 'igual a': {
        const arr = data.filter((e) => Number(e[cl]) === Number(qt));
        setData(arr);
      }
        break;
      default: break;
      }
    });
  }, [filters]);

  const contextValue = useMemo(() => ({
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
    colArr,
    columnArr,
  }), [colArr, column, columnArr, data, filterSelect, name, operator, quanti]);

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
