package com.fing.lapencaneta.business.interfaces;

import com.fing.lapencaneta.entity.OrderPayPal;
import com.paypal.api.payments.Payment;

public interface IOrderInvoicePayPalService {

    String saveOrder(Payment payment, String correo, Integer pencaId, String auth) throws Exception;
    void saveOrderUntilSuccess(OrderPayPal order);
   // void deleteOrder(String idOrder);
}
