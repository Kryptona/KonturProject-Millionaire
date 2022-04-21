import React from 'react';
import {HexagonView, HexagonViewProps} from '../HexagonView/HexagonView';
import {Link, LinkProps} from 'react-router-dom';

export interface HexagonLinkProps extends HexagonViewProps {
  readonly children: React.ReactNode;
  readonly onClick?: LinkProps['onClick'];
  readonly to: LinkProps['to'];
}

export const HexagonLink: React.FC<HexagonLinkProps> = ({children, onClick, to, ...rest}) => (
  <HexagonView {...rest} base={Link} children={children} to={to} onClick={onClick} />
);
