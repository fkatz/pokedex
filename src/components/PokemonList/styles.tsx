import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

export const Container = styled.div({
  maxWidth: '1000px',
  margin: '0px auto',
  padding: '20px 0px',
});

export const ErrorMessage = styled.div({
  margin: "50px 0px",
  padding: "30px",
  border: "3px solid black"
})

export const List = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '20px',
  marginBottom: '30px',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@media (max-width: 720px)': {
    gridTemplateColumns: '1fr',
  },
});

export const Pagination = styled(ReactPaginate)({
  paddingInlineStart: '0px',
  display: 'grid',
  gridAutoFlow: 'column',
  columnGap: '12px',
  alignItems: 'center',
  justifyContent: 'center',
  '& li': {
    display: 'block',
    '&.selected': {
      '& a': {
        background: '#888888',
        color: '#ffffff',
      },
    },
  },
  '& .break': {
    pointerEvents: 'none',
  },
  '& .nes-btn': {
    margin: '3px',
  },
});
