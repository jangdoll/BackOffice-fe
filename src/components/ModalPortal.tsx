
import type { ReactNode } from "react";
import ReactDOM from "react-dom";

export function ModalPortal({ children }: { children: ReactNode }) {
  return ReactDOM.createPortal(
    children,
    document.body
  );
}
