import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotiError = (mensaje) =>
    toast.error(mensaje, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });