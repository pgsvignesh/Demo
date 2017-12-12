public class LeadControllerExtension {
    public Set<string> nscities         {Set;get;}
    public Set<string> scities          {set;get;}
    public List<selectoption> soptions  {set;get;}
    public List<selectoption> nsoptions   {set;get;}
    public List<string> selected        {set;get;}
    public List<string> removed     {set;get;}
    public List<Lead> leadLst{get;set;}
    public map<String,PartnerNetworkConnection> partnerConnection{get;set;}
   
    public LeadControllerExtension(ApexPages.StandardSetController controller){
        System.debug('Inside the Custom Set controller');
    	leadLst = (List<Lead>) controller.getRecords(); 
        System.debug('Inside the Custom Set controller');
        partnerConnection = new map<String,PartnerNetworkConnection>();
        for(PartnerNetworkConnection pcConnection : [SELECT ID,ConnectionName from PartnerNetworkConnection]){
        	partnerConnection.put(pcConnection.ConnectionName,pcConnection);    
        }
        nscities=new Set<string>();
        
        scities=new Set<string>();
        soptions=new List<selectoption>();
        nsoptions=new List<selectoption>();
        selected=new List<string>();
        removed=new List<string>();
        for(String connectionName : partnerConnection.keySet()){
        	nscities.add(connectionName);    
        }
        calloptions();
       
    }
      public void callOptions(){
        nsoptions.clear();
        soptions.clear();
        if(scities.size() <= 0){
            SelectOption p=new SelectOption('none','-None-');
            soptions.add(p);
        }else{
            for(String s1:scities){
                SelectOption op1=new SelectOption(s1,s1);
                soptions.add(op1);
            }
        }
         if(nscities.size() <= 0){
            SelectOption p1=new SelectOption('none','-None-');
            nsoptions.add(p1);
        }else{
            for(String s2:nscities){
                SelectOption op2=new SelectOption(s2,s2);
                nsoptions.add(op2);
            }
        }
    }
    public void addElements(){
        nscities.removeAll(selected);
        scities.addAll(selected);
        calloptions();
    }
    public void removeElements(){
       scities.removeAll(removed);
       nscities.addAll(removed);
        calloptions();
    }

}