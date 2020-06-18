import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    & .flyer-list-item-wrapper {
        width: 80%;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 25px;
        border-top: 10px solid #FAB156;
        transition: all .3s;
    }
    & .flyer-list-item-wrapper:hover {
        cursor: pointer;
        box-shadow: 6px 6px 14px 2px rgba(0,0,0,0.75);
        transform: translateX(6px);
        border-top: 10px solid #4CAD98;
    }
`;

const FlyerListItemStyled = ({children}) => {
    return <Wrapper>{children}</Wrapper>
}

export default FlyerListItemStyled;