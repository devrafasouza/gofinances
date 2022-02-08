import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';
import { RectButton } from 'react-native-gesture-handler';

interface Props extends RectButtonProps { /* interface Props contem todas propriedades extendidas do TouchableOpacityProps */
  title: string;
  onPress: () => void;
}


export function Button({ title, onPress, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>  
      <Title>
        { title }
      </Title>
    </Container>
  );
}