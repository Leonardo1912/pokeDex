import React, {useEffect} from "react";
import style from "./PokeDex.module.css"
import {useDispatch, useSelector} from "react-redux";
import {requestNewPokemons, requestPokemons,} from "../../redux/redux-store/pokeDexReducer";

const PokeDex = (props) => {
    return (
        <div className={style.pokedex}>
            <div className={style.header}>Pokedex</div>
            <div className={style.content}>
                <div className={style.pokemonsList}><Pokemons/></div>
                <div className={style.singlePokemon}>Pokemon</div>
            </div>
        </div>
    )
}

const Pokemons = (props) => {
    let pokemons = useSelector(state => state.pokemonPage.pokemons)
    let pageLimit = useSelector(state => state.pokemonPage.pageLimit)
    let nextPage = useSelector(state => state.pokemonPage.nextPage)
    const dispatch = useDispatch();
    let loadMore =  () => dispatch(requestNewPokemons(nextPage))

    useEffect(() => {
        dispatch(requestPokemons(pageLimit))
    }, [])

    return (
        <div>
            <div className={style.pokemons}>
                {pokemons.map( pokemon => <Pokemon pokemon={pokemon}/> )}
            </div>
            <div className={style.loadMore}>
                <button onClick={loadMore}>Load More</button>
            </div>
        </div>
    )
}
const Pokemon = (props) => {
    return(
        <div className={style.pokemon}>
            <div className={style.photoPokemon}><img src="" className={style.photo}/></div>
            <div className={style.pokemonName}>{props.pokemon.name}</div>
            <div className={style.types}>Types</div>
        </div>
    )
}


export default PokeDex;