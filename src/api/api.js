import * as  axios from "axios";

const instance = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    headers: {}
})

export const pokemonsAPI = {
    getPokemons(pageLimit = 10) {
        return instance.get(`pokemon/?limit=${pageLimit}`)
            .then(response => {
                return response.data
            })
    },
    getTypes(){
        return instance.get(`type`)
            .then(response => {
                return response.data
            })
    },
    getPokemonsData(url){
        return axios.get(url)
            .then(response => {
                return response.data
            })
    },
    getNextPokemons(nextPage){
        return instance.get(nextPage)
            .then(response => {
                return response.data
            })
    }

}