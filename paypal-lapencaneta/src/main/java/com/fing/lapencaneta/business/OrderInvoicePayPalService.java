package com.fing.lapencaneta.business;

import com.fing.lapencaneta.dao.IOrderPayPalRepositoryNsql;
import com.fing.lapencaneta.business.interfaces.IOrderInvoicePayPalService;
import com.fing.lapencaneta.dto.TransactionDTO;
import com.fing.lapencaneta.entity.OrderInvoicePayPal;
import com.fing.lapencaneta.entity.OrderPayPal;

import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import com.paypal.api.payments.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Service;

import javax.ws.rs.Produces;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URLEncoder;
import java.util.Objects;

@Service
@Slf4j
@EnableMongoRepositories(basePackages = "com.fing.lapencaneta.dao")
public class OrderInvoicePayPalService implements IOrderInvoicePayPalService {

    @Autowired private IOrderPayPalRepositoryNsql orderNsql;
    @Autowired private MongoTemplate mongoTemplate;
    private OrderPayPal tmpOrder;

    public void saveOrderUntilSuccess(OrderPayPal order) {
        if (order != null)
            tmpOrder = order;
    }

    public String saveOrder(Payment p, String email, Integer pencaId, String auth) throws Exception {
        if (Objects.nonNull(tmpOrder) && Objects.nonNull(p)) {
            if (Objects.nonNull(pencaId) && Objects.nonNull(auth)) {
                OrderInvoicePayPal invoice = new OrderInvoicePayPal();
                invoice.setInvoice(p);
                invoice.setUserId(email);
                orderNsql.save(invoice);
                tmpOrder.setInvoiceIdMongo(invoice.getId());
                invoice.setOrderId(tmpOrder.getId());
                updateOrderInvoice(invoice);
                if (Objects.nonNull(pencaId))
                    return checkoutInscribirse(pencaId, invoice.getId(), auth);
            } else return "algun_null[pencaId,auth]";
        } else return "con_pago";
        return "orden_mal_formada";
    }

    @Produces("application/json")
    private String checkoutInscribirse(Integer pencaId, String invoiceId, String auth) throws Exception {
        auth = "Bearer " + auth;
        Client client = ClientBuilder.newClient();
        TransactionDTO transactionPayPal = new TransactionDTO(invoiceId, pencaId);
        WebTarget myResource = client.target("https://backendpractico.azurewebsites.net/api/Paypal").path("/checkout");
        Response rs = myResource.request(MediaType.APPLICATION_JSON).header(HttpHeaders.AUTHORIZATION, auth)
                .post(Entity.json(transactionPayPal), Response.class);
        if (rs.getStatus() != 200) {
            String res = rs.readEntity(String.class);
            return URLEncoder.encode(res, "UTF-8");
        }
        else return "true";
    }

    private void updateOrderInvoice(OrderInvoicePayPal invoice) {
        try {
            Query query = new Query(Criteria.where("id").is(invoice.getId()));
            Update update = new Update();
            update.set("orderId", invoice.getOrderId());
            UpdateResult result = mongoTemplate.updateFirst(query, update, OrderInvoicePayPal.class);
            if (Objects.isNull(result))
                log.warn("No documents updated");
            else
                log.info(result.getModifiedCount() + " document(s) updated..");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // bora una orden y su factura
    public void deleteOrder(String idOrder) {
      /* OrderPayPal order = paypalJpa.findById(idOrder).orElse(null);
        if (Objects.nonNull(order)) {
            OrderInvoicePayPal invoice = orderNsql.findItemById(order.getId());
            orderNsql.delete(invoice);
            paypalJpa.delete(order);
        }*/
    }
}
