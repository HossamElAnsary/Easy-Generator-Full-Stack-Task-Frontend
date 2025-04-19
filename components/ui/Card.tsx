import { FC, PropsWithChildren } from "react";

const Card: FC<PropsWithChildren> = ({ children }) => (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      {children}
    </div>
);

export default Card;
  