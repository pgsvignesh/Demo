trigger ContactTrigger on Contact (After update) {
Contact currContact = trigger.new[0];
Account currAccount = [select id,name,By_Pass__c from Account where id = :currContact.Accountid ];

currAccount.name = currContact .lastname;
currAccount.By_Pass__c = true;
update currAccount;

}