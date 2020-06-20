import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    & .photo-view__images {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

        figure {
            max-width: 50px;
            max-height: 50px;
            margin-right: 10px;
            cursor: pointer;
            transition: all .3s;

            img {
                width: 100%;
            }
        }
        figure:hover {
            transform: scale(1.05);
        }
    }
    
    & .photo-view__display {
        figure {
            max-width: 200px;
            max-height: 200px;
            img {
                width: 100%;
            }
        }
    }
`;

export const PhotoViewStyle = ({children}) => {
    return <Wrapper>
        {children}
    </Wrapper>
}