import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  test('Should initialize with default value of 10', () => {
    /*renderHook tal como se describe, renderiza un Hook 
    y se desestructura la palabra "result".*/
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(10);
  });

  test('Should initialize with value 20', () => {
    const initialValue = 20;
    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.counter).toBe(20);
  });

  test('Should increment counter when handleadd is called', () => {
    const { result } = renderHook(() => useCounter());

    /*el "act" es para mandar a que una Fn. se ejecute y
    que enrealidad reprodusca lo que la Fn. realiza.*/
    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(11);
  });

  test('Should decrement counter when handleSubtract is called', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleSubtract();
      result.current.handleSubtract();
      result.current.handleSubtract();
      result.current.handleSubtract();
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(5);
  });

  test('Should reset to initialValue the counter when handleReset is called', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleSubtract();
      result.current.handleSubtract();
      result.current.handleSubtract();
      result.current.handleSubtract();
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(5);

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.counter).toBe(10);
  });
});
