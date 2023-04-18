package com.fing.lapencaneta.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Produces(MediaType.APPLICATION_JSON)
public class InscriptionDTO {

    private String token;
    private Integer pencaId;
    private Float monto;

}
