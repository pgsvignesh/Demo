public class FieldHistory_AC {
    Public static void trackChanges(Map<Id, SObject> newItems, Map<Id, SObject> oldItems){
        List<Field_History__c> fieldHistoryList = new List<Field_History__c>();
        Map<String,FieldHistorytracking__c> fieldTrackingSetting = FieldHistorytracking__c.getAll();
        List<String> fieldList = new List<String>();
        String relatedField;
        System.debug('newItems++'+newItems);
        System.debug('oldItems++'+oldItems);
        List<SObject> currObjectlist = newItems.values();    
        System.debug('currObjectlist++'+currObjectlist);
        SObjectType objectType = currObjectlist[0].getSObjectType();
        System.debug('objectType++'+objectType);
        if(fieldTrackingSetting != Null && fieldTrackingSetting.size() > 0){
            System.debug('fieldTrackingSetting>>>'+fieldTrackingSetting.get(String.valueOf(objectType)));
            if(fieldTrackingSetting.get(String.valueOf(objectType)) != Null && fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names__c !=Null && fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names__c.split(';') != Null){
                for(String currField :fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names__c.split(';') ){
                    fieldList.add(currField);    
                }
            }
            if(fieldTrackingSetting.get(String.valueOf(objectType)) != Null && fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names_Set_1__c !=Null 
               && fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names_Set_1__c.split(';') != Null){
                   for(String currField :fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names_Set_1__c.split(';') ){
                       fieldList.add(currField);    
                   }
               }
            if(fieldTrackingSetting.get(String.valueOf(objectType)) != Null && fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names_Set_2__c !=Null && fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names_Set_2__c.split(';') != Null){
                for(String currField :fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names_Set_2__c.split(';') ){
                    fieldList.add(currField);    
                }
            }
            if(fieldTrackingSetting.get(String.valueOf(objectType)) != Null && fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names_Set_3__c !=Null && fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names_Set_3__c.split(';') != Null){
                for(String currField :fieldTrackingSetting.get(String.valueOf(objectType)).Field_Names_Set_3__c.split(';') ){
                    fieldList.add(currField);    
                }
            }
            if(fieldTrackingSetting.get(String.valueOf(objectType)) != Null && fieldTrackingSetting.get(String.valueOf(objectType)).Relationship_Field_Name__c != Null){
                relatedField = fieldTrackingSetting.get(String.valueOf(objectType)).Relationship_Field_Name__c;
            } 
            
            
        }
        
        for(sObject currObject : currObjectlist){
            for(String currField : fieldList){                
                if(newItems.get(currObject.id).get(currField) != oldItems.get(currObject.id).get(currField)){
                    Field_History__c currFieldHistory = new Field_History__c();                    
                    currFieldHistory.User__c = userInfo.getUserId();
                    System.debug('currField+++'+currField);
                    currFieldHistory.Field__c = currField;
                    currFieldHistory.From__c = String.valueOf(oldItems.get(currObject.id).get(currField));
                    currFieldHistory.To__c = String.valueOf(newItems.get(currObject.id).get(currField));                    
                    currFieldHistory.Date__c = system.now();
                    if(relatedField != Null){
                        currFieldHistory.put(relatedField,currObject.id);    
                    }
                    if(newItems.get(currObject.id).get(currField) == Null){
                        currFieldHistory.Action__c = 'Deleted';    
                    }else{
                        currFieldHistory.Action__c = 'Updated';     
                    }    
                    fieldHistoryList.add(currFieldHistory);
                }    
            }              
        } 
        if(fieldHistoryList.size() > 0){
            try{
                insert fieldHistoryList;                
            }Catch(Exception ex){
                system.debug('Class Name: FieldHistory_AC; Method Name : trackChanges; Exception occured in Field History Creation'+ex.getMessage());
            }
        }
    }
}