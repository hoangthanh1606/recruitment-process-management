import styled from 'styled-components';
import { palette } from 'styled-theme';

const Content = styled.div`
  width: 70%;
  background-color: #ffffff;
  border: 1px solid ${palette('border', 0)};
  min-height: 100vh;
  margin: auto;
`;

export default Content;