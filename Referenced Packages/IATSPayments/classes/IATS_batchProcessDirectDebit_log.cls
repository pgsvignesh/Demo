/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class IATS_batchProcessDirectDebit_log implements Database.AllowsCallouts, Database.Batchable<Object>, Database.Stateful {
    global List<IATSPayment.IATSPayments_DirectDebit_Utility.wrpDebitReturnData> batchlist;
    global IATS_batchProcessDirectDebit_log(Integer step1, Boolean isScheduled1) {

    }
    global IATS_batchProcessDirectDebit_log(Integer step1, Boolean isScheduled1, Integer transactionListCount, Integer opportunityListCount, Integer CustomerCodeListCount, Integer ContactListCount, List<Contact> lastNameMissingList, List<Contact> emailIncorrectList, Map<Contact,String> stateIncorrectMap, Map<Contact,String> countryIncorrectMap) {

    }
    global Boolean accountsExist() {
        return null;
    }
    global void execute(Database.BatchableContext info, List<Object> batchAllList) {

    }
    global void finish(Database.BatchableContext info) {

    }
    global System.Iterable start(Database.BatchableContext info) {
        return null;
    }
}
