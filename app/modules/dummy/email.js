define(function() {

    var showEmailComposer = function (subject, body,
        toRecipients, ccRecipients, bccRecipients, bIsHTML, attachments, attachmentsData) {
        console.log("****************************AVVIATO");
        var args = {};
        if (toRecipients)
            args.toRecipients = toRecipients;
        if (ccRecipients)
            args.ccRecipients = ccRecipients;
        if (bccRecipients)
            args.bccRecipients = bccRecipients;
        if (subject)
            args.subject = subject;
        if (body)
            args.body = body;
        if (bIsHTML)
            args.bIsHTML = bIsHTML;
        if (attachments)
            args.attachments = attachments;
        if (attachmentsData)
            args.attachmentsData = attachmentsData;
    };

    return {
        send: function (imageData, subject, body) {
            showEmailComposer(subject, body, null, null, null, false, null, [['slika.png', imageData]]);
        }
    };

    
})