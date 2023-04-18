package com.fing.lapencaneta.rest;

import com.fing.lapencaneta.business.interfaces.IOrderInvoicePayPalService;
import com.fing.lapencaneta.business.interfaces.IPayPalService;
import com.fing.lapencaneta.dto.CreationDTO;
import com.fing.lapencaneta.dto.InscriptionDTO;
import com.fing.lapencaneta.entity.OrderPayPal;
import com.fing.lapencaneta.helper.UtilHelper;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.PayerInfo;
import com.paypal.api.payments.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.net.URI;
import java.util.Objects;

@Controller
@RequestMapping("/paypal")
@CrossOrigin(value = "*")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PayPalRest {

    @Autowired private IPayPalService paypalService;
    @Autowired private UtilHelper utilHelper;
    @Autowired private IOrderInvoicePayPalService invoiceService;
    private Integer _pencaId;
    private String _auth;
    private Float _total;
    
    @GetMapping("/")
    public String index() {
        return "index";
    }
     
    @PostMapping("/inscribirse")
    public ResponseEntity<Object> payment(@RequestBody InscriptionDTO dt) throws Exception {
        if (Objects.nonNull(dt)) {
            if (Objects.nonNull(dt.getMonto()) && Objects.nonNull(dt.getPencaId())) {
                _total = dt.getMonto();
                _pencaId = dt.getPencaId();
                if (Objects.nonNull(dt.getToken()) && dt.getToken() != "") {
                    _auth = dt.getToken();
                    return new ResponseEntity<Object>(HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/crear")
    public ResponseEntity<Object> payment(@RequestBody CreationDTO dt) throws Exception {
        if (Objects.nonNull(dt)) {
            if (Objects.nonNull(dt.getMonto())) {
                _total = dt.getMonto();
                if (Objects.nonNull(dt.getToken()) && dt.getToken() != "") {
                    _auth = dt.getToken();
                    return new ResponseEntity<Object>(HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/pay")
    public ResponseEntity<Object> redirect() throws Exception {
        String currency = (String) OrderPayPal.class.getField("currency").get(null);
        String method = (String) OrderPayPal.class.getField("method").get(null);
        String intent = (String) OrderPayPal.class.getField("intent").get(null);
        String successUrl = (String) OrderPayPal.class.getField("successUrl").get(null);
        String cancelUrl = (String) OrderPayPal.class.getField("cancelUrl").get(null);
        try {
            OrderPayPal order = new OrderPayPal();
            Payment payment = paypalService.createPayment(String.valueOf(_total), currency,
                    method, intent, "", cancelUrl, successUrl);
            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    order.setId(payment.getId());
                    invoiceService.saveOrderUntilSuccess(order);
                    return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(link.getHref())).build();
                }
            }
            System.out.println(order.getAmount() + " " + currency + " " +
                    method + " " + intent + " " + order.getDescription() + " " + cancelUrl + " " + successUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("https://lapencaneta.live/failed?motivo=pago_cancelado")).build();
        }
        return null;
    }

    @GetMapping("/cancel")
    public ResponseEntity<Void> cancelPay() {
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("https://lapencaneta.live/failed?motivo=venta_cancelada")).build();
    }

    @GetMapping("/success/{paymentId}/{PayerID}")
    public ResponseEntity<Void> successPay(@PathVariable("paymentId") String paymentId, @PathVariable("PayerID") String payerId) {
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                if (Objects.nonNull(_pencaId)) {
                    PayerInfo payer = payment.getPayer().getPayerInfo();
                    String res = invoiceService.saveOrder(payment, payer.getEmail(), _pencaId, _auth);
                    if (res.equals("true")) {
                        convertNsend(payment, payer);
                        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("https://lapencaneta.live/success")).build();
                    } else {
                        deletePaymentFailed(paymentId);
                        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("https://lapencaneta.live/failed?motivo=" + res)).build();
                    }
                } else {
                    deletePaymentFailed(paymentId);
                    System.out.println("_pencaId nullardo");
                    return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("https://lapencaneta.live/failed?motivo=problema_con_penca")).build();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void convertNsend(Payment p, PayerInfo py) {
        utilHelper.pdfConverter(p);
        utilHelper.sendInvoice(py.getEmail(), p.getId());
    }

    private void deletePaymentFailed(String paymentId) {
        invoiceService.deleteOrder(paymentId);
    }

}
