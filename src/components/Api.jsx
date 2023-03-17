import React from 'react'
import { useState, useEffect } from 'react'
import Card from './Card'



const Api = () => {

    const [listaPokemon, setListaPokemon] = useState([])
    const [search, setSearch] = useState("")
    const [pokemonFilter, setPokemonFilter] = useState([])


    useEffect(() => {
        const getPokemonList = async () => {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
            const data = await res.json()
            const promises = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url)
                const data = await res.json()
                return data
            })
            const results = await Promise.all(promises)
            const nuevaLista = results.map(({ name: nombre, types, sprites, stats, id }) => {
                const tipo = types.map((types) => types.type.name)
                const img = sprites.other['official-artwork']['front_default']
                const estadisticas = stats.map(stat => stat['base_stat'])
                const [t1, t2] = tipo
                const [hp, attack, defence, sAttack, sDefence, speed] = estadisticas
                return { nombre, id, t1, t2, img, hp, attack, defence, sAttack, sDefence, speed }
            })
            const newList = nuevaLista.map(({ nombre: name, id, t1, t2, img, hp, attack, defence, sAttack, sDefence, speed }) => {

                const types = { t1, t2 }
                const stats = { hp, attack, defence, sAttack, sDefence, speed }
                return { name, id, img, types, stats }
            })
            const lista = newList.map((pokemon) => {
                if (pokemon.types.t2 === undefined) {
                    pokemon.types.t2 = ''
                }
                return pokemon
            })
            setListaPokemon(lista)
            setPokemonFilter(lista)


        }
        getPokemonList()
    }, []);
    const filtrarPokemon = () => {
        const pokemonesFiltrados = listaPokemon.filter((pokemon) => {
            return pokemon.name.includes(search)
        })
        setPokemonFilter(pokemonesFiltrados)
    }

    useEffect(() => {
        filtrarPokemon()
    }, [search])

    console.log(listaPokemon)

    return (
        <div className='container'>
            <div className='header'>
                <div className='hero-img'></div>
                <h1>Find your pokemon</h1>
                <div className='headercontent'>
                    <p>Filter by name</p>
                    <input onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className='pokemon-grid'>
                {pokemonFilter.map(pokemon =>
                    <div key={pokemon.name} className="card"><Card image={pokemon.img} type1={pokemon.types.t1} type2={pokemon.types.t2} name={pokemon.name} /></div>
                )}
            </div>

        </div>
    )
}

export default Api