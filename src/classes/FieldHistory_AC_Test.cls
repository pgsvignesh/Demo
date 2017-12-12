@isTest(SeeAllData = false)
public class FieldHistory_AC_Test {
    public static testmethod void postiveCheckFieldHistory(){
        TestClassUtil.fieldHistoryTrackingForLead();
        Map<id, Lead> newMap = new Map<id, Lead>();
        Map<id, Lead> oldMap = new Map<id, Lead>();    
        Lead currLead = new Lead();
        currLead.lastname = 'test';
        currLead.company = 'test';
        currLead.firstname = 'test';
        currLead.email = 'test@test.com';
        insert currLead;
        newMap.put(currLead.id,currLead);
        List<Lead> currLeadList = [SELECT Id,lastname,firstname,email,company FROM Lead WHERE Id =:currLead.id];        
        currLeadList[0].lastname = 'testupdate';
        currLeadList[0].company = 'testupdate';
        currLeadList[0].firstname = 'testupdate';
        currLeadList[0].email = 'test@testupdate.com';
        update currLeadList; 
        oldMap.put(currLeadList[0].id,currLeadList[0]);
        Test.startTest();
        FieldHistory_AC.trackChanges(newMap,oldMap);
        List<Field_History__c> fieldHistoryList = [SELECT id, From__c,To__c,Lead__c,Date__c,Field__c FROM Field_History__c];
        system.debug('fieldHistoryList+++'+fieldHistoryList);
        for(Field_History__c currFieldHistroy : fieldHistoryList){
            if(currFieldHistroy.Field__c.toLowerCase() == 'lastname'){
                System.assertEquals('testupdate', fieldHistoryList[0].From__c);
                System.assertEquals('test', fieldHistoryList[0].To__c);
                
            }    
             if(currFieldHistroy.Field__c.toLowerCase() == 'firstname'){
               System.assertEquals('testupdate', fieldHistoryList[0].From__c);
                System.assertEquals('test', fieldHistoryList[0].To__c);
                
            }
              if(currFieldHistroy.Field__c.toLowerCase() == 'company'){
               System.assertEquals('testupdate', fieldHistoryList[0].From__c);
                System.assertEquals('test', fieldHistoryList[0].To__c);
                
            }   
                
        }  
        Test.stopTest();  
    }
    public static testmethod void negativeCheckFieldHistory(){
        TestClassUtil.fieldHistoryTrackingForLead();
        Map<id, Lead> newMap = new Map<id, Lead>();
        Map<id, Lead> oldMap = new Map<id, Lead>();    
        Lead currLead = new Lead();
        currLead.lastname = 'test';
        currLead.company = 'test';
        currLead.firstname = 'test';
        currLead.email = 'test@test.com';
        insert currLead;
        newMap.put(currLead.id,currLead);
        List<Lead> currLeadList = [SELECT Id,lastname,firstname,email,company FROM Lead WHERE Id =:currLead.id];        
        currLeadList[0].lastname = 'test';
        currLeadList[0].company = 'test';
        currLeadList[0].firstname = 'test';
        currLeadList[0].email = 'test@test.com';
        update currLeadList; 
        oldMap.put(currLeadList[0].id,currLeadList[0]);
        Test.startTest();
        FieldHistory_AC.trackChanges(newMap,oldMap);
        List<Field_History__c> fieldHistoryList = [SELECT id, From__c,To__c,Lead__c,Date__c,Field__c FROM Field_History__c];
        System.assert(fieldHistoryList.size() == 0);
        Test.stopTest();  
    }
}