import style from "./FullDataPokemon.module.scss";
import React from "react";

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
                <div onClick={()=>{props.setPoke([])}}className={style.exitButton}>X</div>
            </div>
            <div className={style.fullDataPokemon}>
                <img src={props.poke.sprites.other.home.front_default}/>
            </div>
            <div className={style.s}>
                {newInfo.map((n) => <Types statName = {n.name} type = {n.state}/>)}
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

export default FullDataPokemon;