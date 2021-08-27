import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  background-color: white;
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

const Names = styled.a`
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

const Kang = styled(Names)``;

const Kim = styled(Names)``;

const Sim = styled(Names)``;

const Lee = styled(Names)``;
const Footer = () => {
  return (
    <>
      <FooterContainer>
        <TeamName>Challengers 제공</TeamName>
        <TeamMember>
          <Kang href="https://github.com/spirited-hunger">강성진</Kang>
          <Kim href="https://github.com/KimMinchan95">김민찬</Kim>
          <Sim href="https://github.com/dankhan102">심상국</Sim>
          <Lee href="https://github.com/Lee-Duckwon">이덕원</Lee>
        </TeamMember>
      </FooterContainer>
    </>
  );
};

export default Footer;
