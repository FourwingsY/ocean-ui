import styled, { css } from 'styled-components';

import { DateCell, DateCellProps } from './Calendar.style';

export const StyledDatePicker = styled.div`
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
  background: ${props => props.theme.calendar.selected};
`;

export const PickerCell = DateCell.extend`
  ${(props: PickerCellProps) => (props.selected ? selected : '')};
`;
