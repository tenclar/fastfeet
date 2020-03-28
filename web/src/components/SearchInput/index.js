import styled from 'styled-components';
import { darken } from 'polished';

export const Title = styled.div`
  font-size: 22px;
  display: flex;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: space-around;

  > a,
  button {
    background: #7d40e7;
    height: 36px;
    border-radius: 4px;
    border: 1px solid #7d40e7;
    color: #fff;
    min-width: 142px;
    opacity: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: background 0.2;

    &:hover {
      background: ${darken(0.06, '#7d40e7')};
    }
  }
`;

export const SearchInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    display: flex;
    align-items: center;
    position: relative;
    top: -4px;
    left: 25px;
    color: #999;
  }

  input {
    background: rgba(255, 255, 255, 1);
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 36px;
    padding: 0px 15px 0px 30px !important;
    color: #222;
    margin: 0 0 10px;

    &::placeholder {
      color: #999;
    }
  }
`;
