import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("eevee");
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  async function getPokemon() {
    setisLoading(true)
    try {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let pokemonData = await res.json();
      setData(pokemonData);
    } catch (err) {
      setData(false);
      setErr(true);
    }
    setisLoading(false)
  }

  useEffect(() => {
    getPokemon();
    console.log(data);
  }, []);

  function handleInput(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getPokemon();
  }
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
      <div className="text-center rounded-3xl bg-white p-10 border shadow-2xl max-w-xs">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInput}
            value={name}
            type="text"
            className="border-indigo-500 border-solid border-2 rounded-lg p-3"
            placeholder="Enter Name Pokemon"
          />
          <button className="mt-4 bg-indigo-400 px-20 rounded-lg text-lg text-gray-200">
            Search
          </button>
        </form>

        {err ? (
          <p className="my-5">No data was found!</p>
        ) : (
          <>
          {isLoading ? (
            <p className="my-5">Loading...</p>
          ) : (
            <>
            <img
              className="my-5 shadow-lg mx-auto w-50 h-50 rounded-3xl"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
              alt=""
            />
            <h1 className="text-lg text-gray-700">{data.name}</h1>
          </>
          )}</>
          
          
        )}
      </div>
    </div>
  );
}

export default App;
