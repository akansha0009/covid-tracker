import styled from "styled-components";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

const Container = styled.div``;
const Heading = styled.h2`
  padding: 10px;
  font-weight: 600;
`;
const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  width: 100%;
  &: nth-of-type(odd) {
    background-color: #f3f2f8;
  }
`;

const TableData = styled.td`
  padding: 0.2rem;
`;

const Tab = styled.div`
  margin-left: 10px;
  height: 450px;
  width: 300px;
  overflow-y: scroll;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;

const GET_DATA = gql`
  {
    countries(count: 195, filter: { hasCases: true }) {
      results {
        name
        latest {
          confirmed
          lastUpdated
          deceased
        }
      }
    }
  }
`;

function Table(props) {
  console.log("props", props);

  if (props.data.loading) {
    return (
      <Loader>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </Loader>
    );
  }
  if (!props.data.loading) {
    return (
      <Container>
        <Heading>Live cases by countries</Heading>
        <Tab>
          {props.data.countries.results.map((country, index) => (
            <TableRow>
              <TableData>{country.name}</TableData>
              <TableData>
                <strong>{country.latest.confirmed}</strong>
              </TableData>
            </TableRow>
          ))}
        </Tab>
      </Container>
    );
  }
}

export default graphql(GET_DATA)(Table);
