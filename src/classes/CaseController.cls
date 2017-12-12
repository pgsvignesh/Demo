public class CaseController {
    
    @AuraEnabled
    public static String createCase() {
        Case currCase = new Case();
        currCase.status = 'New';
        currCase.origin = 'Web';
        try{
            Insert currCase;    
        }Catch (Exception ex){
            system.debug('The exception is +'+ex.getmessage());    
        }
        return json.serialize(currCase);
    }
    @AuraEnabled
    public static Case saveCase(String currCase) {
        // Perform isUpdatable() checking first, then
        system.debug('CurrCase+'+currCase);       
        List<User> currUserList = [SELECT contactId from User WHERE ID =:userinfo.getuserid()];
        Case newCase = (Case) json.deserialize(currCase, Case.class);
        if(currUserList.size() > 0 && currUserList[0].contactId != Null){
        	newCase.ContactId = currUserList[0].contactId;    
        }
        try{
            upsert newCase;    
        }Catch (Exception ex){
            system.debug('The exception is +'+ex.getmessage());    
        }
        return newCase;
    }
    @AuraEnabled
    public static String deleteCase(String currCase) {
        Case caseToBeDeleted = (Case) json.deserialize(currCase, Case.class);
        try{
            Delete caseToBeDeleted;    
        }Catch (Exception ex){
            system.debug('The exception is +'+ex.getmessage());    
        }
        Case newCase = New Case();
        return json.serialize(newCase);
    }
    @AuraEnabled
    public static List<Case> getCases(){
        return [SELECT Id, status, subject, description FROM Case ORDER BY createdDate ASC];
        
    }
    
    
    
}