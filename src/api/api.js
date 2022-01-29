import * as  axios from "axios";

const instance = axios.create({
    baseURL: "http://pokeapi.co/api/v2/"
})

export const pokemonsAPI = {
    getPokemons(pageLimit = 20) {
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
    getUrl(nextPage){
        return axios.get(nextPage)
            .then(responsse => {
                return responsse.data
            })
    }

}