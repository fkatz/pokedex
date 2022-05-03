import styled from 'styled-components';

export const Container = styled.div({
  backgroundColor: '#bf3a3a',
  color: '#cbcbcb',
  textShadow: '-2px 2px #781515',
  height: '48px',
  padding: '16px',
  boxSizing: 'border-box',
});

export const BigCircle = styled.div.attrs(() => ({ className: 'nes-container is-rounded' }))({
  background: '#f57544',
  padding: '6px!important',
  filter: 'invert(1)drop-shadow(-2px 2px 0px #781515)',
  marginRight: '10px!important',
});

export const SmallCircle = styled.div.attrs(() => ({ className: 'nes-container is-rounded' }))({
  padding: '4px!important',
  marginLeft: '10px!important',
});

export const InnerWrapper = styled.div({
  height: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});
