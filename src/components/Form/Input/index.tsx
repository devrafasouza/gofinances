import React from 'react';
import { TextInputProps } from 'react-native'; /* importação das Props do TextInput */

import { Container } from './styles';

type Props = TextInputProps; /* o Tipo Props contem todas propriedades do TextInputProps */

export function Input({...rest} : Props) {
  return (
    <Container {...rest} />

    
  );
}