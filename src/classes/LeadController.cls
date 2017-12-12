public class LeadController {
    @AuraEnabled
    public static Lead saveLead(Lead currLead){
       // Lead cuLead = (Lead) JSON.deserialize(currLead, Lead.class);
        System.debug('The Value++'+currLead);
        try{
            Insert currLead;
        }Catch(Exception ex){
            System.debug('Excpetion caused'+ex.getMessage());
        }
        Lead insertedLead = [SELECT firstname,lastname,Company FROM Lead where id = :currLead.id];
        return insertedLead;
    }
}