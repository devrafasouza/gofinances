import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps { /* interface Props contem todas propriedades extendidas do TouchableOpacityProps */
  title: string;
}


export function Button({ title, ...rest }: Props) {
  return (
    <Container {...rest}>  
      <Title>
        { title }
      </Title>
    </Container>
  );
}