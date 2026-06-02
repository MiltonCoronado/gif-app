import { describe, expect, test, vi } from 'vitest';
import { SearchBar } from './SearchBar';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('SearchBar', () => {
  test('Shoul render  searchbar correctly', () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });

  test('Should call onQuery with the correct value after 3000ms', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test de Milton Coronado' } });

    await waitFor(
      () => {
        expect(onQuery).toHaveBeenCalled();
        expect(onQuery).toHaveBeenCalledWith('test de Milton Coronado');
      },
      { timeout: 3500 },
    );
  });

  test('Should called once with the last value', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 't' } });
    fireEvent.change(input, { target: { value: 'te' } });
    fireEvent.change(input, { target: { value: 'tes' } });
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(
      () => {
        expect(onQuery).toHaveBeenCalledWith('test');
        expect(onQuery).toHaveBeenCalledTimes(1);
      },
      { timeout: 3500 },
    );
  });

  test('Should call Onquery when the button clicked with the input value', () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test de Milton Coronado' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(input).toBeDefined();
    expect(button).toBeDefined();
    expect(onQuery).toHaveBeenCalled();
    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith('test de Milton Coronado');
  });

  test('Should the input has the correct placeholder value', () => {
    const placeholder = 'Milton es Genial';
    render(<SearchBar onQuery={() => {}} placeholder={placeholder} />);

    expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
  });
});
