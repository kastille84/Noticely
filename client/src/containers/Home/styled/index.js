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

    & .about {
        margin-top: 20px;
        border: 1px solid #ccc;
        padding: 1rem;
        background-color: #eee;

        li {
            list-style: none;
        }
    }
`;

export const HomeStyle = ({children}) => {
    return (
    <Wrapper>
        {children}
    </Wrapper>
    )
};