import React from 'react';
import { createPortal } from 'react-dom';
import { CloseButton, Content, ModalContainer } from './style';

export const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) => {
  return open
    ? createPortal(
        <ModalContainer>
          <CloseButton onClick={onClose}>X</CloseButton>
          <Content>{children}</Content>
        </ModalContainer>,
        document.body,
      )
    : null;
};
