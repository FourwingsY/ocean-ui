import styled from 'styled-components';

export {
  StyledDropdown,
  DropdownControl,
  Label,
  Input,
  ToggleArrow,
  ClearButton,
  ErrorMessage,
  Menu,
  Option,
} from './Dropdown.style';

export const Values = styled.div`
  display: inline-block;
  line-height: 30px;
`;

export const Value = styled.div`
  display: inline-block;
  padding: 2px 5px;
  font-size: 12px;
  line-height: 18px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid #eee;
  border-radius: 3px;
  margin: 2px;
  & .remove-value {
    margin-left: 3px;
    cursor: pointer;
  }
`;
