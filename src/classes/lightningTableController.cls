public with sharing class lightningTableController {
    @AuraEnabled public static lightningTableWraper getsObjectRecords(String ObjectName,String fieldstoget,String searchKey){  
        List<String> lstfieldstoget = fieldstoget.split(',');
        String queryString;
        List<lightningTableColumnWrapper> lstTableColumn = new list<lightningTableColumnWrapper> ();        
        DescribeSObjectResult objResult = Schema.getGlobalDescribe().get(ObjectName).getDescribe();		
        for(String field : lstfieldstoget){
           lightningTableColumnWrapper colWrapper = new lightningTableColumnWrapper();
           DescribeFieldResult fieldResult = objResult.fields.getMap().get(field).getDescribe();
           colWrapper.label = fieldResult.getLabel();
           colWrapper.fieldName = fieldResult.getName();
           colWrapper.type = String.valueof(fieldResult.getType()).toLowerCase();
           colWrapper.sortable = true;
           lstTableColumn.add(colWrapper);
        }
        if(searchKey != Null){
             //queryString = 'Select '+ String.escapeSingleQuotes(String.join(lstfieldstoget,','))+
                            // ' from '+ String.escapeSingleQuotes(ObjectName) +' where CaseNumber Like :searchKey Limit 50'; 
              queryString = 'Select '+ String.escapeSingleQuotes(String.join(lstfieldstoget,','))+
                            ' from '+ String.escapeSingleQuotes(ObjectName) +' where CaseNumber Like \'%'+searchKey + '%\''; 
            
        } 
        else{
            queryString = 'Select '+ String.escapeSingleQuotes(String.join(lstfieldstoget,','))+
                             ' from '+ String.escapeSingleQuotes(ObjectName); 
            
        }
        system.debug('the query string is++'+queryString);
      	LightningTableWraper ltngTableWrapper = new LightningTableWraper();
        ltngTableWrapper.tableRecord = database.query(queryString);
        ltngTableWrapper.tableColumn = lstTableColumn;       
        return ltngTableWrapper;        	
    }
     public class lightningTableColumnWrapper {
        @AuraEnabled
        public string label {get;set;}
        @AuraEnabled
        public String fieldName {get;set;}
        @AuraEnabled
        public string type {get;set;}
        @AuraEnabled
        public boolean sortable {get;set;}        
    }    
    public class lightningTableWraper{
        @AuraEnabled
        public List<sObject> tableRecord {get;Set;}
        @AuraEnabled
        public List<lightningTableColumnWrapper> tableColumn {get;set;}
       
    }
  
}