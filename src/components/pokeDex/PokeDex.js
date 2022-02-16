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

    let [poke, setPoke] = useState({
        id: 1,
        sprites: {other: {home: {front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png'}}}
    })

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

            <Routes>
                <Route path={`*`}
                       element={<Pokemons poke={poke}
                                  pokemons={pokemons}
                                  setPoke={setPoke}
                                  loadMore={loadMore}
                                  isFetching={isFetching}/>}/>
            </Routes>

        </div>
    )
}

export default PokeDex;