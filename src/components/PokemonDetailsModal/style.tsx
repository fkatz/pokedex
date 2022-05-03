import styled from 'styled-components';

export const DetailsContainer = styled.div({
  maxWidth: '800px',
  margin: '0 auto',
});

export const ModifyButtonsSection = styled.div({
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'flex-end',
});

export const TopSection = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  border: '3px solid #444444',
  paddingRight: '30px',
  marginBottom: '20px',
  '@media (max-width: 720px)': {
    flexDirection: 'column',
    padding: '30px',
  },
});

export const Sprite = styled.img({
  imageRendering: 'pixelated',
  width: '384px',
  height: '384px',
  marginRight: '30px',
});

export const TopSectionData = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const FlavorTextSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  border: '3px solid #444444',
  padding: '30px',
  marginBottom: '20px',
  '*': {
    marginBottom: '0',
  },
});

export const MovesSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  border: '3px solid #444444',
  padding: '30px',
});

export const MovesList = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '-3px',
  '&>div': {
    margin: '3px',
  },
});
