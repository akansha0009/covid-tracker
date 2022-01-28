import styled from "styled-components";
import React from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GET_CASES = gql`
  {
    latest {
      confirmed
      deceased
      recovered
      lastUpdated
    }
  }
`;

const LatestCases = styled.div`
  height: 200px;
  width: 100%;
  text-align: center;
`;
const Cases = styled.div`
  margin-top: 10px;
  width: 100%;
`;

const Heading = styled.h3`
  color: darkgrey;
`;
const Value = styled.h3`
  color: black;
`;
const Footer = styled.h5`
  margin: 30px;
  font-weight: 600;
  color: red;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
`;

function Latest(props) {
  console.log("cases", props);
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
      <LatestCases>
        <h2>Latest Cases</h2>
        <hr />
        <Cases>
          <Heading>
            Confirmed Cases: <Value>{props.data.latest.confirmed}</Value>
          </Heading>
          <Heading>
            Deceased: <Value>{props.data.latest.deceased}</Value>
          </Heading>
        </Cases>

        <Footer>
          <Footer>
            We long to return to normal, but **normal led to this**. To avert
            the future pandemics we know are coming, we MUST grapple with all
            the ways normal failed us. We have to build something better. I hope
            this piece, in showing what went wrong, helps.
          </Footer>
        </Footer>
      </LatestCases>
    );
  }
}

export default graphql(GET_CASES)(Latest);
