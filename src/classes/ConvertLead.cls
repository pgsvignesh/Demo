global class ConvertLead{      
    @AuraEnabled
    webservice static String autoAccountOrOpportunityCreation(Id  leadId){          
        Database.LeadConvert lc = new Database.LeadConvert();
        lc.setLeadId(leadId);        
        LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
        lc.setConvertedStatus(convertStatus.MasterLabel);        
        Database.LeadConvertResult lcr = Database.convertLead(lc);
        System.assert(lcr.isSuccess());             
        String sfdcBaseURL = URL.getSalesforceBaseUrl().toExternalForm()+'/'+lcr.getAccountId()+'?isConverted=True';
        System.debug('Base URL: ' + sfdcBaseURL );
        return lcr.getAccountId();
        //return accountId; 
    } 
    @AuraEnabled    
    public static Lead getLeadData(Id recordId){  
        System.debug('recordId+++'+recordId);
        Lead lead = [SELECT Id,Email,OwnerId FROM Lead WHERE Id =: recordId]; 
        return lead;        
    }
    
}