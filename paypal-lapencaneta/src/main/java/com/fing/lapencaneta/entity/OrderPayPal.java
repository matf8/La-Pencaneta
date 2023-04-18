package com.fing.lapencaneta.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderPayPal {

    private String id;
    private Float amount;
    private String description;
    private String invoiceIdMongo;

    public static final String currency = "USD";
    public static final String method = "PAYPAL";
    public static final String intent = "SALE";
    public static final String successUrl = "https://lapencaneta.live/receptorpaypal"; //    public static final String successUrl = https://lapencaneta.uru-buy.me/ ; "http://localhost:5000/paypal/success";
    public static final String cancelUrl = "https://lapencaneta.live/failed?motivo=pago+cancelado";

}
