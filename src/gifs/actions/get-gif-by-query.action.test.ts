import { beforeEach, describe, expect, test, vi } from 'vitest';

import AxiosMockAdapter from 'axios-mock-adapter';

import { giphyApi } from '../api/giphy.api';
import { mockGiphySearchResponse } from '../../../tests/mocks/giphy.response.data';
import { getGifsByQuery } from './get-gif-by-query.action';

describe('getGifsByQuery', () => {
  /*Acá creamos una nueva instancia de "AxiosMockAdapter" 
  pasando la instancia de "axios" (giphyApi) para 
  interceptar y bloquear cualquier petición a la web.
  Listo para correr en cada Test.*/
  let mock = new AxiosMockAdapter(giphyApi);

  /*beforeEach(). Ciclo de vida que corre ANTES de 
  cada Test. Acá reinicia el "AxiosMockAdapter" 
  creando una nueva instancia limpia para evitar 
  contaminación entre pruebas.*/
  beforeEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
  });

  test('Should return a list of gifs', async () => {
    //mockGiphySearchResponse es la respuesta de la API que viene copiada tal cual del file tests/mocks...(postman)
    mock.onGet('/search').reply(200, mockGiphySearchResponse);

    const gifs = await getGifsByQuery('asuka');

    expect(gifs.length).toBe(10);

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe('string');
      expect(typeof gif.title).toBe('string');
      expect(typeof gif.url).toBe('string');
      expect(typeof gif.width).toBe('number');
      expect(typeof gif.height).toBe('number');
    });
  });

  test('Should return an empty list of gifs if query is empty', async () => {
    /*Esta línea apaga el AxiosMockAdapter. Desactiva 
    por completo el clonador y le devuelve a la 
    instancia "giphyApi" su comportamiento original.
    esto para todos los test. pero estos se restablesen 
    gracias al "beforeEach" arriba inicializando todo.*/
    mock.restore();

    const gifs = await getGifsByQuery('');

    expect(gifs.length).toBe(0);
  });

  test('Should handle error when the API returns an error', async () => {
    /*Se crea un espía "spyOn(console, 'error')" para rastrear 
    si el código genera errores, pero intercepta y muta su 
    comportamiento con un "mockImplementation(() => {})" vacio.  
    Para evitar que los mensajes de error ensucien la consola*/
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    mock.onGet('/search').reply(400, {
      Data: {
        message: 'Salio Mal y ya esta',
      },
    });

    const gif = await getGifsByQuery('asuka');

    expect(gif.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(expect.anything());
  });
});
