<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>PartialPayment</fullName>
        <field>Payment_Received__c</field>
        <literalValue>Partial</literalValue>
        <name>Partial Payment</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>PaymentFull</fullName>
        <field>Payment_Received__c</field>
        <literalValue>Full</literalValue>
        <name>Payment Full</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Manual_Charge_to_True</fullName>
        <field>Manual_Charge__c</field>
        <literalValue>1</literalValue>
        <name>Set Manual Charge to True</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>UpdateChargeAmount</fullName>
        <field>Charge_Amount__c</field>
        <formula>Total__c -  Transaction_Total__c</formula>
        <name>Update Charge Amount</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Full Payment</fullName>
        <actions>
            <name>PaymentFull</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>Total__c = Transaction_Total__c</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Partial Payment</fullName>
        <actions>
            <name>PartialPayment</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>AND(Total__c &gt;  Transaction_Total__c, Transaction_Total__c &gt; 0)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Payment Status Recurring</fullName>
        <actions>
            <name>Set_Manual_Charge_to_True</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>ChargentOrder__c.Payment_Status__c</field>
            <operation>equals</operation>
            <value>Recurring</value>
        </criteriaItems>
        <description>This rule fires when the Chargent Payment Status field equals &quot;Recurring.&quot;  Use this rule to set any values that you want defined every time the value in the Payment Status field is recurring.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Update Charge Amount</fullName>
        <actions>
            <name>UpdateChargeAmount</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>ChargentOrder__c.Manual_Charge__c</field>
            <operation>equals</operation>
            <value>False</value>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
