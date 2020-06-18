import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    height: 80%;
    min-height: 500px;
    overflow-y: auto;
`;

export const FlyerListByPlaceStyle = ({children}) => {
    return <Wrapper>
        {children}
    </Wrapper>
}