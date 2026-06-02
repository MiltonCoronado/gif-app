import { describe, expect, test } from 'vitest';
import { giphyApi } from './giphy.api';

describe('giphyApi', () => {
  test('Should be configured correctly', () => {
    // console.log(giphyApi);
    const params = giphyApi.defaults.params;

    expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
    expect(params.lang).toBe('es');
    expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY); //.toBE para evaluar primitivos. "En instancias de axios".

    //.toStricEqual para evaluar objetos que no sean properties. En "instancias de axios"
    expect(params).toStrictEqual({
      lang: 'es',
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
    });
  });
});
