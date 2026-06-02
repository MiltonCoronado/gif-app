import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useGifs } from './useGifs';

import * as gifActions from '../actions/get-gif-by-query.action';

describe('useGifs', () => {
  test('Should return default values and methods', () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifslList.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleTermClicked).toBeDefined();
    expect(result.current.handleSearch).toBeDefined();
  });

  test('Should return a list of gifs', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('asuka');
    });

    expect(result.current.gifslList.length).toBe(10);
  });

  test('Should return a list of gifs when handleTermClicked is called', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked('misato');
    });

    expect(result.current.gifslList.length).toBe(10);
  });

  test('Should return a list of gifs from cache', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked('asuka');
    });

    expect(result.current.gifslList.length).toBe(10);

    /* Crea un espía sobre la Fn. que ya pasa ha ser un metodo como segundo 
    argumento 'getGifsByQuery' del OBJETO/modulo 'gifActions' y falsea su 
    comportamiento para que, en lugar de completarse con éxito, falle 
    inmediatamente enviando una promesa rechazada pero esto comprueba que
    la informacion viene del cache y "ESTO ES DE VITEST"*/
    vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(
      new Error('this is my custom error'),
    );

    await act(async () => {
      await result.current.handleTermClicked('asuka');
    });

    expect(result.current.gifslList.length).toBe(10);
  });

  test('Not return a list of gifs more than 8', async () => {
    /* Crea un espía sobre la Fn. 'getGifsByQuery' del módulo 'gifActions' 
    y falsea su comportamiento para que, en lugar de ejecutar su código real, 
    resuelva inmediatamente devolviendo una promesa con un arreglo vacío ([]). 
    "ESTO ES DE VITEST"*/
    vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('asuka1');
    });
    await act(async () => {
      await result.current.handleSearch('asuka2');
    });
    await act(async () => {
      await result.current.handleSearch('asuka3');
    });
    await act(async () => {
      await result.current.handleSearch('asuka4');
    });
    await act(async () => {
      await result.current.handleSearch('asuka5');
    });
    await act(async () => {
      await result.current.handleSearch('asuka6');
    });
    await act(async () => {
      await result.current.handleSearch('asuka7');
    });
    await act(async () => {
      await result.current.handleSearch('asuka8');
    });
    await act(async () => {
      await result.current.handleSearch('asuka9');
    });
    await act(async () => {
      await result.current.handleSearch('asuka10');
    });

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      'asuka10',
      'asuka9',
      'asuka8',
      'asuka7',
      'asuka6',
      'asuka5',
      'asuka4',
      'asuka3',
    ]);
  });
});
