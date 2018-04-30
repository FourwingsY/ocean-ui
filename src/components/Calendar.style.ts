import styled, { css, ThemeProps } from 'styled-components';
import { convert } from 'css-color-function';

const cell = {
  width: '34px',
  height: '28px',
};

/* Layout */
export const StyledCalendar = styled.div`
  position: relative;
  width: calc(${props => props.theme.calendar.cellWidth} * 7);
  padding: 15px;
  background: white;
  border: 1px solid ${props => props.theme.border.weak};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadow.layer};
  color: ${props => props.theme.text.default};
  text-align: center;
`;

export const Navigator = styled.div`
  position: relative;
  padding: 12px 0;
  text-align: center;
  & button {
    top: 50%;
    transform: translateY(-50%);
    min-width: 40px;
    height: 34px;
    vertical-align: middle;
    background: none;
    border: 0;
    color: ${props => props.theme.text.default};
    cursor: pointer;
  }
  & .Select-input input {
    height: auto;
  }
  & .prev,
  & .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) scaleX(0.6);
  }
  & .prev {
    left: 0;
  }
  & .next {
    right: 0;
  }
  & .year,
  & .month {
    display: inline-block;
    vertical-align: bottom;
    width: 70px;
    margin: 0 3px;
    font-size: 13px;
  }
  & .month {
    width: 50px;
  }
`;

export const DateSelector = styled.div`
  display: inline-block;
  &.targeted .date-selector-body {
    & span {
      cursor: pointer;
    }
  }
`;

export const DateSelectorHeader = styled.div`
  background: ${props => props.theme.calendar.headerBackground};
  border-radius: 5px;
  margin-bottom: 5px;
  & span {
    cursor: default;
  }
`;

export const DateSelectorBody = styled.div``;

export interface DateCellProps {
  n?: boolean;
  sun?: boolean;
  today?: boolean;
}

const today = css`
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    display: block;
    width: 20px;
    height: 3px;
    background: ${props => props.theme.calendar.todayColor};
    z-index: 1;
  }
`;

const getDateColor = (props: DateCellProps & ThemeProps<any>) => {
  const { weekdayColor, sundayColor } = props.theme.calendar;
  const baseColor = props.sun ? sundayColor : weekdayColor;
  const opacity = props.n ? 0.5 : 1;
  return convert(`color(${baseColor} a(${opacity}))`);
};

export const DateCell = styled<DateCellProps, 'span'>('span')`
  position: relative;
  display: inline-block;
  width: ${cell.width};
  height: ${cell.height};
  line-height: calc(${cell.height} + 2px);
  color: ${props => getDateColor(props)};
  text-align: center;
  cursor: pointer;
  outline: none;
  &.selected {
    background: #d2e3f4;
  }
  ${props => (props.today ? today : '')};
`;
