import styled, { css } from 'styled-components';

import { DateCell, DateCellProps } from './Calendar.style';

export const StyledSingleDatePicker = styled.div`
  width: 100%;
  text-align: center;
  & .calendar-layer {
    display: inline-block;
  }
`;
interface PickerCellProps extends DateCellProps {
  selected?: boolean;
}

const selected = css`
  background: #e9f2fb;
`;

export const PickerCell = DateCell.extend`
  ${(props: PickerCellProps) => (props.selected ? selected : '')};
`;
