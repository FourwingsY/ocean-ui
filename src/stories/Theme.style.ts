import styled from 'styled-components';

export const StyledDefaultThemePreview = styled.div`
  padding: 20px;
  & .colors li {
    list-style: none;
    display: inline-block;
    vertical-align: top;
  }
  & .sizes li {
    list-style: none;
    & b {
      display: inline-block;
      width: 150px;
    }
  }
`;
export const StyledColorChip = styled.div`
  width: 150px;
  border: 1px solid #ccc;
  margin: 5px;
  text-align: center;
  & > div {
    width: 150px;
    height: 150px;
    border: 1px solid #eee;
    box-sizing: border-box;
  }
`;
