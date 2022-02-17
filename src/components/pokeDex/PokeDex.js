import React, {useEffect, useState} from "react";
import style from "./PokeDex.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {
    requestNewPokemons,
    requestPokemons,
} from "../../redux/redux-store/pokeDexReducer";
import {Route, Routes} from "react-router-dom";
import Pokemons from "./Pokemons/Pokemons";

const PokeDex = () => {

    let [poke, setPoke] = useState([])

    let pokemons = useSelector(state => state.pokemonPage.fullDataPokemons)
    let pageLimit = useSelector(state => state.pokemonPage.pageLimit)
    let nextPage = useSelector(state => state.pokemonPage.nextPage)
    let isFetching = useSelector(state => state.pokemonPage.isFetching)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestPokemons(pageLimit))
    }, [])


    let loadMore = () => {
        dispatch(requestNewPokemons(nextPage))

    }


    return (
        <div>
            <div className={style.header}>Pokedex</div>

            <div>
                <Pokemons poke={poke}
                                  pokemons={pokemons}
                                  setPoke={setPoke}
                                  loadMore={loadMore}
                                  isFetching={isFetching}/>
            </div>

        </div>
    )
}

export default PokeDex;