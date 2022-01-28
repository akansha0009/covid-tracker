import styled from "styled-components";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

const Container = styled.div``;
const Heading = styled.h2`
  padding: 20px;
  font-weight: 600;
`;
const TableRow = styled.tr`
  display: flex;
  justify-content: space-evenly;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;

const GET_DATA = gql`
  {
    regions {
      name
      subRegions {
        name
        countries(count: 10, filter: { hasCases: true }) {
          results {
            name
            latest {
              confirmed
            }
          }
        }
      }
    }
  }
`;

function Table(props) {
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
    console.log("table", props);
    return (
      <Container>
        <Heading>Live cases by countries</Heading>
        <TableRow>
          {props.regions.subRegions.countries.results.map((country, index) => (
            <div>
              <td>{country.name}</td>
              <td>{country.latest.confirmed}</td>
            </div>
          ))}
        </TableRow>
      </Container>
    );
  }
}

export default graphql(GET_DATA)(Table);
