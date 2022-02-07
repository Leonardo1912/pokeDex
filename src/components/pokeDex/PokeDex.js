import React, {useEffect} from "react";
import style from "./PokeDex.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {
    requestNewPokemons,
    requestPokemons,
} from "../../redux/redux-store/pokeDexReducer";

const PokeDex = (props) => {
    return (
        <div className={style.pokedex}>
            <div className={style.header}>Pokedex</div>
            <div className={style.content}>
                <div className={style.pokemonsList}><Pokemons/></div>
                <div className={style.singlePokemon}><FullInfoPokemon/></div>
            </div>
        </div>
    )
}

const Pokemons = (props) => {

    useEffect(() => {
        dispatch(requestPokemons(pageLimit))
    }, [])

    let pokemons = useSelector(state => state.pokemonPage.fullDataPokemons)
    let pageLimit = useSelector(state => state.pokemonPage.pageLimit)
    let nextPage = useSelector(state => state.pokemonPage.nextPage)

    const dispatch = useDispatch();
    let loadMore =  () => {
        dispatch(requestNewPokemons(nextPage))
    }


    return (
        <div>
            <div className={style.pokemons}>
                {pokemons.map( pokemon => <Pokemon pokemon={pokemon} image={pokemon.sprites.other.home.front_default}/> )}
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
            <div className={style.photoPokemon}><img src={props.image} className={style.photo}/></div>
            <div className={style.pokemonInfo}>
                <div className={style.pokemonName}>{props.pokemon.name}</div>
                <div className={style.types}>Types</div>
            </div>
        </div>
    )
}
const FullInfoPokemon = (props) => {

    return(
        <div>
            <div>Pokemon</div>
        </div>
    )
}


export default PokeDex;