import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../App.css'

const GET_DATA = gql`
query country($code:String!){
    country(code:$code){
     name
     latest{
       confirmed
       deceased
       lastUpdated
     }
     region{
       name
     }
     subRegion{
       name
     }
   }
 }
`

const Container = styled.div`
    display: flex;
    @media (max-width: 768px) {
        flex-direction: column;
        justify-contnet: center;
        margin: 0px
      }
`

const Loader = styled.div`
    display: flex;
    justify-content: center;
`

const InfoBox = (props) => {
        console.log('hi',props)
        if (props.data.loading) {
                return(
                    <Loader>
                        <Box sx={{ display: 'flex'}}>
                            <CircularProgress />
                        </Box>
                    </Loader>
                )
            }
        if (!props.data.loading) {
    return (
       
        <Container>

             <Card className='infoBox' >
            <CardContent>
                <Typography className='infoBox__title' color="textSecondary">
                    Country
                </Typography>
                <h2 className='infoBox__cases'>{props.data.country.name}</h2>
                <Typography className='infoBox__total'>
                 {props.data.country.latest.lastUpdated}
                </Typography>
            </CardContent>
        </Card>

        <Card className='infoBox' >
            <CardContent>
                <Typography className='infoBox__title' color="textSecondary">
                    Confirmed Cases
                </Typography>
                <h2 className='infoBox__cases'>{props.data.country.latest.confirmed}</h2>
                <Typography className='infoBox__total'>
                 {props.data.country.latest.lastUpdated}
                </Typography>
            </CardContent>
        </Card>

        <Card className='infoBox' >
        <CardContent>
            <Typography className='infoBox__title' color="textSecondary">
                Deceased
            </Typography>
            <h2 className='infoBox__cases'>{props.data.country.latest.deceased}</h2>
            <Typography className='infoBox__total'>
                 {props.data.country.latest.lastUpdated}
            </Typography>
        </CardContent>
        </Card>

       
        </Container>
        
    )
}
}

export default graphql(GET_DATA,{
    options:(props)=>{
        return{
            variables:{
                code:props.value
            }
        }
    }
}) (InfoBox)
