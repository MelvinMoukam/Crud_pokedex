import React, { FunctionComponent,useState} from 'react'
import Pokemon from '../models/pokemon';
import formatType from '../Aides/format-type';
import {useHistory} from 'react-router-dom'
import PokemonService from '../services/pokemon-service';
  
type Props = {
  pokemon: Pokemon
  isEditForm: boolean
};
//Modéliser un champ dans notre formulaire
type Field={
    value:any,
    error?:string,
    isValid?:boolean
}

type Form={
    name:Field,
    HP:Field,
    Attack:Field,
    Defense:Field,
    Speed:Field,
    types:Field,
    picture:Field
}



 
const PokemonForm: FunctionComponent<Props> = ({pokemon, isEditForm}) => {
  
    const[form, setForm]=useState<Form>({
name:{ value: pokemon.name, isValid: true},
HP:{ value: pokemon.HP, isValid: true},
Attack:{ value: pokemon.Attack, isValid: true},
Defense:{ value: pokemon.Defense, isValid: true},
Speed:{ value: pokemon.Speed, isValid: true},
types:{ value: pokemon.type, isValid: true},
picture:{ value: pokemon.picture}



});

const history =useHistory();
  const types: string[] = [
    'Grass', 'Fire', 'Water', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Flying', 'Combat', 'Bug'
  ];
//Renvoie un simple boolean permettant de savoir si le type passé en paramètre appartient ou non au pokemon
const hasType=(type:string):boolean =>{
    return form.types.value.includes(type);
}
//Methode pour prendre en compte les modif du formulaire et le pousser dans le state du pokemon
const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>) =>{
    const fieldName:string =e.target.name;
    const fieldValue: string =e.target.value;
    const newField:Field ={
        [fieldName]: { value: fieldValue },
        value: undefined
    };

    setForm({...form, ...newField});
}

const selectType = (type: string , e: React.ChangeEvent<HTMLInputElement>): void =>{

    const checked =e.target.checked;
    let newField:Field;
    
    if(checked){
        //si l'utilisateur coche un type,on l'ajoute à la liste des types du pokemons
        const newTypes:string[]= form.types.value.concat([type]);
        newField ={ value: newTypes};
    }else {
        //si l'utilisateur décoche un type, on le retire de la liste des types de pokemon
        const newTypes:string[]=form.types.value.filter((currentType: string)=>currentType !== type);
        newField ={ value: newTypes};
    }

    setForm({...form, ...{types:newField}});
}
// Methode persiste les modifications éffectuées sur le pokemon lors de la modification 
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{

    e.preventDefault();
    const isFormValid = validateForm();

    if(isFormValid){
      pokemon.picture = form.picture.value;
      pokemon.name = form.name.value;
      pokemon.HP = form.HP.value;
      pokemon.Attack = form.Attack.value;
      pokemon.Defense = form.Defense.value;
      pokemon.Speed = form.Speed.value;
      pokemon.type = form.types.value;

isEditForm? updatePokemon(): addPokemon();
   
    }
    
}
const isAddForm =() => {

  return !isEditForm;
}
const validateForm=() =>{
    let newForm: Form =form;


    //Validation url
if(isAddForm()){
  const start = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
  const end =".png";

  if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)){
    const errorMsg: string ="L'url n'est pas valide.";
    const newField: Field ={value: form.picture.value, error:errorMsg, isValid:false};
    newForm ={...form ,...{picture:newField}}
  }else{
    
    const newField: Field ={value: form.picture.value, error:'', isValid:true};
    newForm ={...form ,...{picture:newField}}
  }
}


    // Validator name

    if(!/^[a-zA-Zàéè]{3,25}$/.test(form.name.value)){ // ici , on définit un moule qui permet de tester les chaines de caractères pour savoir si elle respecte ce moule ou non
        const errorMsg: string ='Le nom du pokemon est requis(1-25).';
        const newField:Field ={value:form.name.value, error:errorMsg, isValid:false};
        newForm ={...newForm, ...{name:newField}};

    }else{
        const newField:Field ={ value:form.name.value, error:'',isValid:true};
        newForm ={...newForm, ...{name:newField}};
    }

    // Validator HP

    if(!/^[0-9]{1,3}$/.test(form.HP.value)){
        const errorMsg: string ='La valeur Hp du pokemon est comprise entre 0 et 999.';
        const newField:Field ={value:form.HP.value, error:errorMsg, isValid:false};
        newForm ={...newForm, ...{HP:newField}};

    }else{
        const newField:Field ={ value:form.HP.value, error:'',isValid:true};
        newForm ={...newForm, ...{HP:newField}};
    }

     // Validator Attack

     if(!/^[0-9]{1,3}$/.test(form.Attack.value)){
        const errorMsg: string ='La valeur Attack du pokemon est comprise entre 0 et 999.';
        const newField:Field ={value:form.Attack.value, error:errorMsg, isValid:false};
        newForm ={...newForm, ...{Attack:newField}};

    }else{
        const newField:Field ={ value:form.Attack.value, error:'',isValid:true};
        newForm ={...newForm, ...{Attack:newField}};
    }

     // Validator Defense

     if(!/^[0-9]{1,3}$/.test(form.Defense.value)){
        const errorMsg: string ='La valeur  Defense du pokemon est comprise entre 0 et 999.';
        const newField:Field ={value:form.Defense.value, error:errorMsg, isValid:false};
        newForm ={...newForm, ...{ Defense:newField}};

    }else{
        const newField:Field ={ value:form.Defense.value, error:'',isValid:true};
        newForm ={...newForm, ...{ Defense:newField}};
    }


        // Validator Speed

        if(!/^[0-9]{1,2}$/.test(form.Speed.value)){
            const errorMsg: string ='La valeur  Speed du pokemon est comprise entre 0 et 99.';
            const newField:Field ={value:form.Speed.value, error:errorMsg, isValid:false};
            newForm ={...newForm, ...{ Speed:newField}};
    
        }else{
            const newField:Field ={ value:form.Speed.value, error:'',isValid:true};
            newForm ={...newForm, ...{ Speed:newField}};
        }

        setForm(newForm);
