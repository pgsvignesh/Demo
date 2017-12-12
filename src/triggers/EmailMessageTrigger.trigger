trigger EmailMessageTrigger on EmailMessage (before insert) {
system.debug('Test');
}