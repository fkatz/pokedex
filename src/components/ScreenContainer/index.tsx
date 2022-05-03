import React from 'react';
import { Container, InnerWrapper } from './styles';

const ScreenContainer = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <Container id="screen" {...props}>
      <InnerWrapper>{children}</InnerWrapper>
    </Container>
  );
};

export default ScreenContainer;
