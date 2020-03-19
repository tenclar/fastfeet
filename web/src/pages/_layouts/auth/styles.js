import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7 0% 0% no-repeat padding-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;

  text-align: center;
  background: #fff;
  box-shadow: 0px 0px 10px #00000033;
  border-radius: 4px;
  opacity: 1;
  padding: 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font-weight: bold;
      text-align: left;
      margin: 10px;
    }

    input {
      background: rgb(255, 255, 255);
      border: thin solid #ddd;

      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: #f66f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 10px 0 0;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
