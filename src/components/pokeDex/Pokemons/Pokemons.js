import style from "./Pokemons.module.scss";
import {Route, Routes} from "react-router-dom";
import React from "react";
import Pokemon from "./Pokemon/Pokemon";
import FullDataPokemon from "../FullDataPokemon/FullDataPokemon";
import Preloader from "../../Preloader/Preloader";

const Pokemons = (props) => {
    return (
        <div>
            {!props.isFetching ? <Preloader/>:
                <div className={style.content}>
                <div className={style.pokemonsList}>
                    <div className={style.pokemons}>
                        {props.pokemons.map(pokemon => <Pokemon pokemon={pokemon}
                                                                image={pokemon.sprites.other.home.front_default}
                                                                setPoke={props.setPoke}
                                                                poke={props.poke}
                                                                key={pokemon.id}/>)}
                    </div>
                    <div className={style.loadMore}>
                        <button onClick={props.loadMore}>Load More</button>

                    </div>
                </div>
                <div className={style.singlePokemon}>
                    {props.poke.length !== 0?
                        <FullDataPokemon poke={props.poke} setPoke={props.setPoke}/>
                    :<></>}
                </div>
            </div>}
        </div>
    )
}
export default Pokemons;