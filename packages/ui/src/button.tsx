"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
  onClick?: () => Promise<void> | void;
}

export const Button: React.FC<Props> = ({ children, onClick, ...Props }) => {
  return (
    <button
      {...Props}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
