import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    & .photo-view__images {
        
    }
    
    & .photo-view__display {

    }
`;

export const PhotoViewStyle = ({children}) => {
    return <Wrapper>
        {children}
    </Wrapper>
}