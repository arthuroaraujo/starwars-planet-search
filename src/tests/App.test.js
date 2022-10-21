import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData'

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

  test('Testando o maior que', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData
    }));
    render(<App />);

    await waitFor(() => {
      const tatooine = screen.getByRole('cell', {
        name: /tatooine/i
      });
      expect(tatooine).toBeInTheDocument();
    })

    const inputColumnEl = screen.getByTestId('column-filter');
    userEvent.selectOptions((inputColumnEl), ['population']);

    const inputOperatorEl = screen.getByTestId('comparison-filter');
    userEvent.selectOptions((inputOperatorEl), ['maior que']);

    const inputValueEl = screen.getByTestId('value-filter');
    userEvent.type(inputValueEl, '10000');

    const buttonEl = screen.getByTestId('button-filter');
    userEvent.click(buttonEl);

    await waitFor(() => {
      const tatooine = screen.getByRole('cell', {
        name: /tatooine/i
      });
      expect(tatooine).toBeInTheDocument();
    })
    });

    test('Testando o menor que', async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => testData
      }));
      render(<App />);
  
      await waitFor(() => {
        const tatooine = screen.getByRole('cell', {
          name: /tatooine/i
        });
        expect(tatooine).toBeInTheDocument();
      })
  
      const inputColumnEl = screen.getByTestId('column-filter');
      userEvent.selectOptions((inputColumnEl), ['population']);
  
      const inputOperatorEl = screen.getByTestId('comparison-filter');
      userEvent.selectOptions((inputOperatorEl), ['menor que']);
  
      const inputValueEl = screen.getByTestId('value-filter');
      userEvent.type(inputValueEl, '10000');
  
      const buttonEl = screen.getByTestId('button-filter');
      userEvent.click(buttonEl);
  
      await waitFor(() => {
        const yavinIV = screen.getByRole('cell', {
          name: /yavin iv/i
        });
        expect(yavinIV).toBeInTheDocument();
      })
      });

      test('Testando o igual a', async () => {
        global.fetch = jest.fn(async () => ({
          json: async () => testData
        }));
        render(<App />);
    
        await waitFor(() => {
          const tatooine = screen.getByRole('cell', {
            name: /tatooine/i
          });
          expect(tatooine).toBeInTheDocument();
        })
    
        const inputColumnEl = screen.getByTestId('column-filter');
        userEvent.selectOptions((inputColumnEl), ['population']);
    
        const inputOperatorEl = screen.getByTestId('comparison-filter');
        userEvent.selectOptions((inputOperatorEl), ['igual a']);
    
        const inputValueEl = screen.getByTestId('value-filter');
        userEvent.type(inputValueEl, '1000');
    
        const buttonEl = screen.getByTestId('button-filter');
        userEvent.click(buttonEl);
    
        await waitFor(() => {
          const yavinIV = screen.getByRole('cell', {
            name: /yavin iv/i
          });
          expect(yavinIV).toBeInTheDocument();
        })
        });
});

