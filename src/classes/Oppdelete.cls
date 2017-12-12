global class Oppdelete {  

    webservice static String method1(ID tid){ 

      Opportunity currOpp = [SELECT Id,isClosed FROM Opportunity WHERE id = :tid];
      
      delete currOpp;
      
     return 'true';
     }

}