import styled, { css } from 'styled-components';

import { DateCell, DateCellProps } from './Calendar.style';
import { StyledTextInput } from './TextInput.style';

export const StyledDateRangePicker = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  & .calendar-layer {
    display: inline-block;
    & ${StyledTextInput} {
      width: 120px;
    }
    & .fromto {
      margin: 0 10px;
    }
  }
`;
interface PickerCellProps extends DateCellProps {
  selected?: boolean;
  selectedStart?: boolean;
  selectedEnd?: boolean;
  expected?: boolean;
  expectedStart?: boolean;
  expectedEnd?: boolean;
}

const selected = css`
  background: #e9f2fb;
`;

const expected = css`
  background: #d2e3f4;
  &:hover {
    background: #d2e3f4;
  }
`;

const rangeStart = css`
  border-top-left-radius: 50%;
`;
const rangeEnd = css`
  border-bottom-right-radius: 50%;
`;

export const PickerCell = DateCell.extend`
  ${(props: PickerCellProps) => (props.selected ? selected : '')};
  ${(props: PickerCellProps) => (props.selectedStart ? rangeStart : '')};
  ${(props: PickerCellProps) => (props.selectedEnd ? rangeEnd : '')};
  ${(props: PickerCellProps) => (props.expected ? expected : '')};
  ${(props: PickerCellProps) => (props.expectedStart ? rangeStart : '')};
  ${(props: PickerCellProps) => (props.expectedEnd ? rangeEnd : '')};
`;
