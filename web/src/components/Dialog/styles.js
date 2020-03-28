import styled from 'styled-components';

export const DialogBox = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
`;

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  box-shadow: 0px 0px 2px #00000026;
  opacity: 1;
  /* background: #36393f; */
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(255, 255, 255, 0.2);
  padding: 40px;
  width: ${props => (props.size === 'big' ? 600 : 400)}px;
  > hr {
    border: 1px solid #eeeeee;
    opacity: 1;
    margin: 10px 0;
  }
  > h3 {
    color: #444;
  }
  > p {
    color: #666;
  }
  > img {
    margin: 15px 0 5px 0;
  }
`;
