import styled from 'styled-components/native';

export const Container = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  background-color: #f4effc;
  border-radius: ${(props) => props.size / 2}px;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  position: absolute;
  top: 0;
  right: 0;
`;
