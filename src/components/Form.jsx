import React, { useContext } from 'react';
import myContext from '../context/myContext';

export default function Forms() {
  const { name, handleName } = useContext(myContext);
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
        {/*
        <br />

        <label htmlFor="gender">
          Gênero:
          <select
            name="gender"
            id="gender"
            value={ gender }
            onChange={ handleGender }
          >
            <option value="">Todos</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </label>

        <br />

        <label htmlFor="episodes">
          Episódios:
          <select
            name="episodes"
            id="episodes"
            value={ episodes }
            onChange={ handleEpisodes }
          >
            <option value="Maior que">Maior que</option>
            <option value="Menor que">Menor que</option>
            <option value="Igual a">Igual a</option>
          </select>
        </label>

        <br />
        <label htmlFor="quanti">
          <input
            type="text"
            value={ quanti }
            onChange={ handleQuanti }
          />
        </label>
        <button>
          Filtrar episódio
        </button> */}
      </div>
    </form>
  );
}
