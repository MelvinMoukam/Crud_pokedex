import Pokemon from "../models/pokemon";
 
export default class PokemonService {
 
  static getPokemons(): Promise<Pokemon[]> {
    return fetch('http://localhost:3003/pokemons')
      .then(response => response.json());
  }
 
  static getPokemon(id: number): Promise<Pokemon|null> {
    return fetch(`http://localhost:3003/pokemons/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data);

  }

  static updatePokemon(pokemon:Pokemon):Promise<Pokemon>{
   return fetch(`http://localhost:3003/pokemons/${pokemon.id}`,{
   method:'PUT',
   body:JSON.stringify(pokemon),
   headers:{'Content-Type':'application/json'}
   })
   .then(response => response.json());
  }

  static deletePokemon(pokemon:Pokemon):Promise<{}>{

      return  fetch(`http://localhost:3003/pokemons/${pokemon.id}`,{
        method:'DELETE',
        headers: {'Content-Type': 'application/json'}

  })
  .then(response => response.json())
  }

  static addPokemon(pokemon:Pokemon):Promise<Pokemon>{
   
    return fetch(`http://localhost:3003/pokemons/${pokemon.id}`,{
    method:'POST',
    body:JSON.stringify(pokemon),
    headers:{'Content-Type':'application/json'}
    })
    .then(response => response.json());
   }


  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  
}