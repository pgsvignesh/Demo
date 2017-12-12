@isTest
private class DynamicController_Test {

    @isTest static void method()
    {
        PageReference pageRef = Page.Dynamic;
        Test.setCurrentPage(pageRef);
        Dynamic__c record = new Dynamic__c(Name = 'Prasath');
        insert record;
        DynamicController controller = new DynamicController(new ApexPages.StandardController(record) );
         System.assert(controller.dynamic == record);
    }
}