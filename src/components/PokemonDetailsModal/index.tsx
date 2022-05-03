import React, { useState } from 'react';
import { useUserMadePokemon } from '../../hooks/useUserMadePokemon';
import { PokemonDetails } from '../../types/PokemonDetails';
import { Modal } from '../Modal';
import UserMadePokemonEditor from '../UserMadePokemonEditor';
import {
  DetailsContainer,
  FlavorTextSection,
  ModifyButtonsSection,
  MovesList,
  MovesSection,
  Sprite,
  TopSection,
  TopSectionData,
} from './style';

const PokemonDetailsModal = ({
  pokemonDetails,
  open,
  onClose,
  userMade,
}: {
  pokemonDetails?: PokemonDetails;
  open: boolean;
  onClose: () => void;
  userMade?: boolean;
}) => {
  const { deletePokemon } = useUserMadePokemon();
  const [showEditor, setShowEditor] = useState(false);
  const onDelete = () => {
    deletePokemon(pokemonDetails!);
    onClose();
  };
  return (
    <Modal onClose={onClose} open={open}>
      {pokemonDetails && (
        <DetailsContainer>
          {userMade && (
            <ModifyButtonsSection>
              <button
                className="nes-btn"
                style={{ marginRight: '10px' }}
                onClick={() => setShowEditor(true)}>
                Edit
              </button>
              <button className="nes-btn" onClick={onDelete}>
                Delete
              </button>
              <UserMadePokemonEditor
                open={showEditor}
                onClose={() => {
                  setShowEditor(false);
                }}
                currentPokemon={pokemonDetails}
              />
            </ModifyButtonsSection>
          )}
          <TopSection>
            <Sprite src={pokemonDetails.sprite} />
            <TopSectionData>
              <h1>{pokemonDetails.name.toUpperCase()}</h1>
              <h4>Height: {pokemonDetails.height}m.</h4>
              <h4>Weight: {pokemonDetails.weight}kg.</h4>
              <h4>Legendary: {pokemonDetails.isLegendary ? 'yes' : 'no'}.</h4>
              <h4>Types: {pokemonDetails.types.join(', ')}.</h4>
              {pokemonDetails.evolvesFrom && (
                <h4>Evolves from: {pokemonDetails.evolvesFrom.toUpperCase()}</h4>
              )}
            </TopSectionData>
          </TopSection>
          <FlavorTextSection>
            <h1 style={{ marginRight: '20px' }}>“</h1>
            <div>
              <p style={{ whiteSpace: 'break-spaces' }}>{pokemonDetails.description}</p>
            </div>
          </FlavorTextSection>
          <MovesSection>
            <h3 style={{ marginBottom: '20px' }}>Moves</h3>
            <MovesList>
              {pokemonDetails.moves.map((move) => (
                <div key={move}>
                  <div className="nes-container is-rounded">
                    <p>{move.toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </MovesList>
          </MovesSection>
        </DetailsContainer>
      )}
    </Modal>
  );
};

export default PokemonDetailsModal;
