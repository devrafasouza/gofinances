import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

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

} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}


export function Dashboard() {
    const data: DataListProps[]  = [
        {
        id: '1',
        type: 'positive',   
        title:"Desenvolvimento de site",
        amount:"R$ 12.000,00",
        category:{
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date:"13/04/2020"
        },
        {
        id: '2',
        type: 'negative',
        title:"Hamburgueria Pizzy",
        amount:"R$ 59,00",
        category:{
            name: 'Alimentação',
            icon: 'coffee'
        },
        date:"13/04/2020"
        },
        {
        id: '3',
        type: 'negative',
        title:"Aluguel do apartamento",
        amount:"R$ 1.2000,00",
        category:{
            name: 'Casa',
            icon: 'shopping-bag'
        },
        date:"13/04/2020"
        }
    ]


    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: "https://scontent.fldb12-1.fna.fbcdn.net/v/t1.6435-9/62592170_829307124110177_3271791595149590528_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGIhUBsxfi4P6Rd3pJLSMQRUSZRX9IL3fxRJlFf0gvd_OiQME2polaRQjt2vZ5SJPI9K-CrHPBSUdhEVCzcIOZ6&_nc_ohc=hZD8EzLp9XQAX_X-FFg&_nc_ht=scontent.fldb12-1.fna&oh=00_AT9H7zyf6t84nIzRrDjrdBg_WPg96jJF9otksT8l4m_p5A&oe=621DD652"}}/>
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Guilherme</UserName>
                        </User>
                    </UserInfo>

                    <Icon name="power"/>
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
