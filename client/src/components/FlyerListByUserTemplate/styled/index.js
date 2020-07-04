import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    height: 80%;
    min-height: 500px;
    overflow-y: auto;
`;

export const FlyerListByUserTemplateStyle = ({children}) => {
    return <Wrapper>
        {children}
    </Wrapper>
}