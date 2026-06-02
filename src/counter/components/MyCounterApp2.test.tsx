import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { MyCounterApp } from './MyCounterApp';

//!All this es para asegurar que las funciones fueron llamadas del componente. Mas no llamadas del customHook.
const handleAddMock = vi.fn();
const handleResetMock = vi.fn();
const handleSubtractMock = vi.fn();

vi.mock('../hooks/useCounter', () => ({
  useCounter: () => ({
    counter: 40,
    handleAdd: handleAddMock, //vi.fn()
    handleReset: handleResetMock, //vi.fn()
    handleSubtract: handleSubtractMock, //vi.fn()
  }),
}));

describe('MyCounterApp', () => {
  test('should render the component', () => {
    render(<MyCounterApp />);

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      'counter: 40',
    );
    expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
  });

  test('should call handleAdd if button is clicked', () => {
    render(<MyCounterApp />);

    const button = screen.getByRole('button', { name: '+1' });
    fireEvent.click(button);

    //Aca realizamos esto para asegurarnos que la funcion fue llamada.
    expect(handleAddMock).toHaveBeenCalled();
    expect(handleAddMock).toHaveBeenCalledTimes(1);
    expect(handleResetMock).not.toHaveBeenCalled();
    expect(handleSubtractMock).not.toHaveBeenCalled();
  });
});
