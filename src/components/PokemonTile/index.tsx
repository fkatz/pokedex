import React, { useState } from 'react';
import { ErrorType } from '../../types/ErrorType';
import { PokemonDetails } from '../../types/PokemonDetails';
import PokemonDetailsModal from '../PokemonDetailsModal';
import { Button, Name, Sprite, SpriteContainer } from './styles';

const PokemonTile = ({
  name,
  pokemonDetails,
  loading,
  error,
  userMade,
}: {
  name: string;
  pokemonDetails?: PokemonDetails;
  loading?: boolean;
  error?: ErrorType;
  userMade?: boolean;
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <Button onClick={() => !loading && !error && pokemonDetails && setShowDetails(true)}>
        <SpriteContainer>
          {error ? (
            <div style={{ padding: '10px' }}>
              Server Error.
              <br /> Try refreshing.
            </div>
          ) : (
            <>
              {(loading || imageLoading) && <div style={{ padding: '10px' }}>Loading...</div>}
              {pokemonDetails && !loading && (
                <Sprite
                  style={{ ...(imageLoading && { width: 0 }) }}
                  src={pokemonDetails.sprite}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />
              )}
            </>
          )}
        </SpriteContainer>
        <Name>
          {name}
          {userMade && ' (U)'}
        </Name>
      </Button>
      <PokemonDetailsModal
        pokemonDetails={pokemonDetails}
        onClose={() => setShowDetails(false)}
        open={showDetails}
        userMade={userMade}
      />
    </>
  );
};

export default PokemonTile;
