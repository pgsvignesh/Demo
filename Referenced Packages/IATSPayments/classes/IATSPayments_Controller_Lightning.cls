/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class IATSPayments_Controller_Lightning {
    global Account accountRecord;
    global String ACH_SortCode {
        get;
        set;
    }
    global String ACHaccountBankID {
        get;
        set;
    }
    global String ACHaccountNumber {
        get;
        set;
    }
    global String ACHaccountNumberEuro {
        get;
        set;
    }
    global String ACHaccountType {
        get;
        set;
    }
    global String ACHbankId {
        get;
        set;
    }
    global String ACHroutingNumber {
        get;
        set;
    }
    global String ACHtransitId {
        get;
        set;
    }
    global String aid;
    global String amt;
    global String authStatus {
        get;
        set;
    }
    global List<IATSPayment__IATS_Account__c> availableAccounts;
    global String baseURL {
        get;
        set;
    }
    global String callingRecordId {
        get;
        set;
    }
    global String cancellationCode {
        get;
        set;
    }
    global String ccResult {
        get;
        set;
    }
    global String city {
        get;
        set;
    }
    global String company {
        get;
        set;
    }
    global Contact contactRecord;
    global String country {
        get;
        set;
    }
    global Boolean createOpportunity {
        get;
        set;
    }
    global String creditCardExpDate {
        get;
        set;
    }
    global String creditCardNumber {
        get;
        set;
    }
    global String creditCardType {
        get;
        set;
    }
    global String customerCode {
        get;
        set;
    }
    global String customerCodeACHaccountNumber {
        get;
        set;
    }
    global String customerCodeACHaccountType {
        get;
        set;
    }
    global String customerCodeCreditCardExpDate {
        get;
        set;
    }
    global String customerCodeCreditCardNumber {
        get;
        set;
    }
    global List<IATSPayment__IATS_Customer_Code__c> customerCodeList;
    global String customerCodeMethodPayment {
        get;
        set;
    }
    global IATSPayment__IATS_Customer_Code__c customerCodeRecord {
        get;
        set;
    }
    global String customerCodeRecordId {
        get;
        set;
    }
    global String customerCodeRecurringAmount {
        get;
        set;
    }
    global Boolean customerCodeRelatedToOpp {
        get;
        set;
    }
    global Boolean customerCodesExist {
        get;
        set;
    }
    global String dateFormat {
        get;
        set;
    }
    global Boolean DeleteCustomerCodeFlag;
    global String DirectDebitProcessor {
        get;
        set;
    }
    global Boolean editCCExpiryDateInfo {
        get;
        set;
    }
    global Boolean EditPaymentInfo {
        get;
        set;
    }
    global String emailAddress {
        get;
        set;
    }
    global String emptyMsg {
        get;
        set;
    }
    global Set<String> FieldNameSet;
    global String firstName {
        get;
        set;
    }
    global String gwa;
    global String IATSAccountCurrency {
        get;
        set;
    }
    global Id IATSAccountId {
        get;
        set;
    }
    global IATSPayment__IATS_Account__c IATSAccountRecord {
        get;
        set;
    }
    global String IATSAccountSystem {
        get;
        set;
    }
    global Boolean IATSConnectionError {
        get;
        set;
    }
    global String IATSConnectionMessage {
        get;
        set;
    }
    global String invoiceNumber {
        get;
        set;
    }
    global Boolean isCreated;
    global Boolean isSuccess {
        get;
        set;
    }
    global Boolean isTest;
    global String lastName {
        get;
        set;
    }
    global Map<String,Schema.SObjectField> M;
    global String mandateID {
        get;
        set;
    }
    global Date mandateSigningDate {
        get;
        set;
    }
    global String methodPayment {
        get;
        set;
    }
    global String mPayment {
        get;
        set;
    }
    global String objectType;
    global Boolean oneAccount {
        get;
        set;
    }
    global Boolean oneCustomerCode {
        get;
        set;
    }
    global String oneTimePaymentResultMsg {
        get;
        set;
    }
    global String oneTimePaymentResultMsg_title {
        get;
        set;
    }
    global String oneTimePaymentResultMsg_truncated {
        get;
        set;
    }
    global Opportunity opportunityRecord;
    global Boolean paymentExecuted {
        get;
        set;
    }
    global Boolean paymentInfoChanged {
        get;
        set;
    }
    global Boolean paymentsModule;
    global Boolean paymentsPackage;
    global String PaymentType {
        get;
        set;
    }
    global Boolean previouslyActive {
        get;
        set;
    }
    global Boolean processed {
        get;
        set;
    }
    global String processor {
        get;
        set;
    }
    global String recurringAmount {
        get;
        set;
    }
    global String recurringBeginDate;
    global Opportunity recurringBeginDateOppHolder;
    global String recurringEndDate;
    global Opportunity recurringEndDateOppHolder;
    global Opportunity recurringMandateDateOppHolder {
        get;
        set;
    }
    global Opportunity recurringMandateOppHolder;
    global String recurringMandateSigningDate;
    global Boolean recurringModule;
    global Boolean recurringPackage;
    global String recurringPaymentResultMsg {
        get;
        set;
    }
    global Boolean recurringPaymentsCreated {
        get;
        set;
    }
    global SObject recurringRecord;
    global String recurringResponse {
        get;
        set;
    }
    global String recurringscheduleDate;
    global String recurringscheduleType {
        get;
        set;
    }
    global SObject recurringSettings;
    global String recurringStatus {
        get;
        set;
    }
    global Boolean recurrUpdate {
        get;
        set;
    }
    global String refNumberError {
        get;
        set;
    }
    global String refNumberStatus {
        get;
        set;
    }
    global List<IATSPayment.IATSPayments_Controller_Lightning.relatedRecord> relatedRecords {
        get;
        set;
    }
    global Boolean RelatedRecordsExist {
        get;
        set;
    }
    global Boolean RelatedRecordsMultiple {
        get;
        set;
    }
    global Boolean resultOK {
        get;
        set;
    }
    global Boolean savePaymentInfo {
        get;
        set;
    }
    global String savePaymentInfoResponse {
        get;
        set;
    }
    global Boolean saveSuccess {
        get;
        set;
    }
    global String server;
    global IATSPayment__IATS_settings__c Settings;
    global Boolean SF1 {
        get;
        set;
    }
    global String SFCurrencyCode;
    global String stateProvince {
        get;
        set;
    }
    global String streetAddress {
        get;
        set;
    }
    global String strEntryMode {
        get;
        set;
    }
    global String totalAmount {
        get;
        set;
    }
    global String transactionID;
    global IATSPayment.IATSPayments_validateACH_UK validateACH_Class {
        get;
        set;
    }
    global Boolean validateUKNow {
        get;
        set;
    }
    global Boolean validationError {
        get;
        set;
    }
    global String zipCode {
        get;
        set;
    }
    global IATSPayments_Controller_Lightning(ApexPages.StandardController controller) {

    }
    global String IATSServerRequest(String url, String body) {
        return null;
    }
    global String IATSServerRequestProcess(String url, String body) {
        return null;
    }
    global void UpdateCustomerCode(String updateType) {

    }
    global void blankPaymentInfoFields() {

    }
    global String cleanACHNumber(String achNumber) {
        return null;
    }
    global String cleanAmount(String amount) {
        return null;
    }
    global String cleanCreditCardNumber(String ccNumber) {
        return null;
    }
    global String cleanEuroBankInfo(String bankInfo) {
        return null;
    }
    global void clearCustomerCodeFields() {

    }
    global Date convertStringToDate(String dateHolder) {
        return null;
    }
    global void createCustomerCode(String buttonType) {

    }
    global List<Opportunity> createOpportunities() {
        return null;
    }
    global List<SObject> createPayments() {
        return null;
    }
    global System.PageReference createSEPAMandateID() {
        return null;
    }
    global void createUpdateRecurringButton() {

    }
    global void customerCodeRelatedRecords() {

    }
    global void deleteCustomerCode(String customerCode) {

    }
    global void editCCExpiryDate() {

    }
    global void editPaymentInfoTrue() {

    }
    global String formatDate(Date dateHolder) {
        return null;
    }
    global List<System.SelectOption> getACHaccountTypeOptions() {
        return null;
    }
    global List<System.SelectOption> getCancellationCodeOptions() {
        return null;
    }
    global List<System.SelectOption> getClientCodeOptions() {
        return null;
    }
    global List<System.SelectOption> getCreditCardTypeOptions() {
        return null;
    }
    global List<IATSPayment__IATS_Customer_Code__c> getCustomerCodeList() {
        return null;
    }
    global List<System.SelectOption> getCustomerCodeOptions() {
        return null;
    }
    global String getGwa() {
        return null;
    }
    global List<System.SelectOption> getMPaymentOptions() {
        return null;
    }
    global List<System.SelectOption> getRecurringScheduleDateOptions() {
        return null;
    }
    global List<System.SelectOption> getRecurringScheduleTypeOptions() {
        return null;
    }
    global SObject getRecurringSettings() {
        return null;
    }
    global List<System.SelectOption> getRecurringStatusOptions() {
        return null;
    }
    global String getRejectCodeSyntax() {
        return null;
    }
    global IATSPayment__IATS_settings__c getSettings() {
        return null;
    }
    global Opportunity getrecurringBeginDateOppHolder() {
        return null;
    }
    global Opportunity getrecurringEndDateOppHolder() {
        return null;
    }
    global Opportunity getrecurringMandateOppHolder() {
        return null;
    }
    global String getrecurringscheduleDate() {
        return null;
    }
    global void insertUpdateOpportunities() {

    }
    global void insertUpdatePayments() {

    }
    global static Boolean isValidCC(String creditCardNumber) {
        return null;
    }
    global Boolean multiCurrencyCode() {
        return null;
    }
    global void obtainAddressInformation() {

    }
    global Boolean obtainCustomerCodeInformation() {
        return null;
    }
    global String processACHPayment() {
        return null;
    }
    global String processACHPaymentCustomerCode() {
        return null;
    }
    global String processCCPayment() {
        return null;
    }
    global String processCCPaymentCustomerCode() {
        return null;
    }
    global void processNewCustomerCode(String buttonType, String resultMsg, String calloutType) {

    }
    global System.PageReference processPaymentButton() {
        return null;
    }
    global void processPaymentButton_SF1() {

    }
    global void processUpdateCustomerCode(String updateType, String resultMsg, String calloutType, Boolean UKACHError) {

    }
    global System.PageReference savePaymentInfoButton() {
        return null;
    }
    global void setCallingRecordId() {

    }
    global void setPaymentTypeOneTime() {

    }
    global void setPaymentTypeRecurring() {

    }
    global void setUsernamePassword() {

    }
    global void setaid() {

    }
    global void setamt() {

    }
    global void setgwa() {

    }
    global void setrecurringBeginDateOppHolder() {

    }
    global void setrecurringEndDateOppHolder() {

    }
    global void setrecurringMandateOppHolder() {

    }
    global void setrecurringscheduleDate(String recurringscheduleDate) {

    }
    global void setterForRecurringDates() {

    }
    global void setupSettings() {

    }
    global void updateAccountSelected() {

    }
    global void updateCustomerCodeSelected() {

    }
    global void urlgrab() {

    }
    global void validateACH_CDN() {

    }
    global void validateACH_UK() {

    }
    global void validateACH_US() {

    }
    global void validateAmount() {

    }
    global void validateCity() {

    }
    global void validateCreditCardExpDate() {

    }
    global void validateCreditCardNumber() {

    }
    global void validateEmailAddress() {

    }
    global void validateFirstName() {

    }
    global void validateLastName() {

    }
    global void validatePayment() {

    }
    global void validateRecurringPayment() {

    }
    global void validateStreetAddress() {

    }
    global void validateUK() {

    }
    global void validateZipCode() {

    }
    global void verifyUserAccount() {

    }
global class relatedRecord {
    global Id recordId {
        get;
        set;
    }
    global String recordName {
        get;
        set;
    }
    global relatedRecord() {

    }
}
}
