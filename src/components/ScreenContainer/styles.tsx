import styled from 'styled-components';

export const Container = styled.div({
  backgroundColor: '#78a964',
  color: 'black',
  padding: '10px',
  flexGrow: 1,
  fontSmooth: 'never',
  WebkitFontSmoothing: 'never',
  height: '100%',
  overflowY: 'auto',
});

export const InnerWrapper = styled.div({
  opacity: 0.6,
  filter: 'grayscale(1)',
  mixBlendMode: 'multiply',
});
