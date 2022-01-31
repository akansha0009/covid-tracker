import React from 'react';
import styled from "styled-components";

const Content = styled.div`
    width: 80%;
    margin: auto;
`

const FooterContent = styled.h5`
  margin-top: 0;
  font-weight: 600;
  color: red;
  text-align: center;
  padding-top: 0;
`;

function Footer() {
  return (
      <Content>
      <FooterContent>
            We long to return to normal, but **normal led to this**. To avert
            the future pandemics we know are coming, we MUST grapple with all
            the ways normal failed us. We have to build something better. I hope
            this piece, in showing what went wrong, helps.
        </FooterContent>
        </Content>
  )
}

export default Footer;
