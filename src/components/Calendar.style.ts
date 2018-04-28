import styled, { css } from 'styled-components';
import { convert } from 'css-color-function';

const cell = {
  width: '34px',
  height: '28px',
  radius: '10px',
};

/* Layout */
export const StyledCalendar = styled.div`
  position: relative;
  width: calc(${cell.width} * 7);
  padding: 15px;
  background: white;
  border: 1px solid ${props => props.theme.border.weak};
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  color: #434343;
  text-align: center;
`;

export const Navigator = styled.div`
  position: relative;
  padding: 12px 0;
  text-align: center;
  & button {
    background: none;
    border: 0;
    cursor: pointer;
    min-width: 40px;
    height: 34px;
    vertical-align: middle;
    color: #bbb;
    top: 50%;
    transform: translateY(-50%);
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
  background: #f3f6f8;
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
    background: #8cc054;
    z-index: 1;
  }
`;

const getDateColor = (props: DateCellProps) => {
  const baseColor = props.sun ? '#f66e73' : '#434343';
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
