import styled from 'styled-components';

export const Button = styled.button({
  minWidth: '312px',
  margin: '0px auto',
  opacity: '0.8',
  background: 'transparent',
  border: '6px solid #888888',
  outline: '#000000 solid 3px',
  transition: '0.2s',
  '&:hover, &:focus': {
    opacity: '1',
    transition: '0s',
    background: '#e7e7e7',
    outline: '#000000 solid 3px',
  },
});

export const SpriteContainer = styled.div({
  minHeight: '288px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Sprite = styled.img({
  imageRendering: 'pixelated',
  width: '288px',
  height: '288px',
});

export const Name = styled.h4({
  textTransform: 'uppercase',
});
