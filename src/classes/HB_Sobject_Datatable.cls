/*
 Author : flexandsalesforce.blogspot.com
*/
public without sharing class HB_Sobject_Datatable {
  @AuraEnabled
    public static DynamicSobjectWrapper fetchRecords(String SobjectAPIName)
    { 
        
        List<String> lstFieldApiNames= new List<String>();
        List<String> lstFieldLabels= new List<String>();
        List<SObject> lstSobjectData= new List<SObject>();
        
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe(); 
        Schema.SObjectType leadSchema = schemaMap.get(SobjectAPIName);
        Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
        String queryString = 'select ';
        Map<Schema.SObjectField,String> fieldToAPIName = new Map<Schema.SObjectField,String>();
        Map<String, String> apiNameToLabel = new Map<String, String>();
        for(String fieldName : fieldMap.keySet()){     
              if(fieldMap.get(fieldName).getDescribe().isCreateable()){
                queryString  = queryString +''+fieldMap.get(fieldName)+',';
                lstFieldApiNames.add(string.valueof(fieldMap.get(fieldName)));
                lstFieldLabels.add(fieldMap.get(fieldName).getDescribe().getLabel());
              }
        }    
        system.debug('**********'+lstFieldApiNames);
        queryString  = queryString.substring(0,queryString.length()-1);
        system.debug(queryString );
        queryString  = queryString +' from '+SobjectAPIName+' where id!=null limit 100';
        system.debug(queryString );
        lstSobjectData= database.query(queryString );
            
        return new DynamicSobjectWrapper (lstFieldApiNames, lstFieldLabels, lstSobjectData);
    }
    
    public class DynamicSobjectWrapper 
    {
        @AuraEnabled
        public List<String> lstFieldApiNames{ get;set; }
        
        @AuraEnabled
        public List<String> lstFieldLabels{ get;set; }
        
        @AuraEnabled
        public List<SObject> lstSobjectData{ get;set; }
        
        public DynamicSobjectWrapper (List<String> lstFieldApiNames, List<String> lstFieldLabels, List<SObject> lstSobjectData)
        {
            this.lstFieldApiNames= lstFieldApiNames;
            this.lstFieldLabels= lstFieldLabels;
            this.lstSobjectData= lstSobjectData;
        }
    }
}