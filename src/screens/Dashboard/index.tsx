import React, { useEffect, useState } from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import AsyncStorage from '@react-native-async-storage/async-storage'

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    User,
    Photo,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,

} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}


export function Dashboard() {
   const [data, setData] = useState<DataListProps[]>([]); /* estado das transações da listagem */
   
   async function loadTransactions(){
       const dataKey = '@gofinaces:transactions'; /* chave da coleção */
       const response = await AsyncStorage.getItem(dataKey);
       const transactions = response ? JSON.parse(response) : [];

       const transactionsFormatted: DataListProps[] = transactions
       .map((item: DataListProps) =>{
           const amount = Number(item.amount).toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL'
           })

           const date = Intl.DateTimeFormat('pt-BR', {
               day: '2-digit',
               month: '2-digit',
               year: '2-digit',
           }).format(new Date(item.date));

           return {
               id: item.id,
               name: item.name,
               amount,
               type: item.type,
               category: item.category,
               date
           }

       });

       setData(transactionsFormatted);
   }

   useEffect(() => {
       loadTransactions();
   }, []);


    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: "https://scontent.fldb7-1.fna.fbcdn.net/v/t39.30808-6/273683845_3209509192611300_8263049014122811492_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeETZZaVxaLZ0-XtxPx9OoKyGvo-uyglGLYa-j67KCUYtrccJHo4tYLkbrxrvUmpVuDjxHMIkbFSA79fj6lTedNc&_nc_ohc=k31W0RnYLLMAX_2nkRS&_nc_ht=scontent.fldb7-1.fna&oh=00_AT9i-vdW7sZ063G4_jxDD_of3PlqHE_CVktM5nK6mEfpuw&oe=62239F55"}}/>
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Kellen</UserName>
                        </User>
                    </UserInfo>
                    
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                    </LogoutButton>
               </UserWrapper>
            </Header>

            <HighlightCards 
            >
                <HighlightCard
                    type="up" 
                    title="Entradas" 
                    amount="R$ 17.400,00" 
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down" 
                    title="Saídas" 
                    amount="R$ 1.259,00" 
                    lastTransaction="Última saída dia 03 de abril"
                />
                <HighlightCard
                    type="total"  
                    title="Total" 
                    amount="R$ 16.141,00" 
                    lastTransaction="01 à 16 de abril"
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />

            </Transactions>
        </Container>

    )
}

