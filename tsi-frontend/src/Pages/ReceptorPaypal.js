import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Cargando } from "../Components/cargando/Cargando";

function ReceptorPayPal() {
  const [params] = useSearchParams();
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  const redirectUri = `${process.env.REACT_APP_PAYPAL}/success/`; // http://localhost:5000

  useEffect(() => {
    const redirect = async () => {
      if (paymentId !== undefined && payerId !== undefined)
        window.location.replace(redirectUri + paymentId + "/" + payerId);
    };
    redirect();
  }, [payerId, paymentId]);

  return (
    <>
      <Cargando text="Redirigiendo" />
    </>
  );
}
export default ReceptorPayPal;
