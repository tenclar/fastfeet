import styled from 'styled-components';
import PerfectScroll from 'react-perfect-scrollbar';
/* import { lighten } from 'polished'; */

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const MenuList = styled.div`
  z-index: 1;
  position: absolute;
  width: 150px;
  left: calc(50% - 90px);
  top: calc(100% + 4px);
  /* background: rgba(255, 255, 255, 0.6); */
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 2px #00000026;
  opacity: 1;
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  hr {
    border: 1px solid #eeeeee;
  }
  /* Triangulo da lista */
  &::after {
    content: '';

    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0px;
    height: 0px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;

    opacity: 1;
  }

  &::before {
    content: '';

    position: absolute;
    left: calc(50% - 11px);
    top: -11px;
    width: 0px;
    height: 0px;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 11px solid #00000026;

    opacity: 1;
  }
`;

export const Scroll = styled(PerfectScroll)`
  max-height: 150px;
  /* padding: 5px 15px; */

  hr {
    border: 1px solid #eeeeee;
  }
`;

export const MenuItem = styled.div`
  max-height: 150px;
  /* padding: 5px 15px; */

  display: flex;
  align-items: center;
  width: 100%;
  color: #fff;
  padding: 5px 15px;
  > button {
    color: #999;
    border: 0;
    background: #fff;
  }
  a {
    color: #999;
  }
  svg {
    margin-right: 3px;
  }
  & + div {
    margin-top: 10px;
    padding-top: 15px;
    border-top: 1px solid #fff;
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }
`;
