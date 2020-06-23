import React, { FC, memo, MouseEvent, ReactNode } from 'react';

interface IButtonProps {
  readonly className?: string;
  readonly onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  readonly children?: ReactNode;
  readonly name?: string;
}

const Button: FC<IButtonProps> = ({ onClick, children, className, name }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      name={name}
    >
      {children}
    </button>
  );
};

export default memo(Button);