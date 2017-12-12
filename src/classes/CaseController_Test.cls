@isTest(seeAllData = false)
public class CaseController_Test {  
    public static testMethod  void testCreateCase(){
        String currCase = CaseController.createCase(); 
    }
    public static testMethod  void testSaveCase(){
        String currCase = CaseController.createCase();
        CaseController.saveCase(currCase);
    }
    public static testMethod  void testDeleteCase(){
        String currCase = CaseController.createCase();
        CaseController.deleteCase(currCase);
    }
    public static testMethod  void testGetCase(){
        String currCase = CaseController.createCase();
        CaseController.getCases();
    }
}