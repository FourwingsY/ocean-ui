import React, { ComponentType } from 'react';

type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export interface ComponentDefaulter<DP> {
  <P extends { [key in keyof DP]?: any }>(
    Component: ComponentType<P>
  ): ComponentType<
    Omit<P, keyof DP> & // Mandate all properties in P and not in DP
      Partial<Pick<P, keyof DP>> // Accept all properties from P that are in DP, but use type from P
  >;
}

export default function withDefaultProps<DP>(
  defaultProps: DP
): ComponentDefaulter<DP> {
  return Component => props => <Component {...defaultProps} {...props} />;
}
