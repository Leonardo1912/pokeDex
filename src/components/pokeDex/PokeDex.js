import React, {useEffect, useState} from "react";
import style from "./PokeDex.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {
    requestNewPokemons,
    requestPokemons,
} from "../../redux/redux-store/pokeDexReducer";
import {NavLink, Route, Routes} from "react-router-dom";
import {logDOM} from "@testing-library/react";

const PokeDex = () => {

    let [poke, setPoke] = useState({
        id: 1,
        sprites: {
            other: {
                home: {
                    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png'
                }
            }
        }
    })

    let pokemons = useSelector(state => state.pokemonPage.fullDataPokemons)
    let pageLimit = useSelector(state => state.pokemonPage.pageLimit)
    let nextPage = useSelector(state => state.pokemonPage.nextPage)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestPokemons(pageLimit))
        console.log(poke)
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
                                          loadMore={loadMore}/>}/>
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

const FullDataPokemon = (props) => {

    console.log(props.poke)

    return (
        <div>
            <div className={style.exit}>
                <NavLink to='/' className={style.exitButton}>X</NavLink>
            </div>
            <div className={style.fullDataPokemon}>
                <img src={props.image}/>
            </div>
            <div>
                <div className={style.stats}>
                    <div className={style.statName}>{props.poke.name}</div>
                    <div>{props.poke.id}</div>
                </div>
                <div>
                    <div className={style.stats}>
                        <div className={style.statName}>type </div>
                        <div>{props.poke.types.map(p=>p.type.name + ' ')} </div>
                    </div>
                    <div className={style.stats}>
                        <div className={style.statName}>{props.poke.stats[1].stat.name}</div>
                        <div>{props.poke.stats[1].base_stat}</div>
                    </div>
                    <div className={style.stats}>
                        <div className={style.statName}>{props.poke.stats[2].stat.name}</div>
                        <div>{props.poke.stats[2].base_stat}</div>
                    </div>
                    <div className={style.stats}>
                        <div className={style.statName}>{props.poke.stats[0].stat.name}</div>
                        <div>{props.poke.stats[0].base_stat}</div>
                    </div>


                    <div className={style.stats}>
                        <div className={style.statName}>{props.poke.stats[3].stat.name}</div>
                        <div>{props.poke.stats[3].base_stat}</div>
                    </div>
                    <div className={style.stats}>
                        <div className={style.statName}>{props.poke.stats[4].stat.name}</div>
                        <div>{props.poke.stats[4].base_stat}</div>
                    </div>
                    <div className={style.stats}>
                        <div className={style.statName}>{props.poke.stats[5].stat.name}</div>
                        <div>{props.poke.stats[5].base_stat}</div>
                    </div>
                    <div className={style.stats}>
                        <div className={style.statName}>weight</div>
                        <div>{props.poke.weight}</div>
                    </div>

                    <div className={style.stats}>
                        <div className={style.statName}>total moves</div>
                        <div>{props.poke.moves.length}</div>
                    </div>
                </div>
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
                <div className={style.types}>Types</div>
            </div>
        </div>
    )
}


const Preloader = () => {
    return (
        <div>
            WAIT!!!!!!
        </div>
    )
}

export default PokeDex;