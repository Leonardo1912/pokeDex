import {pokemonsAPI} from "../../api/api";

const SET_POKEMONS = 'SET_POKEMONS'
const SET_COUNT = 'SET_COUNT'
const SET_NEXT_PAGE = 'SET_NEXT_PAGE'

let initialState = {
    pokemons: [],
    pageLimit: 12,
    nextPage: "",
    count: 0,
    types: [],

}

const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POKEMONS: {
            return {...state, pokemons: [...action.pokemons]}
        }
        case SET_COUNT: {
            return {...state, count: action.count}
        }
        case SET_NEXT_PAGE: {
            return {...state, nextPage: action.next}
        }

        default:
            return state;
    }
}


export const setPokemons = (pokemons) => ({type: SET_POKEMONS, pokemons})
export const setCount = (count) => ({type: SET_COUNT, count})
export const setNextPage = (next) => ({type: SET_NEXT_PAGE, next})
export const requestPokemons = (pageLimit) => {
    return async (dispatch) => {
        let data = await pokemonsAPI.getPokemons(pageLimit);
        dispatch(setPokemons(data.results))
        dispatch(setCount(data.count))
        dispatch(setNextPage(data.next))
    }


}


export default pokemonReducer;