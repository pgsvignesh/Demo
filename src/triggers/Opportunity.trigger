trigger Opportunity on Opportunity (before delete) {
    trigger.old[0].stagename.addError('Error Sailappa'); 

}