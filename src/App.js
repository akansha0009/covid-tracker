import React from 'react'
import { useState } from 'react';
import InfoBox from './components/InfoBox';
import { InMemoryCache } from '@apollo/react-hooks';
import { ApolloClient, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Dropdown from './components/Dropdown';
import styled from 'styled-components'
import Latest from './components/Latest';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri:'https://covid19-graphql.herokuapp.com/',
  })
})

const Box = styled.div`
    padding: 40px
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

const Main = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 20px;
`

const Container = styled.div`
    flex: 0.8;
`

function App() {
 const [value, setValue] = useState('IN')
  
  return (
    <ApolloProvider client={client}> 
        <Main >
        <Container>
        <Header>
        <h1>Covid-19 TRACKER</h1>
        <Dropdown setValue={setValue} />
        </Header>
        <Box>
            <InfoBox value={value} />
        </Box>
          <Latest />
        </Container>
    </Main>
    </ApolloProvider>
  );
}

export default App;
