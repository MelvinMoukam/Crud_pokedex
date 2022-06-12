import React, { FunctionComponent,useState } from 'react';
import Pokemon from '../models/pokemon';
import './pokemon-card.css'
import formatType from '../Aides/format-type';
import { useHistory } from 'react-router-dom';
  
type Props = { // Vérification du type de la propriété d'entrée 
  pokemon: Pokemon
  borderColor?:string // Ajout d'une props par défaut
};


  //nous lisons notre type Props à notre propriété d'entrée et récupérons  la valeur du pokemon grace à la destructuration
const PokemonCard: FunctionComponent<Props> = ({pokemon,borderColor='#009688' }) => {
  
  const [color, setColor]=useState<string> () ;// Etat pour stocker la couleur actuelle de la bordure 
  const history =useHistory();
  
  const showBorder = ()=>{
    setColor(borderColor); //sauvergarde de la couleur de la valeur initiale 
  }

  const hideBorder = ()=>{
    setColor('#f5f5f5'); // On remet la bordure en gris
  }
//Définition d'une nouvelle méthode de gestion des évènements
const goToPokemon = (id:number) => {
history.push(`/pokemons/${id}`);

}
 



  return (
    <div className="col s6 m4" onClick={()=>goToPokemon(pokemon.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
      <div className="card horizontal" style={{borderColor:color}}>
        <div className="card-image"> 
          <img src={pokemon.picture} alt={pokemon.name}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            {pokemon.type.map(types =>(// Ajout de la liste des types d'un pokemon les uns à la suite des autres 
                <span key={types} className={formatType(types)}>{types}</span>
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
}
  
export default PokemonCard;