import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    & .flyer-page {
        margin-top: 20px;
        min-height: 400px;
        border: 1px solid #8492a6;
        padding: 1rem;
        box-shadow: 6px 6px 14px 2px rgba(0,0,0,0.75);
        transform: rotate(359deg);
    }
`;

const ViewFyerStyled = ({children}) => (
    <Wrapper>{children}</Wrapper>
)

export default ViewFyerStyled;