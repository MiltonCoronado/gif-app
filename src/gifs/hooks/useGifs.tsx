import { useRef, useState } from 'react';
import { getGifsByQuery } from '../actions/get-gif-by-query.action';
import type { Gif } from '../interfaces/gif.interface';

//Utility Type: Record<K, V> - Es un "Mapped Type"
//(Tipo Mapeado). Funciona como un molde dinámico
//que construye un objeto en tiempo real, transformando
//las llaves (K) en keys que apuntan a un value (V).
//Ideal para "diccionarios" ya que un objeto parece un
//"diccionario" (palabra: definicion || key: value)
//donde no conocemos los nombres de las "keys" de
//antemano.

//Sacamos el objeto "gifsCache = {}" fuera del componente
//ya que al cambiar el estado este vuelve a renderizar
//el cutomHook ó el componente y este re-render no
//haga que se pierda el registro ó cache(key; value)
//guardado en el objeto "gifsCache = {}".

// const gifsCache: Record<string, Gif[]> = {};

const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]); //los Hooks solo manejan "genericos" mas no los objetos.
  const [gifslList, setGifsList] = useState<Gif[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({}); //es un Hook que maneja la persistencia(cache) sin disparar re-renderizados .current es la propiedad donde se guarda y consulta el valor real.

  const handleTermClicked = async (term: string) => {
    //consulto si en el objeto(gracias al .current) existe la key que contiene la variable "term" que al final es un simple string.
    if (gifsCache.current[term]) {
      setGifsList(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setGifsList(gifs);

    const myExplicitTypingGifs: Gif[] = gifs;
    gifsCache.current[term] = myExplicitTypingGifs;
  };

  const handleSearch = async (query: string = '') => {
    const newQuery = query.toLowerCase().trim();
    if (newQuery.length === 0) return;
    if (previousTerms.includes(newQuery)) return;

    setPreviousTerms([newQuery, ...previousTerms].slice(0, 8)); //(spread operator): crea una nueva copia del array para que React detecte el cambio de referencia y actualice la interfaz.

    const gifs = await getGifsByQuery(query);
    setGifsList(gifs);

    //Aca guardo el dato para el objeto que es (key: value) con el .current(de useRef()) y el operador de asignacion(=) necesario para la introduccion de un dato(key: value) dentro de un objeto.
    const myExplicitTypingGifs: Gif[] = gifs;
    gifsCache.current[query] = myExplicitTypingGifs;
  };

  return {
    //Properties/Values.
    gifslList,
    previousTerms,
    //method/Actions.
    handleSearch,
    handleTermClicked,
  };
};

export { useGifs };
