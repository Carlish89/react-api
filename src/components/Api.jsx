import React from 'react'
import { useState, useEffect } from 'react'



const Api = () => {

    const [listaPokemon, setListaPokemon] = useState([])


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
            const newList = nuevaLista.map(({ nombre:name, id, t1, t2, img, hp, attack, defence, sAttack, sDefence, speed }) => {

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
            

        }
        getPokemonList()
    }, []);

    console.log(listaPokemon)

    return (
        <div className='container'>
            <div className='pokemon-grid'>
                {listaPokemon.map(pokemon =>
                    <div key={pokemon.name} className="card"><img src={pokemon.img} alt="" /></div>
                )}
            </div>

        </div>
    )
}

export default Api