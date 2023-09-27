public with sharing class MailSenderClass {
    @AuraEnabled
    public static void sendEmail(String recipientEmail, String subject, String body) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new List<String>{recipientEmail});
        mail.setSubject(subject);
        mail.setPlainTextBody(body);

        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>{mail};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(emails);
    }
}