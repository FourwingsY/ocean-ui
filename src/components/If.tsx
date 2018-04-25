import { SFC, ReactElement } from 'react';

interface Props {
  condition: any;
}

const If: SFC<Props> = props => {
  if (props.condition) {
    return props.children as ReactElement<any> | null;
  }
  return null;
};

export default If;
