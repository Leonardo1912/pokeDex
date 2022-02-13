import React, {useEffect, useState} from "react";
import style from "./PokeDex.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {
    requestNewPokemons,
    requestPokemons,
} from "../../redux/redux-store/pokeDexReducer";
import {NavLink, Route, Routes} from "react-router-dom";

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
                <Route exect path={`*`}
                       element={<Pokemons poke={poke}
                                          pokemons={pokemons}
                                          setPoke={setPoke}
                                          loadMore={loadMore}
                                          isFetching={isFetching}/>}/>
            </Routes>

        </div>
    )
}

const Pokemons = (props) => {

    return (
        <div>
            <div className={style.content}>
                <div className={style.pokemonsList}>
                    <div className={style.pokemons}>
                        {props.pokemons.map(pokemon => <Pokemon pokemon={pokemon}
                                                                image={pokemon.sprites.other.home.front_default}
                                                                setPoke={props.setPoke}
                                                                key={pokemon.id}/>)}
                    </div>
                    <div className={style.loadMore}>
                        <button onClick={props.loadMore}>Load More</button>

                    </div>
                </div>
                <div className={style.singlePokemon}>
                    <Routes>
                        <Route path={`/${props.poke.id}`}
                               element={<FullDataPokemon poke={props.poke}
                                                         image={props.poke.sprites.other.home.front_default}
                               />}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

const Types = (props) => {
    return(
        <div className={style.stats}>
            <div className={style.statName}>{props.statName}</div>
            <div className={style.statType}>{props.type}</div>
        </div>
    )
}

const FullDataPokemon = (props) => {

    let info = {
       name : ['name', 'id', 'type', 'attack', 'defense', 'hp', 'specialAttack', 'specialDefense', 'speed', 'weight', 'totalMoves'],
       stats : [props.poke.name, props.poke.id, props.poke.types.map(p => p.type.name + ' '), props.poke.stats[1].base_stat,
            props.poke.stats[2].base_stat, props.poke.stats[0].base_stat, props.poke.stats[3].base_stat, props.poke.stats[4].base_stat,
            props.poke.stats[5].base_stat, props.poke.weight, props.poke.moves.length]
    }
    let newInfo = info.name.map( (x, i) => {
        return {"name": x, "state": info.stats[i]}
    });
    return (
        <div className={style.dataPokemon}>
            <div className={style.exit}>
                <NavLink to='/' className={style.exitButton}>X</NavLink>
            </div>
            <div className={style.fullDataPokemon}>
                <img src={props.image}/>
            </div>
           <div className={style.s}>
                {newInfo.map((n) => <Types statName = {n.name} type = {n.state}/>)}
            </div>
        </div>
    )
}
const Pokemon = (props) => {
    return (
        <div className={style.pokemon}>
            <NavLink to={`/${props.pokemon.id}`} onClick={() => {
                props.setPoke(props.pokemon)
            }} className={style.photoPokemon}>
                <img src={props.image} className={style.photo}/>
            </NavLink>
            <div className={style.pokemonInfo}>
                <div className={style.pokemonName}>{props.pokemon.name}</div>
                <div className={style.types}>{props.pokemon.types.map(t => <div
                    className={style.type}>{t.type.name}</div>)}</div>
            </div>
        </div>
    )
}

export default PokeDex;