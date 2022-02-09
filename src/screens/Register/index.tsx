import React, { useState, useEffect } from 'react';
import { 
  Alert,
  Modal, 
  Keyboard
} from 'react-native';

import {TouchableWithoutFeedback } from 'react-native-gesture-handler';
 
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage' /* para armazenar os dados no dispositivo do usuario */

import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

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
import { NativeScreenNavigationContainer } from 'react-native-screens';

export type FormData = {
  [name: string]: any;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor númerico').positive('O valor não pode ser negativo')
});

type NavigationProps = {
  navigate: (screen:string) => void;
}



export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false); /* estado que verifica e seta quando o botão de categoria é clickado e abre o modal */
  const dataKey = '@gofinaces:transactions'; /* chave da coleção */

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    handleSubmit,
    reset,
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

  async function handleSubmitRegister(form: FormData) { 
    if(!transactionType) {
      return Alert.alert('Selecione o tipo de transação');
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date()
    }
    
    try {
      const data = await AsyncStorage.getItem(dataKey); /* pega os dados do asyncstorage */
      const currentData = data ? JSON.parse(data) : []; /* se tiver algo em data ele devolve convertido, se não retorna um vetor vazio */

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted)); /* passa pro asyncstorage a chave e os dados convertidos em string */
      
      reset(); /* reseta o formulario */
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      })

      navigation.navigate('Listagem') /* redireciona para a pagina de listagem */

    } catch(error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }

  }

  useEffect(() => {
    async function loadData(){
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!));
    }

    loadData();
  }, []);
  
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