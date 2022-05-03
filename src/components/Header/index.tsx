import React from 'react';
import { BigCircle, Container, InnerWrapper, SmallCircle } from './styles';

const Header = () => {
  return (
    <Container>
      <InnerWrapper>
        <BigCircle></BigCircle>
        <SmallCircle style={{ background: '#ea5353' }}></SmallCircle>
        <SmallCircle style={{ background: '#d7b659' }}></SmallCircle>
        <SmallCircle style={{ background: '#59b368' }}></SmallCircle>
        <span style={{ marginLeft: '16px' }}>Pokédex</span>
      </InnerWrapper>
    </Container>
  );
};

export default Header;
