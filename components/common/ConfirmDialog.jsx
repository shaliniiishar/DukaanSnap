import Button from "./Button";

const ConfirmDialog = ({
  open,
  title = "Delete Product?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="confirm-dialog">
        <h3>{title}</h3>

        <p>{message}</p>

        <div className="dialog-actions">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;