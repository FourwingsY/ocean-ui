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
  width: 200px;
  margin: 10px 5px;
  text-align: center;
  & > div {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    border: 1px solid #eee;
    box-sizing: border-box;
  }
`;
