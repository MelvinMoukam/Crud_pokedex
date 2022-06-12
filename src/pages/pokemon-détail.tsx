
import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import formatType from '../Aides/format-type';
import PokemonService from '../services/pokemon-service';
  //id que nous irons récupérer au niveau de l'url
type Params = { id: string };
  
const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
  
  useEffect(() => {
   PokemonService.getPokemon(+match.params.id).then(pokemon => setPokemon(pokemon));
  }, [match.params.id]);
    
  return (
    <div>
      { pokemon ? (
        <div className="row">
          <div className="col s12 m8 offset-m2"> 
            <h2 className="header center">{ pokemon.name }</h2>
            <div className="card hoverable"> 
              <div className="card-image">
                <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
                <Link to={`/pokemons/edit/${pokemon.id}` } className= "btn btn-floating halfway-fab waves-effect waves-light">
                  <i className="material-icons">edit</i>
                 </Link>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr> 
                        <td>Nom</td> 
                        <td><strong>{ pokemon.name }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Hp</td> 
                        <td><strong>{ pokemon.HP }</strong></td> 
                        
                    </tr> 

                    <tr>
                    <td>Attack</td>
                    <td><strong>{ pokemon.Attack }</strong></td> 
                     </tr>

                     <tr>
                    <td>Defense</td>
                    <td><strong>{ pokemon.Defense }</strong></td> 
                     </tr>

                     <tr>
                    <td>Speed</td>
                    <td><strong>{ pokemon.Speed }</strong></td> 
                     </tr>
                       
                      <tr> 
                        <td>Types</td> 
                        <td>
                          {pokemon.type.map(types => (
                           <span key={types} className={formatType(types)}>{types}</span>
                          ))}</td> 
                      </tr> 
                      
                    </tbody>
                  </table>
                </div>
                <div className="card-action">
                  <Link to="/">Retour</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
}
  
export default PokemonsDetail;