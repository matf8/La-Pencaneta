package com.fing.lapencaneta.dto;

import com.fing.lapencaneta.entity.OrderPayPal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderPayPalDTO {

    private String id;
    private Float amount;
    private String description;
    private String invoiceId;

}
