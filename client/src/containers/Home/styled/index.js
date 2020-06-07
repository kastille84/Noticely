import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`

    & .MapContainer {
        margin: 20px auto;
        width: 90%;
    } 

    & .BtnControls {
        display: inline-block;
        margin-bottom: 20px;
    }
`;

export const HomeStyle = ({children}) => {
    return (
    <Wrapper>
        {children}
    </Wrapper>
    )
};