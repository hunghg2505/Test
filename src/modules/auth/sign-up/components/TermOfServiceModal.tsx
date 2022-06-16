import { Modal } from 'antd';

interface ITermOfServiceModalProps {
  isShowTermOfServiceModal: boolean;
  onCloseTermOfServiceModal: () => void;
}

const TermOfServiceModal = ({
  isShowTermOfServiceModal,
  onCloseTermOfServiceModal
}: ITermOfServiceModalProps) => {
  return (
    <>
      <Modal
        title="Term of Service"
        visible={isShowTermOfServiceModal}
        onCancel={onCloseTermOfServiceModal}
        footer={null}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default TermOfServiceModal;
