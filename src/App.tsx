import React from 'react';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import ScreenContainer from './components/ScreenContainer';

function App() {
  return (
    <>
      <Header />
      <ScreenContainer>
        <PokemonList />
      </ScreenContainer>
    </>
  );
}

export default App;
