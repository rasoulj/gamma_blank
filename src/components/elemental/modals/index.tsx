import React, {Children, useEffect, useState} from 'react';
import {Modal} from '../types/modals';
import {View} from 'react-native';
import Typography from '../../atoms/Typography';
import Layer from '../../atoms/Layer';

let _modals = [],
  updateModal;

const isUpdateModalFunction = () => typeof updateModal === 'function';

export default function Modals() {
  const [modals, setModals] = useState(_modals);

  useEffect(() => {
    if (isUpdateModalFunction()) return;

    updateModal = function (modals) {
      setModals(modals);
    };

    return () => {
      updateModal = undefined;
    };
  }, []);

  const allModals = modals.map((modal, index) => (
    <ModalComponent key={index} {...modal} />
  ));

  return <>{allModals}</>;
}

export function useModal() {
  function newModal<T>(modal: Modal & T) {
    if (!isUpdateModalFunction()) return;
    if (!modal.id) modal.id = `${Date.now()}-${_modals.length}`;

    _modals = [..._modals, modal];

    updateModal(_modals);
  }

  function closeModal(id: string | number) {
    if (!isUpdateModalFunction()) return;

    _modals = _modals.filter(modal => modal.id !== id);

    updateModal(_modals);
  }

  return {newModal, closeModal};
}

function TestBody() {
  return <div>Modal!</div>;
}

function MModalBodyContainer({children}) {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.3)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 10,
      }}>
      <Layer
        style={{
          position: 'relative',
          borderRadius: 30,
          marginLeft: 48,
          marginRight: 48,
        }}>
        {children}
      </Layer>
    </View>
  );
}

function ModalComponent({
  Body,
  Container = MModalBodyContainer,
  title,
  id,
  closeButton,
  navbarModal,
  ...rest
}) {
  const {closeModal} = useModal();

  return (
    <Container>
      {(title || closeButton) && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography>{title ?? ''}</Typography>
          {closeButton && <Typography onClick={handleClose}>x</Typography>}
        </View>
      )}
      <Body id={id} closeModal={handleClose} {...rest} />
    </Container>
  );

  function handleClose(otherId) {
    if (typeof otherId !== 'string') otherId = undefined;

    closeModal(otherId ?? id);
  }
}
