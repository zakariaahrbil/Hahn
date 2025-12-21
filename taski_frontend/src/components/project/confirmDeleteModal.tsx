type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => void;
};

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  title,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={() => onClose()}
          className="fixed inset-0 bg-[#29004f]/10 backdrop-blur-lg flex items-center justify-center z-50"
        >
          <div
            className="bg-linear-to-tl to-[#9c35fd] via-[#29004f] from-[#10001f] rounded-2xl p-6 w-96 "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              Confirm Deletion
            </h2>
            <p className="mb-6 text-white/70">
              Are you sure you want to delete the project "{title}" ?<br /> This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 cursor-pointer py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors "
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
