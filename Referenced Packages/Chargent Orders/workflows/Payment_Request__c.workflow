<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Payment_Request</fullName>
        <description>Payment Request</description>
        <protected>false</protected>
        <recipients>
            <field>Email_Address__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Chargent_Templates/Payment_Request_Email_Html</template>
    </alerts>
    <rules>
        <fullName>Payment Request Email</fullName>
        <actions>
            <name>Payment_Request</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Payment_Request__c.Send_Payment_Request_Email__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Payment_Request__c.Status__c</field>
            <operation>notEqual</operation>
            <value>Paid</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
</Workflow>
