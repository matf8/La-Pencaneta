package com.fing.lapencaneta.helper;

import com.paypal.api.payments.Payment;
import com.paypal.api.payments.Transaction;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.stereotype.Service;

import java.io.InputStream;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

@Service
public class UtilHelper {

    public void pdfConverter(Payment payment) {
        try {
            PDPage page = new PDPage();

            String transactionId = payment.getId();

            Transaction transaction = payment.getTransactions().get(0);
            String totalUY = String.valueOf(Float.valueOf(transaction.getAmount().getTotal()) * 44.5);   // A PESOS URUGUAYOS DOLAR ~45
            String description = transaction.getDescription();

            String payerEmail = payment.getPayer().getPayerInfo().getEmail();
            String payerName = payment.getPayer().getPayerInfo().getFirstName();
            String payerLastName = payment.getPayer().getPayerInfo().getLastName();
            String country;
            try {
                country = payment.getPayer().getPayerInfo().getShippingAddress().getCountryCode();
            } catch (Exception e) {
                country = "Desconocido";
            }
            String city = payment.getPayer().getPayerInfo().getShippingAddress().getCity();
            String state = payment.getPayer().getPayerInfo().getShippingAddress().getState();
            String street1 = payment.getPayer().getPayerInfo().getShippingAddress().getLine1();
            String street2 = payment.getPayer().getPayerInfo().getShippingAddress().getLine2();
            String phone = payment.getPayer().getPayerInfo().getShippingAddress().getPhone();

            PDDocument document = new PDDocument();
            document.addPage(page);
            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            byte[] icon = getBytesArrays();
            if (Objects.nonNull(icon)) {
                PDImageXObject pdImage = PDImageXObject.createFromByteArray(document, icon, "logo");
                contentStream.drawImage(pdImage, 350, 150);
            } else System.out.println("icon wrong");

            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 15);
            contentStream.beginText();
            // title
            contentStream.addComment("Invoice Paypal @ LA PENCANETA");
            contentStream.setLeading(14.5f);
            contentStream.newLineAtOffset(25, 755);
            contentStream.setFont(PDType1Font.HELVETICA, 12);
            contentStream.newLine();
            contentStream.newLine();
            contentStream.newLine();
            contentStream.newLine();
            contentStream.newLine();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
            contentStream.showText("Gracias por su inscripción en LA PENCANETA");
            contentStream.newLine();
            contentStream.newLine();
            contentStream.setFont(PDType1Font.HELVETICA, 12);
            contentStream.showText(payerName + ", se ha inscripto satisfactoriamente.");
            contentStream.newLine();
            contentStream.showText("Guarde el recibo en caso de algún problema.");
            contentStream.newLine();
            contentStream.showText("Por reembolsos comunicarse con la administración o responda este email.");
            contentStream.newLine();
            contentStream.newLine();
            contentStream.newLine();

            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 15);
            // billing
            contentStream.showText("Dirección de facturación");
            contentStream.setFont(PDType1Font.HELVETICA, 12);
            contentStream.newLine();
            contentStream.newLine();

            contentStream.showText("País: " + country + ", Departamento: " + state + ", Ciudad: " + city);
            contentStream.newLine();
            contentStream.newLine();

            contentStream.showText((Objects.isNull(street1)?"":street1) + " " + (Objects.isNull(street2)?"":street2));
            contentStream.newLine();
            contentStream.newLine();

            contentStream.showText("Telefóno: " + (Objects.isNull(phone)?"Sin telefono":phone));
            contentStream.newLine();
            contentStream.newLine();

            contentStream.showText("Email: " + payerEmail);
            contentStream.newLine();
            contentStream.newLine();
            contentStream.newLine();

            // total
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 15);
            contentStream.showText("Total: $U " + totalUY);
            contentStream.setFont(PDType1Font.HELVETICA, 12);
            contentStream.newLine();
            contentStream.newLine();
            contentStream.showText("Transacción: " + transaction.getRelatedResources().get(0).getSale().getId());
            contentStream.newLine();
            contentStream.showText("Descripción de compra: " +  (Objects.isNull(description)?"Sin descripción":description));

            contentStream.endText();
            contentStream.close();

            PDDocumentInformation pdd = document.getDocumentInformation();

            //Setting the author of the document
            pdd.setAuthor("la pencaneta");
            // Setting the title of the document
            pdd.setTitle("Invoice Paypal - LA PENCANETA SA");
            document.save(transactionId + ".pdf");
            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void sendInvoice(String correo, String name) {

        String to = correo; //Email address of the recipient
        final String user="lapencaneta@gmail.com"; //Email address of sender
        final String password="vqoixmvlsmzhwlat";  //Password of the sender's email

        //Get the session object
        Properties p = new Properties();

        //Here pass your smtp server url
        p.put("mail.smtp.host", "smtp.gmail.com");
        p.setProperty("mail.smtp.starttls.enable", "true");
        p.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        p.setProperty("mail.smtp.port", "587");
        p.setProperty("mail.smtp.user", "correo");
        p.setProperty("mail.smtp.auth", "true");

        Session session = Session.getDefaultInstance(p, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user,password);
            }
        });

        //Compose message
        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(user));
            message.addRecipient(Message.RecipientType.TO,new InternetAddress(to));
            message.setSubject("Invoice paypal - LA PENCANETA");

            //Create MimeBodyPart object and set your message text
            BodyPart messageBodyPart1 = new MimeBodyPart();
            messageBodyPart1.setText("Gracias por inscribirse!");

            //Create new MimeBodyPart object and set DataHandler object to this object
            MimeBodyPart messageBodyPart2 = new MimeBodyPart();
            String filename = name + ".pdf";
            DataSource source = new FileDataSource(filename);
            messageBodyPart2.setDataHandler(new DataHandler(source));
            messageBodyPart2.setFileName(filename);

            //Create Multipart object and add MimeBodyPart objects to this object
            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart1);
            multipart.addBodyPart(messageBodyPart2);

            //Set the multiplart object to the message object
            message.setContent(multipart);

            //Send message
            Transport t = session.getTransport("smtp");
            t.connect(user,password);
            t.sendMessage(message, message.getAllRecipients());
            t.close();

            System.out.println("message sent....");
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }
    }

    private byte[] getBytesArrays() throws Exception {
        InputStream icon = this.getClass().getClassLoader().getResourceAsStream("icon.png");
        if (Objects.nonNull(icon))
            return icon.readAllBytes();
        else return null;
    }
}