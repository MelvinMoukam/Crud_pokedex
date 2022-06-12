import React, {FunctionComponent, useState} from 'react'
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon'


const PokemonAdd: FunctionComponent= ()=>{
    const [id]=useState <number> (new Date().getTime());//On génère un identifiant unique pour notre futur pokemon en utilisant la methode getTime qui est native en Js et qui renvoi le nbre de millisecondes écoulé depuis le 1 janv 1970
    const [pokemon]= useState<Pokemon>(new Pokemon(id));// On crée un nouveau pokemon vierge en lui passant l'identifiant


    return (

        <div>
            <h2 className="header center">Ajouter un pokémon</h2>
            <PokemonForm pokemon={pokemon}  isEditForm={false}></PokemonForm>
        </div>
    );
}
export default PokemonAdd