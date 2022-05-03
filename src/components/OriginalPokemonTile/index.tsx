import React from 'react';
import { useGetOriginalPokemonDetails } from '../../hooks/useGetOriginalPokemonDetails';
import PokemonTile from '../PokemonTile';

const OriginalPokemonTile = ({ name }: { name: string }) => {
  const { pokemonDetails, loading, error } = useGetOriginalPokemonDetails(name);
  return (
    <PokemonTile pokemonDetails={pokemonDetails} name={name} loading={loading} error={error} />
  );
};

export default OriginalPokemonTile;
