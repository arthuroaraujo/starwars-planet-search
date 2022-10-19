import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  //     const [name, setName] = useState('');
  //     const [gender, setGender] = useState('');
  //     const [episodes, setEpisodes] = useState('Maior que');
  //     const [quanti, setQuanti] = useState('');

  //    const handleName = ({ target }) => {
  //     setName(target.value)
  //     };

  //     const handleGender = ({ target }) => {
  //      setGender(target.value)
  //     };

  //     const handleEpisodes = ({ target }) => {
  //      setEpisodes(target.value)
  //        };

  //     const handleQuanti = ({ target }) => {
  //      setQuanti(target.value)
  //        };

  // const filterSelect = (array) => {
  //     return array.filter((e) => {
  //         switch(episode) {
  //             case 'Maior que': return Number(e.)
  //         }
  //     })
  // }
  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setData(results);
      console.log(results);
    };
    requestAPI();
  }, []);

  const contextValue = useMemo(() => ({ data }), [data]);

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
