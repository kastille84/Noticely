import React from 'react';
import styled from 'styled-components';

export const FormWrapper = styled.section`
  padding: 1rem;
`;

export const InputGroup = styled.div`
  width: 100%;  
  margin-bottom: 20px;

  & label {
    display: block;
  }
  & input {
    width: 100%;
  }
  & .password-container {
    position: relative;
    &__show {
      position: absolute;
      right: 10px;
      top: 6px;
      color: ${({theme})=>theme.colors.green};
      cursor: pointer;
    }
  }
`;

export const CheckBoxContainer = styled.div`
  display: flex;

  .CheckBoxItem {
    display: inline-block;

    .form-check-input {
      width: 25px;
      position: unset;
      margin-top: unset;
      margin-left: unset;
    }
  }
`;