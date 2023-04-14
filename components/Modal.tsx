interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function Modal({ isOpen, handleClose }: ModalProps) {
  return (
    <>
      {/* isOpen */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <p className="mb-4">
              Thank you for making an order! Let's go to payment
            </p>
            <div className="flex justify-center ">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
