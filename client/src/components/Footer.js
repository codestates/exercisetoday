import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  background-color: rgba(255, 255, 255, 0);
`;

const TeamName = styled.div`
  flex: 1 auto;
  padding-left: 10px;
  font-family: "Helvetica", "Arial", sans-serif;
  font-weight: bold;
  color: #003150;
`;

const TeamMember = styled.div`
  text-align: right;
`;

const Name = styled.a`
  padding-right: 5px;
  :link {
    color: #003150;
    text-decoration: none;
    border: rgba(75, 112, 253, 0.3) solid;
    border-width: 0 0 6px 0;
  }
  :visited {
    color: #003150;
    text-decoration: none;
    border: rgba(75, 112, 253, 0.3) solid;
    border-width: 0 0 6px 0;
  }
  display: inline;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <TeamName>Challengers 제공</TeamName>
        <TeamMember>
          <Name href="https://github.com/spirited-hunger" target="_blank">
            강성진
          </Name>
          <Name href="https://github.com/KimMinchan95" target="_blank">
            김민찬
          </Name>
          <Name href="https://github.com/dankhan102" target="_blank">
            심상국
          </Name>
          <Name href="https://github.com/Lee-Duckwon" target="_blank">
            이덕원
          </Name>
        </TeamMember>
      </FooterContainer>
    </>
  );
};

export default Footer;
