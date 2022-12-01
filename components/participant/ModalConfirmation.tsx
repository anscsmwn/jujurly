import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
interface Props {
  isLoading?: boolean;
  isOpen?: boolean;
  title?: string;
  subtitle?: string;
  positiveText?: string;
  negativeText?: string;
  onPositiveClick?: () => void;
  onNegativeClick?: () => void;
}

function ModalConfirmation(props: Props) {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  return (
    <div
      className={`relative z-10 ${!isOpen && 'hidden'}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-zinc-900 bg-opacity-40 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center text-center items-center">
          <div className="relative bg-white shadow-xl transition-all w-full py-6 max-w-md mx-5 rounded-md">
            <p className="text-2xl font-bold">{props.title || 'Title'}</p>
            <p className="text-lg">{props.subtitle || 'Sub Title'}</p>
            <div className={`space-x-3 mt-5`}>
              <button
                disabled={props.isLoading}
                className={`bg-black px-4 py-3 text-white rounded-md md:text-lg`}
                onClick={() => {
                  props.onPositiveClick && props.onPositiveClick();
                  setIsOpen(false);
                }}
              >
                <p>
                  {props.isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <>{props.positiveText || 'Ya'}</>
                  )}
                </p>
              </button>
              <button
                className="px-4 py-3 border-black border rounded-md md:text-lg text-center"
                onClick={() => {
                  props.onNegativeClick;
                  setIsOpen(false);
                }}
              >
                {props.negativeText || 'Kembali'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const showModalConfirmation = (props: Props) => {
  const modal = document.createElement('div');
  modal.id = 'modal';
  document.body.appendChild(modal);
  const root = createRoot(modal);
  root.render(
    <ModalConfirmation
      isOpen={true}
      title={props.title}
      subtitle={props.subtitle}
      positiveText={props.positiveText}
      negativeText={props.negativeText}
      onPositiveClick={props.onPositiveClick}
      onNegativeClick={props.onNegativeClick}
    />,
  );
};

export default showModalConfirmation;
