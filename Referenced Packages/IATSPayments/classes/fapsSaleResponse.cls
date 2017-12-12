/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class fapsSaleResponse {
    global String action;
    global IATSPayment.fapsSaleResponse.Data data;
    global List<String> errorMessages;
    global Boolean isError;
    global Boolean isSuccess;
    global List<String> validationFailures;
    global Boolean validationHasFailed;
    global fapsSaleResponse() {

    }
    global static IATSPayment.fapsSaleResponse parse(String json) {
        return null;
    }
global class Data {
    global String authCode;
    global String authResponse;
    global String avsResponse;
    global String cardDeclinedMessage;
    global String cardDeclinedNo;
    global String cardType;
    global String cvv2Response;
    global Boolean isPartial;
    global String last4;
    global String maskedPa;
    global String orderId;
    global Double origialFullAmount;
    global Double partialAmountApproved;
    global String partialId;
    global String referenceNumber;
    global String token;
    global Data() {

    }
}
}
