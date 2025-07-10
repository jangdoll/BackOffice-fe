import React, { useState } from "react";
import { ModalPortal } from "./ModalPortal";

type DialogType = "alert" | "confirm";

interface DialogOptions {
  message: string;
  type?: DialogType;
  okText?: string;
  cancelText?: string;
}

let showDialog: (options: DialogOptions) => Promise<boolean>;

export function useCustomDialogProvider() {
  const [dialog, setDialog] = useState<DialogOptions | null>(null);
  const [resolver, setResolver] = useState<((result: boolean) => void) | null>(null);

  showDialog = (options: DialogOptions) =>
    new Promise<boolean>(resolve => {
      setDialog(options);
      setResolver(() => resolve);
    });

  const handleOk = () => {
    setDialog(null);
    resolver?.(true);
  };

  const handleCancel = () => {
    setDialog(null);
    resolver?.(false);
  };

  return (
    dialog && (
      <ModalPortal>
        <div style={{
          position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000
        }}>
          <div style={{
            background: "#fff", borderRadius: 8, minWidth: 300, minHeight: 100,
            padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.15)"
          }}>
            <div style={{ marginBottom: 24, fontSize: 16 }}>{dialog.message}</div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              {dialog.type === "confirm" && (
                <button onClick={handleCancel} style={{ padding: "6px 16px" }}>
                  {dialog.cancelText || "취소"}
                </button>
              )}
              <button onClick={handleOk} style={{ padding: "6px 16px" }}>
                {dialog.okText || "확인"}
              </button>
            </div>
          </div>
        </div>
      </ModalPortal>
    )
  );
}

// 유틸 함수로 import해서 어디서든 사용
export async function customAlert(message: string, okText?: string) {
  await showDialog({ message, type: "alert", okText });
}

export async function customConfirm(message: string, okText?: string, cancelText?: string) {
  return await showDialog({ message, type: "confirm", okText, cancelText });
}
