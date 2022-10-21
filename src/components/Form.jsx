import React, { useContext } from 'react';
import myContext from '../context/myContext';

export default function Forms() {
  const { name,
    handleName,
    column,
    handleColumn,
    operator,
    handleOperator,
    quanti,
    handleQuanti,
    filterSelect,
    columnArr,
  } = useContext(myContext);

  return (
    <form>
      <div>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="name-filter"
            type="text"
            id="name"
            value={ name }
            onChange={ handleName }
          />
        </label>
        <label htmlFor="column-filter">
          Coluna:
          <select
            data-testid="column-filter"
            name="column-filter"
            id="column-filter"
            value={ column }
            onChange={ handleColumn }
          >
            {
              columnArr?.map((e) => (<option key={ e } value={ e }>{e}</option>))
            }
            {/* <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option> */}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador:
          <select
            data-testid="comparison-filter"
            name="comparison-filter"
            id="comparison-filter"
            value={ operator }
            onChange={ handleOperator }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="quanti">
          <input
            data-testid="value-filter"
            type="number"
            value={ quanti }
            onChange={ handleQuanti }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => filterSelect() }
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}
