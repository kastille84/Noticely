import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    & .manage-list {

        &__container {
            display: flex;
            flex-wrap: wrap;
        }
        &__item {
            width: 250px;
            border: 1px solid #ccc;
            margin-right: 1rem;
            margin-bottom: 1rem;
            border-radius: 3px;
            cursor: pointer;
            transition: all .3s;

            &__header {
                padding: 1rem;
                background-color: ${props=>props.theme.colors.green};
                color: ${props=>props.theme.colors.white};

                h5 {
                    margin-bottom: 0px;
                }
            }
            &__body {
                padding: 1rem;
            }
        }
        &__item:hover {
            transform: translateX(3px);
            box-shadow: 5px 5px 12px 2px rgba(0,0,0,0.75);
        }
    }
`;

const ManageStyled = ({children}) => (
    <Wrapper>{children}</Wrapper>
)

export default ManageStyled;