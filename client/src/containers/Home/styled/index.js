import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`

    & .MapContainer {
        
    } 

    & .BtnControls {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 20px;
        width: 100%;
    }
`;

export const HomeStyle = ({children}) => {
    return (
    <Wrapper>
        {children}
    </Wrapper>
    )
};