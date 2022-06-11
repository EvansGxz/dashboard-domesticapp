import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCupon } from "../../services/cupon-service";

function DeleteCupon(){
  const navigate = useNavigate();
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    deleteCupon(id).then(navigate("/cupones"))
  }, [navigate]);
}

export default DeleteCupon;