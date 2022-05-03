import React, { useMemo, useState } from 'react';
import { useRetrievePokemonNames } from '../../hooks/useRetrievePokemonNames';
import { partition } from '../../utils';
import UserMadePokemonEditor from '../UserMadePokemonEditor';
import OriginalPokemonTile from '../OriginalPokemonTile';
import UserMadePokemonTile from '../UserMadePokemonTile';
import { Container, ErrorMessage, List, Pagination } from './styles';

const PokemonList = () => {
  const { originalPokemonNames, loading, error, userMadePokemonNames, forceRefresh } =
    useRetrievePokemonNames();
  const pagedPokemonNames = useMemo(
    () =>
      partition(
        [
          ...userMadePokemonNames.map((name) => ({ name, isUserMade: true })),
          ...originalPokemonNames.map((name) => ({ name, isUserMade: false })),
        ],
        12,
      ),
    [userMadePokemonNames, originalPokemonNames],
  );
  const [currentPage, setCurrentPage] = useState(0);
  const currentPagePokemonNames = pagedPokemonNames[currentPage] || [];
  const [showCreatePokemon, setShowCreatePokemon] = useState(false);
  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    document.getElementById('screen')?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  return (
    <Container>
      <button className="nes-btn" style={{ marginBottom: '20px' }} onClick={forceRefresh}>
        Refresh
      </button>
      <button
        className="nes-btn"
        style={{ marginBottom: '20px', marginLeft: '10px' }}
        onClick={() => {
          setShowCreatePokemon(true);
        }}>
        Add new Pokémon
      </button>
      {showCreatePokemon && (
        <UserMadePokemonEditor
          open={showCreatePokemon}
          onClose={() => {
            setShowCreatePokemon(false);
          }}
        />
      )}

      {error ? (
        <ErrorMessage>There was an error retrieving data from the server. Try refreshing.</ErrorMessage>
      ) : (
        <List style={{ ...(loading && { opacity: '0.6', pointerEvents: 'none' }) }}>
          {currentPagePokemonNames.map((pokemon) => {
            const key = `${pokemon.isUserMade ? 'u' : ''}${pokemon.name}`;
            return pokemon.isUserMade ? (
              <UserMadePokemonTile key={key} name={pokemon.name} />
            ) : (
              <OriginalPokemonTile key={key} name={pokemon.name} />
            );
          })}
        </List>
      )}
      <Pagination
        breakLabel="..."
        nextLabel=">"
        forcePage={currentPage}
        onPageChange={onPageChange}
        pageRangeDisplayed={6}
        marginPagesDisplayed={2}
        pageCount={pagedPokemonNames.length}
        previousLabel="<"
        breakClassName="break"
        breakLinkClassName="break"
        pageLinkClassName="nes-btn"
        previousLinkClassName="nes-btn"
        nextLinkClassName="nes-btn"
      />
    </Container>
  );
};

export default PokemonList;
