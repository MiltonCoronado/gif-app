import axios from 'axios';

//Instancia de axios con una URL base 'https://api.giphy.com/v1/gifs' cortada justo antes del "/search?"
const giphyApi = axios.create({
  //despues de "/gifs" ya podriamos tener el "/search" ó el "?"(query) osea mandar a llamar a cualquier end-point.
  //ya que esta es la URL Base:
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    //estos son parametros en comun por eso estos params van aca, compartido para toda la peticion Get.
    lang: 'es',
    api_key: import.meta.env.VITE_GIPHY_API_KEY,
  },
});

export { giphyApi };
