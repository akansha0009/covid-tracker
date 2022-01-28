import React from "react";
import { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components";

const GET_COUNTRIES = gql`
  {
    countries(count: 195, filter: { hasCases: true }) {
      results {
        name
        code
      }
    }
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;

function Dropdown(props) {
  console.log("countries", props);
  const [country, setCountry] = useState("worldwide");
  const onChangeCountry = (event) => {
    const countryCode = event.target.value;
    console.log("country:", countryCode);
  };

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
      <div>
        <FormControl classname="app__dropdown">
          <Select variant="outlined" value={country} onChange={onChangeCountry}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {props.data.countries.results.map((country) => (
              <MenuItem
                value={country.code}
                onClick={() => props.setValue(country.code)}
              >
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default graphql(GET_COUNTRIES)(Dropdown);
