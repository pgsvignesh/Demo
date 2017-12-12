<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Customer_Receipt</fullName>
        <description>Customer Receipt</description>
        <protected>false</protected>
        <recipients>
            <field>Billing_Email__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Chargent_Templates/Customer_Receipt</template>
    </alerts>
    <alerts>
        <fullName>Recurring_Transaction_Failure_Email_Alert</fullName>
        <description>Recurring Transaction Failure Email Alert</description>
        <protected>false</protected>
        <recipients>
            <field>Billing_Email__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Chargent_Templates/Payment_Issue_Alert</template>
    </alerts>
    <fieldUpdates>
        <fullName>Invert_Refund</fullName>
        <description>Used to convert the transaction amount to a negative upon successful refund of a transaction. This will now calculate properly in Balance Due and Total Transactions</description>
        <field>Amount__c</field>
        <formula>0</formula>
        <name>Invert Refund</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Customer Receipt</fullName>
        <actions>
            <name>Customer_Receipt</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Transaction__c.Type__c</field>
            <operation>equals</operation>
            <value>Charge</value>
        </criteriaItems>
        <criteriaItems>
            <field>Transaction__c.Response_Status__c</field>
            <operation>equals</operation>
            <value>Approved</value>
        </criteriaItems>
        <description>This rule fires on successful Chargent payment transactions.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Error with Recurring Payment</fullName>
        <actions>
            <name>Recurring_Transaction_Failure_Email_Alert</name>
            <type>Alert</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Transaction__c.Response_Status__c</field>
            <operation>equals</operation>
            <value>Declined,Error</value>
        </criteriaItems>
        <criteriaItems>
            <field>Transaction__c.Recurring__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <description>This workflow rule fires when a recurring transaction fails to be completed.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Invert Refund</fullName>
        <actions>
            <name>Invert_Refund</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <description>No longer used. A Refund will now create a NEW transaction with a negative amount.</description>
        <formula>1=2</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
</Workflow>
