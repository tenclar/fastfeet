/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const TableStyle = styled.table`
  width: 100%;
  border-spacing: 0 20px;

  td,
  th {
    text-align: left;
    border-radius: 4px;
    padding-left: 15px;
  }

  td {
    min-width: 30px;
    align-items: center;
    align-self: center;
  }
  thead {
    > tr {
      color: #444;
      height: 20px;
    }
  }
  tbody > tr {
    background: #fff;
    height: 57px;

    img {
      align-self: center;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      margin-right: 6px;
      /* border: 3px solid rgba(255, 255, 0.3); */
      /* background: #eee; */
    }
  }
  /*  tbody > tr:nth-child(2n + 2) {
    background: #fff;
  } */
`;

export const TableImg = styled.div`
  display: flex;
  align-items: center;
`;

export const ColumnStatus = styled.div`
  /*

? 'CANCELADA'
              : this.start_date
              ? this.end_date
                ? 'ENTREGUE'
                : 'RETIRADA'
              : 'PENDENTE'; */

  color: ${props =>
    props.isCancel
      ? '#DE3B3B'
      : props.isRetirada
      ? props.isEntrege
        ? '#2CA42B'
        : '#4D85EE'
      : '#C1BC35'};
  font-weight: bold;
  display: flex;
  align-items: center;
  flex-direction: row;
  align-content: space-around;
  justify-content: center;
  width: 110px;
  height: 25px;
  background: ${props =>
    props.isCancel
      ? '#FAB0B0'
      : props.isRetirada
      ? props.isEntrege
        ? '#DFF0DF'
        : '#BAD2FF'
      : '#F0F0DF'};
  border-radius: 12px;
  opacity: 1;
`;
