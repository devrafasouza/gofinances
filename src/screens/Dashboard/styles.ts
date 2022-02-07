import styled from 'styled-components/native'; /* importação do styled components */
import { FlatList, FlatListProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { 
  RFPercentage, /* RFPercentage é uma função para utilizar unidade de medida relativa, da biblioteca responsive-fontsize */
  RFValue, 
  } from 'react-native-responsive-fontsize'; 
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { DataListProps } from '.'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background }
  


`;

export const Header = styled.View` 
  width: 100%;
  height: ${RFPercentage(42)}px; /* Função de medida relativa */

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;

`;
export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;
export const User = styled.View`
  margin-left: 17px;

`;
export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

`;
export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;


export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`; /* estilizando biblioteca */

export const HighlightCards = styled.ScrollView.attrs({ /* ".attrs() faz com que acesse as propriedades do scrollview pelo styled-components" */
  horizontal: true, /* faz com que a rolagem da lista fique na horizontal */
  showsHorizontalScrollIndicator: false, /* esconde a barrinha de rolamento */
  contentContainerStyle: { paddingHorizontal: 24 } /* cria espaçamento na lista */
})`
  width: 100%;
  
  position: absolute;
  margin-top: ${RFPercentage(20)}px;

`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(14)}px;

`;
export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-bottom: 16px;
`;



export const TransactionList = styled(
  FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { 
    paddingBottom: getBottomSpace() }
})``;
