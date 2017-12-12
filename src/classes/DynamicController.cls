public class DynamicController {
    public Dynamic__c Dynamic{get; set;}
    public DynamicController(ApexPages.StandardController stdController) {
        this.Dynamic = (Dynamic__c)stdController.getRecord();
        Dynamic=[select Name,Image__c,Image2__c,content__c,content1__c,content2__c from Dynamic__c Where CreatedById =: UserInfo.getUserId() Limit 1];
    }
}