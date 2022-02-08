import React, { useState } from 'react';
import { 
  Alert,
  Modal, 
  Keyboard
} from 'react-native';

import {TouchableWithoutFeedback } from 'react-native-gesture-handler';
 
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form';

import { Input } from '../../components/Form/Input'; /* Importação do componente Input */
import { InputForm } from '../../components/Form/InputForm'; /* Importação do componente Input */
import { Button } from '../../components/Form/Button'; /* Importação do componente button */
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'; /* Importação do componente de tipo de transação */
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'; /* importação do container(View principal do Register) */

export type FormData = {
  [name: string]: any;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor númerico').positive('O valor não pode ser negativo')
});



export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false); /* estado que verifica e seta quando o botão de categoria é clickado e abre o modal */

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);

  } /* Função setar o tipo da transição */

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCLoseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleSubmitRegister(form: FormData) { 
    if(!transactionType) {
      return Alert.alert('Selecione o tipo de transação');
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const dataFormRegister = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log('Log: dataFormRegister', dataFormRegister)
  }
  
  return(
    /* View Principal */
    <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1}}
      style={{ flex: 1}}
    > 
      <Container>
        <Header> 
          <Title>Cadastro</Title>
        </Header>

      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control} /* Propriedade para que o react hook form compreenda que os dois inputs fazem parte do mesmo formulario, ao ser enviado */
            placeholder="Nome"
            autoCapitalize="sentences" /* Propriede que transforma a formatação do texto do input, no caso o valor "sentences" coloca aprimeira letra da primeira palavra da frase em maiuscula*/
            autoCorrect={false} /* Propriedade que monitora e corrige palavra digitada errada, se não tiver setada, o valor padrão é true  */
            error={errors.name && errors.name.message}
          />
          <InputForm
            name="amount"
            control={control} /* Propriedade para que o react hook form compreenda que os dois inputs fazem parte do mesmo formulario, ao ser enviado */
            placeholder="Preço"
            keyboardType="numeric" /* Propriedade para definir o teclado padrão do input, no caso o valor é numerico */
            error={errors.amount && errors.amount.message}
          />

          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelectButton 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          /> 
          
        </Fields>
        <Button 
          title="Enviar"
          onPress={handleSubmit(handleSubmitRegister)}
        />
      </Form>

      <Modal  visible={categoryModalOpen} >
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCLoseSelectCategoryModal}
        />
      </Modal>
    

    

      </Container>
    </TouchableWithoutFeedback>

  );
}