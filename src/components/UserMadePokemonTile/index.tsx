import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PokemonTile from '../PokemonTile';

const UserMadePokemonTile = ({ name }: { name: string }) => {
  const pokemonDetails = useSelector(
    (state: RootState) => state.userMadePokemons.byName[name]?.details,
  );
  return <PokemonTile pokemonDetails={pokemonDetails} name={name + ' (U)'} userMade={true} />;
};

export default UserMadePokemonTile;