return newForm.name.isValid && newForm.HP.isValid && newForm.Attack.isValid && newForm.Defense.isValid && newForm.Speed.isValid;
    

}
//Cette methode s'occupe de renvoyer un boolean pou savoir si une case à cocher doit etre verouiller ou non
const isTypesValid =(type: string):boolean =>{

    if(form.types.value.length===1 && hasType(type)){
        return false;
    }

    if(form.types.value.length >=3 && !hasType(type)){
        return false;
    }
 return true;
}

const addPokemon =() =>{
  PokemonService.addPokemon(pokemon).then(()=> history.push(`/pokemons`))
}

const updatePokemon =() =>{
  PokemonService.updatePokemon(pokemon).then(()=>history.push(`/pokemons/${pokemon.id}`));

}

const deletePokemon =()=> {

  PokemonService.deletePokemon(pokemon).then(()=> history.push(`/pokemons`));
}


  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
          {isEditForm && (
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
     <span className="btn-floating halfway-fab waves-effect waves-light">
      <i onClick={deletePokemon} className="material-icons">delete</i>
     </span>
            </div>
            )}
            <div className="card-stacked">
              <div className="card-content">

                {/* Pokemon image */}
                {isAddForm()&&(
                  <div className="form-group">
                  <label htmlFor="name">Image</label>
                  <input id="name" name="picture" type="text" className="form-control" value={form.picture.value} onChange= {e =>handleInputChange(e)}></input>
               {form.picture.error &&
               <div className="card-panel red accent-1">
                {form.picture.error}
                </div>
               }
                </div>
                )}
                

                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange= {e =>handleInputChange(e)}></input>
               {form.name.error &&
               <div className="card-panel red accent-1">
                {form.name.error}
                </div>
               }
               
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">HP</label>
                  <input id="hp" name="HP" type="number" className="form-control"value={form.HP.value} onChange= {e =>handleInputChange(e)}  ></input>
                  {form.HP.error &&
               <div className="card-panel red accent-1">
                {form.HP.error}
                </div>
               }
                
                </div>
                {/* Pokemon Attack */}
                <div className="form-group">
                  <label htmlFor="attack">Attack</label>
                  <input id="attack" name="Attack" type="number" className="form-control" value={form.Attack.value} onChange= {e =>handleInputChange(e)} ></input>
                  {form.Attack.error &&
               <div className="card-panel red accent-1">
                {form.Attack.error}
                </div>
               }
                
                </div>
                {/* Pokemon Defense */}
                <div className="form-group">
                  <label htmlFor="Defense">Defense</label>
                  <input id="Defense" name="Defense" type="number" className="form-control" value={form.Defense.value} onChange= {e =>handleInputChange(e)} ></input>
                  {form.Defense.error &&
               <div className="card-panel red accent-1">
                {form.Defense.error}
                </div>
               }
                
                </div>
                {/* Pokemon Speed */}
                <div className="form-group">
                  <label htmlFor="Speed">Speed</label>
                  <input id="Speed" name="Speed" type="number" className="form-control" value={form.Speed.value} onChange= {e =>handleInputChange(e)}></input>
                  {form.Speed.error &&
               <div className="card-panel red accent-1">
                {form.Speed.error}
                </div>
               }
                
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypesValid(type)}checked={hasType(type)} onChange={e =>selectType(type, e)} ></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
   
export default PokemonForm;