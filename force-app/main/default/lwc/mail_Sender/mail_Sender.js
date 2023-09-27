import { LightningElement} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendEmail from '@salesforce/apex/MailSenderClass.sendEmail';

export default class MailSenderLWC extends LightningElement {
    recipientEmail = '';
    subject = '';
    emailBody = '';

    handleRecipientChange(event) {
        this.recipientEmail = event.target.value;
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleEmailBodyChange(event) {
        this.emailBody = event.target.value;
    }

    sendEmail() {
        const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (this.recipientEmail.match(emailFormat) && this.subject && this.emailBody) {
            sendEmail({ recipientEmail: this.recipientEmail, subject: this.subject, body: this.emailBody })
                .then(() => {
                    this.showToast('Success', 'Email sent successfully', 'success');
                })
                .catch(error => {
                    this.showToast('Error', error.body.message, 'error');
            });
        } else {
            this.showToast('Error', 'Enter all reqquired fields', 'error');
        }
    }


    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }
}