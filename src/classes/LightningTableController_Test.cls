@isTest(seeAllData = false)
public class LightningTableController_Test {
    public static testMethod  void testCreateCase(){
        String currCase = CaseController.createCase(); 
        lightningTableController.lightningTableWraper currWrapper = lightningTableController.getsObjectRecords('Case','status,description,subject',null);
    }

}