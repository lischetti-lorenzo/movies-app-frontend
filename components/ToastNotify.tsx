import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessIcon from "@/public/icons/success-icon.svg";
import CloseIcon from "@/public/icons/x-icon-white.svg";
import ErrorIcon from "@/public/icons/error-icon.svg";
import Image from "next/image";

const ErrorToastContent = ({ message }) => (
  <div>
    <div className="flex justify-between">
      <div className="flex mt-0">
        <Image className="mt-0 ml-0" src={ErrorIcon} alt="error" />
        <b className="ml-2">Error</b>
      </div>
    </div>
    <div className="ml-8">
      <p>{message}</p>
    </div>
  </div>
);

export const showErrorToast = (messageContent: string) => {
  toast.error(<ErrorToastContent message={messageContent} />, {
    style: {
      backgroundColor: "#E4294B",
      color: "white",
      fontSize: "large",
    },
  });
};

const SuccessToastContent = ({ message }) => (
  <div>
    <div className="flex justify-between">
      <div className="flex mt-0">
        <Image className="mt-0 ml-0" src={SuccessIcon} alt="success" />
        <b className="ml-2">Success</b>
      </div>
      <button>
        <Image src={CloseIcon} alt="close" />
      </button>
    </div>
    <p className="ml-8">{message}</p>
  </div>
);

export const showSuccessToast = (messageContent: string) => {
  toast.success(<SuccessToastContent message={messageContent} />, {
    style: {
      backgroundColor: "#81B4AA",
      color: "white",
      fontSize: "large",
    },
  });
};

const ToastNotify = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{
        width: "75%",
      }}
      icon={false}
    />
  );
};

export default ToastNotify;
