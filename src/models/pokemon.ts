

export default class Pokemon {

    // Typage des propriétés d'un pokemon 
    id : number;
    name: string;
    type: Array<string>;
    HP: number;
    Attack: number;
    Defense: number;
    Speed: number;
    picture: string;
    created: any;

    // Définition des valeurs par défaut des propiétés d'un pokemon 
    constructor(
    id : number,
    name: string= 'name',
    type: Array<string>= ["Grass", "Poison"],
    HP: number=45,
    Attack: number=49,
    Defense: number=49,
    Speed: number=45,
    picture: string='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/xxx.png'
    ){
    // Initialisation des propriétés d'un pokemon

    this.id =id;
    this.name=name;
    this.type=type;
    this.HP= HP;
    this.Attack=Attack;
    this.Defense=Defense;
    this.Speed= Speed;
    this.picture =picture;

    }


}