package com.fing.lapencaneta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@ComponentScan(basePackages = "com.fing.lapencaneta.*")
public class LAPENCANETA {
    public static void main(String[] args) {
        SpringApplication.run(LAPENCANETA.class, args);
        System.out.println("SUBITE Y JUGA CON LA LAPENCANETAAA!");
    }
}
