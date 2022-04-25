import React from 'react';
import {HexagonView, HexagonViewProps} from '../HexagonView/HexagonView';

type ButtonProps = JSX.IntrinsicElements['button'];

export interface HexagonButtonProps extends HexagonViewProps {
  readonly children: React.ReactNode;
  readonly onClick?: ButtonProps['onClick'];
  readonly disable?: boolean;
}

export const HexagonButton: React.FC<HexagonButtonProps> = ({children, onClick, disable = false, ...rest}) => (
  <HexagonView {...rest} base={ButtonWrapper} children={children} onClick={onClick} disabled={disable} />
);

const ButtonWrapper: React.FC<ButtonProps> = (props) => <button {...props} />;
