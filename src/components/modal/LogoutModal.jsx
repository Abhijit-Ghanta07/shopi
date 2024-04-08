import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

const LogoutModal = ({ show, setshow, handleLogout }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        setshow(false);
      }}
    >
      <ModalHeader closeButton>
        <ModalTitle>Confirm Logout</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p className="text-danger fw-medium fs-5">Are Your Sure to Logout</p>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="warning"
          onClick={() => {
            setshow(false);
          }}
        >
          Cancel
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LogoutModal;
