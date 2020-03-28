import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  /* max-width: 1020px; */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    a {
      font-weight: bold;
      color: #999;
      margin-right: 20px;

      &:hover,
      &.visited {
        color: #444;
      }

      img {
        margin-right: 20px;
        padding-right: 20px;
        border-right: 1px solid #eee;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;
export const NavLinkStyled = styled(NavLink).attrs({
  activeClassName: 'visited',
})`
  color: #999;
  font-size: 15px;
  font-weight: bold;
  transition: color 0.5s;
  &:hover {
    color: #444;
  }
`;
export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
