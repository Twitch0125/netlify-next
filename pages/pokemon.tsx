import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { Dispatch, useState } from "react";
const fetchPokemon = async () => {
  const id = (Math.random() * 100).toFixed(0);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.json();
};
const handleClick = async (dispatcher: Dispatch<any>) => {
  const poke = await fetchPokemon();
  dispatcher(poke);
};
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchPokemon();
  return { props: { pokemon: data } };
};

const Pokemon: NextPage = ({
  pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [pokemonValue, setPokemon] = useState(pokemon);

  return (
    <div>
      <h1>Pokemon</h1>
      <div>ID: {pokemonValue.id}</div>
      <div>NAME: {pokemonValue.name}</div>
      <button onClick={() => handleClick(setPokemon)}>Get New</button>
    </div>
  );
};
export default Pokemon;
