/*Created By: MST Solutions 
Created Date: 05/04/2017 
Description:This Class a Util class for supporting all the Test classes*/
@isTest 
public class TestClassUtil {
    //Create Custom Settings to enable field tracking
    public static Void fieldHistoryTrackingForLead(){
        FieldHistorytracking__c fieldHistory = new FieldHistorytracking__c(Name = 'Lead',
                         Field_Names__c = 'lastname',
                         Field_Names_Set_1__c='company',
                         Field_Names_Set_2__c = 'firstname',
                                               Field_Names_Set_3__c = 'email',
                         Object_Name__c = 'Lead',
                         Relationship_Field_Name__c = 'Lead__c');
       try{
         insert fieldHistory;
       }Catch(Exception ex){
            system.debug('Class Name: TestClassUtil; Method Name : createFieldHistoryTracking; Exception occured in FieldHistorytracking creation '+ex.getMessage());
       }
        System.debug('fieldHistory++'+fieldHistory.Field_Names__c);
       //return fieldHistory;
    }
      
   }