import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    & .edit-pics {
        display: flex;
        flex-wrap: wrap;

        &__item {
            width: 125px;
            height: auto;
            margin-right: 5px;
            border: 1px solid #ccc;

            &__controls {
                border-bottom: 1px solid #ccc;
                text-align: right;
                padding-right: 5px;

                span {
                    cursor: pointer;
                }
            }
            figure {
                padding: 1rem;

                img {
                    width: 100%;
                }
            }
        }
    }
`;

export const EditFlyerStyle = ({children}) => {
    return (
    <Wrapper>
        {children}
    </Wrapper>
    )
};