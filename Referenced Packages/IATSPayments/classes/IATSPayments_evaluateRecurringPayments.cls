/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class IATSPayments_evaluateRecurringPayments implements Database.Batchable<SObject> {
    global Boolean isTest;
    global static Boolean multiCurrency;
    global static List<SObject> paymentInsertList;
    global static IATSPayment__IATS_settings__c settings;
    global IATSPayments_evaluateRecurringPayments() {

    }
    global static List<SObject> createPayments(Date beginDate, Date endDate, String recurringScheduleType, String recurringScheduleDate, IATSPayment__IATS_Customer_Code__c customerCodeRecord, String multiCurrencyCode) {
        return null;
    }
    global void execute(Database.BatchableContext bc, List<IATSPayment__IATS_Customer_Code__c> result) {

    }
    global void finish(Database.BatchableContext bc) {

    }
    global static void insertPayments(IATSPayment__IATS_Customer_Code__c customerCodeRecord) {

    }
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return null;
    }
}
