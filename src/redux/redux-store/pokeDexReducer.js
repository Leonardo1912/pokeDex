import {pokemonsAPI} from "../../api/api";

const SET_POKEMONS = 'SET_POKEMONS'
const SET_NEW_POKEMONS = 'SET_NEW_POKEMONS'
const SET_FULL_DATA_POKEMONS = 'SET_FULL_DATA_POKEMONS'
const SET_NEXT_PAGE = 'SET_NEXT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'


let initialState = {
    pokemons: [],
    fullDataPokemons: [],
    pageLimit: 9,
    nextPage: "",
    count: 0,
    types: [],
    isFetching: true,
}


const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POKEMONS: {
            return {...state, pokemons: [...action.pokemons]}
        }
        case SET_NEW_POKEMONS: {
            return {...state, pokemons: [...state.pokemons, ...action.pokemons]}
        }
        case SET_FULL_DATA_POKEMONS: {
            return {...state, fullDataPokemons: [...state.fullDataPokemons, ...action.fullDataPokemons]}
        }
        case SET_NEXT_PAGE: {
            return {...state, nextPage: action.nextPage}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        default:
            return state;
    }
}

export const setPokemons = (pokemons) => ({type: SET_POKEMONS, pokemons})
export const setNewPokemons = (pokemons) => ({type: SET_NEW_POKEMONS, pokemons})
export const setFullDataPokemons = (fullDataPokemons) => ({type: SET_FULL_DATA_POKEMONS, fullDataPokemons})
export const setNextPage = (nextPage) => ({type: SET_NEXT_PAGE, nextPage})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const requestPokemons = (pageLimit) => {
    return async (dispatch) => {
        let data = await pokemonsAPI.getPokemons(pageLimit);
        dispatch(setPokemons(data.results))
        let allDataPoke = await dispatch(getFullDataPokemons(data.results))
        dispatch(setFullDataPokemons(allDataPoke))
        dispatch(setNextPage(data.next))
    }
}



export const getFullDataPokemons = (data) => {
    return async () => {
        const dataUrl = data.map(pok => pok.url)
        return Promise.all(dataUrl.map(p => {
            return pokemonsAPI.getPokemonsData(p)
        }))
    }
}


export const requestNewPokemons = (nextPage) => {
    return async (dispatch) => {
        let newData = await pokemonsAPI.getNextPokemons(nextPage);
        dispatch(setNewPokemons(newData.results))
        dispatch(setNextPage(newData.next))
        let newAllDataPoke =  await dispatch(getFullDataPokemons(newData.results))
        dispatch(setFullDataPokemons(newAllDataPoke))
    }

}


export default pokemonReducer;
