import styled from 'styled-components';
import { darken } from 'polished';

export const Panel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PanelForm = styled.div`
  max-width: 900px;
  margin: 35px 120px;
`;
export const Title = styled.div`
  width: 100%;
  font-size: 22px;
  display: flex;
  color: #444;

  font-weight: bold;
`;

export const PanelHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: space-around;
  margin-bottom: 20px;

  > a {
    background: #ccc;
    height: 36px;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #fff;
    min-width: 142px;
    opacity: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    transition: background 0.2;

    &:hover {
      background: ${darken(0.06, '#ccc')};
    }
  }

  > button {
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
    margin-left: 5px;
    transition: background 0.2;

    &:hover {
      background: ${darken(0.06, '#7d40e7')};
    }
  }
`;

export const PanelBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 30px 30px;

  label {
    font-weight: bold;
    color: #444;
  }
  input {
    height: 45px;
    border-radius: 4px;
    color: #666;
    opacity: 1;
    margin: 7px 0 18px 0;
    padding: 0 15px;
    transition: background 0.2;
    border: 1px solid #ddd;
  }
`;

export const PanelGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const PanelGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
