import { giphyApi } from '../api/giphy.api'; //Es la instacia de axios.

import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';

const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  try {
    if (query.trim().length === 0) {
      return [];
    }
    //Axios ó su Instancia si acepta genericos, no como fetch()!!!
    const response = await giphyApi<GiphyResponse>('/search', {
      //object configuration.
      params: {
        q: query,
        limit: 10,
      },
    });

    //Patron mapper (mapear la data): tranformar una data que luce de una forma a tranformarla en otra(siendoLaMismasData)
    return response.data.data.map((gif) => ({
      id: gif.id,
      title: gif.title,
      url: gif.images.original.url,
      width: Number(gif.images.original.width),
      height: Number(gif.images.original.height), //con la Fn. constructora Number(), trasforma un string a numero.
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getGifsByQuery };
