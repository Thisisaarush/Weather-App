import type { ReactNode } from "react";

interface CardProps {
  color: string;
  height: string;
  children: ReactNode;
}

export const Card = (props: CardProps) => {
  const { color, height, children } = props;
  return (
    <div
      className={`w-[340px] min-h-[100px] flex flex-col justify-center rounded-3xl p-6 ${color} ${height}`}
    >
      {children}
    </div>
  );
};
