import React , { FunctionComponent} from 'react';
import PokemonList from './pages/pokemon-list';
import {BrowserRouter as Router , Switch,Route, Link} from 'react-router-dom';
import PageNotFound from './pages/page_non existante';
import PokemonEdit from './pages/pokemon-edit';
import PokemonAdd from './pages/pokemon-add';

import PokemonsDetail from './pages/pokemon-détail';

//Nous gérons les importations ici
const App: FunctionComponent = ()=> {

  
  return (
<Router>

  <div>
    {/*La barre de navigation commune à toutes les pages */}
    <nav>
      <div className="nav-wrapper teal">

        <Link to="/" className="brand-logo center">Pokédex</Link>
      </div>
    </nav>
    {/* Le système de gestion des routes de notre application */}
    <Switch>
<Route exact path="/" component={PokemonList} />
<Route exact path="/pokemons" component={PokemonList} />
<Route exact path="/pokemons/add" component={PokemonAdd} />
<Route  path="/pokemons/edit/:id" component={PokemonEdit} />
<Route  path="/pokemons/:id" component={PokemonsDetail} />
<Route  component={PageNotFound} //toutes les routes qui ne seront pas interceptées par le système de navigation seront rédirigées vers la page non exitante 
/>




    </Switch>
  </div>
</Router>
  )

}



export default App;
