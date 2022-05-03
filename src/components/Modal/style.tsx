import styled from 'styled-components';
import ScreenContainer from '../ScreenContainer';

export const ModalContainer = styled(ScreenContainer)({
  position: 'absolute',
  zIndex: '999',
  top: '48px',
  width: '100%',
  height: 'calc(100% - 48px)',
});

export const Content = styled.div({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  paddingTop: '80px',
});

export const CloseButton = styled.button.attrs(() => ({ className: 'nes-btn' }))({
  position: 'absolute',
  top: '0px',
  right: '0px',
});
