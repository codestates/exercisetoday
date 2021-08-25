import React, { useState } from "react";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  height: 50%;
  width: 50%;
  background-color: rgb(100, 100, 100);
`;

export const Header = () => {
  return (
    <>
      <HeaderContainer>Hello, world!</HeaderContainer>
    </>
  );
};
