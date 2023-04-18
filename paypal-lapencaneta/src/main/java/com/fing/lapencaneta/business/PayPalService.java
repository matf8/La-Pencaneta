package com.fing.lapencaneta.business;

import com.fing.lapencaneta.business.interfaces.IPayPalService;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.PaymentExecution;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

@Service
@Slf4j
public class PayPalService implements IPayPalService {

    @Autowired private APIContext _ctxRest;

    public Payment createPayment(String total, String currency, String method, String intent, String description, String cancelUrl, String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(total);

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method.toString());

        Payment payment = new Payment();
        payment.setIntent(intent.toString());
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        return payment.create(_ctxRest);
    }

    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);
        return payment.execute(_ctxRest, paymentExecute);
    }

  /*

    // Refunds types: FULL *, PARTIAL *, EXTERNALDISPUTE, OTHER
    public RefundTransactionResponseType refund(String idT, String precioReembolso, String descripcion, String razon) throws Exception {
        try {
            // Inicializar SDK
            Map<String, String> configurationMap = _ctxNvp.getAcctAndConfig();
            PayPalAPIInterfaceServiceService nvp = new PayPalAPIInterfaceServiceService(configurationMap);
            // Clases  PayPal de reembolso
            RefundType tipoReembolso;
            RefundTransactionReq req = new RefundTransactionReq();
            RefundTransactionRequestType reqType = new RefundTransactionRequestType();

            if (idT != null) {
                reqType.setTransactionID(idT);
                // chequeo que tipo de reembolso será
                if (descripcion.equals("parcial"))
                    tipoReembolso = RefundType.PARTIAL;
                else if (descripcion.equals("total"))
                    tipoReembolso = RefundType.FULL;
                else tipoReembolso = RefundType.OTHER; // ?
                reqType.setRefundType(tipoReembolso);
                reqType.setMemo(razon); // nota
                // si el rembolso es parcial se debe indicar cual es el monto a rembolsar
                if (tipoReembolso == RefundType.PARTIAL) {
                    BasicAmountType amount = new BasicAmountType();
                    amount.setValue(precioReembolso);
                    CurrencyCodeType currency = CurrencyCodeType.USD;
                    amount.setCurrencyID(currency);
                    reqType.setAmount(amount);
                }
                // ejecucion del refund
                req.setRefundTransactionRequest(reqType);
                RefundTransactionResponseType res = nvp.refundTransaction(req);
                // guardar res en coleccion reembolsos

                //System.out.println(res.getRefundTransactionID());
                return res;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    */
    private String getTimestamp() {
        Timestamp t = new Timestamp(System.currentTimeMillis());
        return String.valueOf(t.getTime());
    }

    public String generateRandomId() {
        Random random = new Random();
        Long timestamp = Long.valueOf(getTimestamp());
        return String.valueOf(Math.abs((random.ints(timestamp).findFirst().getAsInt())));
    }
}