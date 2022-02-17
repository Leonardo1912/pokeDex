import style from "./Pokemon.module.scss";
import React from "react";

const Pokemon = (props) => {

    let changePoke = () => {
        props.setPoke(props.pokemon)
    }

    return (
        <div className={style.pokemon} onClick={() => changePoke()}>
            <div className={style.photoPokemon}>
                <img src={props.pokemon.sprites.other.home.front_default} className={style.photo}/>
            </div>
            <div className={style.pokemonInfo}>
                <div className={style.pokemonName}>{props.pokemon.name}</div>
                <div className={style.types}>{props.pokemon.types.map(t => <div
                    className={style.type}>{t.type.name}</div>)}</div>
            </div>
        </div>
    )
}

export default Pokemon;