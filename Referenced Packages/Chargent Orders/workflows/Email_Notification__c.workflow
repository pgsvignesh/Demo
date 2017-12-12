<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Account_Updater_Notification</fullName>
        <description>Account Updater Notification</description>
        <protected>false</protected>
        <recipients>
            <field>Email__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Chargent_Templates/Account_Updater_Feature_Html</template>
    </alerts>
    <alerts>
        <fullName>Transaction_Error_Notification</fullName>
        <description>Transaction Error Notification</description>
        <protected>false</protected>
        <recipients>
            <field>Email__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Chargent_Templates/SObject_Error_Email</template>
    </alerts>
    <rules>
        <fullName>Send Account Update Email</fullName>
        <actions>
            <name>Account_Updater_Notification</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Email_Notification__c.Account_Updater_Link__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Send Sobject Error Email</fullName>
        <actions>
            <name>Transaction_Error_Notification</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Email_Notification__c.Email__c</field>
            <operation>notEqual</operation>
            <value>NULL</value>
        </criteriaItems>
        <criteriaItems>
            <field>Email_Notification__c.Status__c</field>
            <operation>equals</operation>
            <value>Error</value>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
</Workflow>
