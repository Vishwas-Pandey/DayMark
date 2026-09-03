import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-primary/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-primary rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-default">
          <h3 className="text-lg font-bold text-text-heading">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-secondary text-text-muted hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
