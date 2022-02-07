import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from '../Input';

import {
  Container,
  Error
} from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
} /* interface para tipar o componente InputForm */

export function InputForm({
  control,
  name,
  error,
  ...rest
}: Props ){
  return (
    <Container>
      <Controller /* Para controlar o input, para não mudar o estado toda vez que algo é digitado, sendo enviado tudo de uma vez em um submit do botão */
        control={control}
        render={({ field: {onChange, value}}) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
        />
        )}
        name={name}
      />
      {error && <Error>{ error }</Error>}
    </Container>
  );
}