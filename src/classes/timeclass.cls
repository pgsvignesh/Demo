global class timeclass {  

    webservice static String method1(ID tid){ 

      Opportunity currOpp = [SELECT Id,isClosed FROM Opportunity WHERE id = :tid];
      
      if(currOpp.isClosed){
          return 'False';
      }else{
          return 'True';
      }
     }

}