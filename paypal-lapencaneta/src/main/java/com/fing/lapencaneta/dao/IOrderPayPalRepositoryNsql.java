package com.fing.lapencaneta.dao;

import com.fing.lapencaneta.entity.OrderInvoicePayPal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderPayPalRepositoryNsql extends MongoRepository<OrderInvoicePayPal, String> {

    @Query("{orderId:'?0'}")
    OrderInvoicePayPal findItemById(String orderId);

   /* @Query(value="{currency:'?0'}", fields="{'id' : 1, 'description' : 1}")
    List<OrderPayPal> findAll(String currency);*/

    long count();

}





