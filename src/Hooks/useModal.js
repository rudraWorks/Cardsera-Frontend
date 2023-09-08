import ModalContext from "../contexts/Modal/ModalContext";
import { useContext } from "react";

function useModal() {
    const {modal,dispatchModal} = useContext(ModalContext)
    return {modal,dispatchModal}
}

export default useModal