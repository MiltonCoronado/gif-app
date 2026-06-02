import { describe, expect, test } from 'vitest';
import { MyCounterApp } from './MyCounterApp';
import { fireEvent, render, screen } from '@testing-library/react';

describe('MyCounterApp', () => {
  test('Should render the component', () => {
    render(<MyCounterApp />);

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      'counter: 10',
    );
    expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
  });

  test('Should increment the counter', () => {
    render(<MyCounterApp />);

    const labelh1 = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '+1' });
    fireEvent.click(button);

    expect(labelh1.innerHTML).toBe('counter: 11');
  });

  test('Should decrement the counter', () => {
    render(<MyCounterApp />);

    const labelh1 = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '-1' });
    fireEvent.click(button);

    expect(labelh1.innerHTML).toContain('counter: 9');
  });
});
