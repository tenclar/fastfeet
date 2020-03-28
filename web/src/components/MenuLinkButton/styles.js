import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkButtonStyled = styled(Link)`
  max-height: 150px;
  /* padding: 5px 15px; */

  display: flex;
  align-items: center;
  width: 100%;
  color: #999;
  padding: 5px 15px;
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
