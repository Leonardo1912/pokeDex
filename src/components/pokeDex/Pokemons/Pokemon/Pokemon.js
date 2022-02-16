import style from "./Pokemon.module.scss";
import {NavLink} from "react-router-dom";
import React from "react";

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

export default Pokemon;