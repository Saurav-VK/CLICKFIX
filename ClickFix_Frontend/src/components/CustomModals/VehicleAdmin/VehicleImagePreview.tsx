import { Modal } from "react-bootstrap";

type Props = {
    show: boolean;
    preview: string;
    onClose: () => void;
  };

function VehicleImagePreview({ show, preview, onClose}: Props){
    return(
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="d-flex justify-content-center">
        <img src={preview} alt="Preview" className="img-preview-admin img-thumbnail" />
      </div>
        </Modal.Body>
      </Modal>
    
    );

}
export default VehicleImagePreview;