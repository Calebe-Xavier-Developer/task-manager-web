import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

interface ModalFormProps {
  title: string;
  value: string;
  setValue: (val: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  children?: ReactNode;
}

const ModalForm = ({ title, value, setValue, onClose, onConfirm, confirmText = 'Save', children }: ModalFormProps) => {
  const modal = (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Name"
        />

        {children}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal-root')!);
};

export default ModalForm;
