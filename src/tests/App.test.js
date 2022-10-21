import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockFetch } from '../../cypress/mocks/fetch'

describe('Testando a aplicação', () => {
  test('Testando o input name', async () => {
    render(<App />);
    const nameEl = screen.getByText(/nome:/i);
    const inputNameEl = screen.getByTestId('name-filter');

    expect(nameEl).toBeInTheDocument();
    expect(inputNameEl).toBeInTheDocument();

    userEvent.type(inputNameEl, 'oo');
  });

  test('Testando o input column', async () => {
    render(<App />);
    const columnEl = screen.getByText(/coluna:/i);
    const inputColumnEl = screen.getByTestId('column-filter');

    expect(columnEl).toBeInTheDocument();
    expect(inputColumnEl).toBeInTheDocument();

    userEvent.selectOptions((inputColumnEl), ['population']);
    expect(screen.getByRole('option', {name: 'population'}).selected).toBe(true);
    });

  test('Testando o input operator', async () => {
    render(<App />);
    const operatorEl = screen.getByText(/operador:/i);
    const inputOperatorEl = screen.getByTestId('comparison-filter');

    expect(operatorEl).toBeInTheDocument();
    expect(inputOperatorEl).toBeInTheDocument();

    userEvent.selectOptions((inputOperatorEl), ['menor que']);
    expect(screen.getByRole('option', {name: 'menor que'}).selected).toBe(true)
    });

  test('Testando o input value', async () => {
    render(<App />);
    const inputValueEl = screen.getByTestId('value-filter');

    expect(inputValueEl).toBeInTheDocument();

    userEvent.type(inputValueEl, '10000');
    });

  test('Testando o botão', async () => {
    render(<App />);
    const buttonEl = screen.getByTestId('button-filter');
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toBeEnabled();
    });

  test('Testando o fetch', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockFetch
    }));
    render(<App />);

    await waitFor(() => {
      const tatooine = screen.getByRole('cell', {
        name: /tatooine/i
      });
      expect(tatooine).toBeInTheDocument();
    })
    });
});

