({
	_aInstances : null,


	init : function(oComponent){
		this._initDateFunctions();
		var oInstance = this._setInstance(oComponent);
		//console.log('helper ', this._sRecordId, this, oComponent.getGlobalId());
		

		var sDate = oComponent.get('v.simpleDate');
		if (sDate == undefined || sDate == '')  {
			oComponent.set('v._dateTitle', oInstance._dDate.format('mmmm yyyy'));
				//$A.localizationService.formatDateTime(oInstance._dDate, 'MMMM yyyy'));
			oComponent.set('v.simpleDate', oInstance._dDate.format('yyyy-MM-dd'));
				//$A.localizationService.formatDateTime(oInstance._dDate, 'yyyy-MM-DD'));
		}
		
		

		this._getObjectStructure(oComponent);
		
	},

	_checkSettings : function(oComponent){
		var oInstance = this._getInstance(oComponent),
			aFields ,
			sText = '';

		if (oInstance._aStructure.fields[oInstance._sStartField] == undefined) {
			sText = 'Please select Start field: ';
			aFields = this._getFieldsSetupList(oInstance, ['DATE', 'DATETIME']);
//			 + this._getFieldsSetupList();
		} else if (oInstance._aStructure.fields[oInstance._sEndField]  == undefined) {
			sText = 'Please select End field';
			aFields = this._getFieldsSetupList(oInstance, ['DATE', 'DATETIME']);
		} else if (oInstance._aStructure.fields[oInstance._sTitleField]  == undefined) {
			sText = 'Please select Title field';
			aFields = this._getFieldsSetupList(oInstance, [
				'TEXT', 'STRING', 'URL', 'PHONE', 
                'EMAIL', 'REFERENCE', 'DATE', 'DATETIME', 
                'PICKLIST', 'MULTIPICKLIST', 'COMBOBOX']
            );
		} else if (oInstance._sRecordId != '' 
			&& oInstance._sRecordId != null
			&& oInstance._sRecordId != undefined
			&& oInstance._sReferenceKeyField != ''
			&& oInstance._aStructure.fields[oInstance._sReferenceKeyField] == undefined
		){
			var sKey = oInstance._sRecordId.substring(0, 3);
			sText = 'Please select Reference Key Field';
			aFields = this._getFieldsSetupList(oInstance, ['REFERENCE'], sKey);
		}


		if (sText != '') {
			//alert(sText);
			aFields = aFields.concat(this._getFieldSetsSetupList(oInstance));
//            aFields = aFields.concat(this._getListViewsSetupList());

//			oInstance._oComponent.set('v._setupMessage', sText);
			oInstance._oComponent.set('v._setupMessage', 'Some required component properties are not set (' + sText + ')');
			
			oInstance._oComponent.set('v._setupFields', aFields);


			return false;
		}

		return true;
	},

	_filterFields : function(oInstance, aFilter) {
		var aResult = [];
		for (var sFld in oInstance._aStructure.fields) {
			for (var sFilter in aFilter) {
				if (typeof(oInstance._aStructure.fields[sFld][sFilter]) == 'undefined'){
					continue;
				}
				var mFilter = aFilter[sFilter];
				if ((typeof(aFilter[sFilter]) == 'string' && oInstance._aStructure.fields[sFld][sFilter] == mFilter)
					|| (mFilter.indexOf(oInstance._aStructure.fields[sFld][sFilter]) >= 0)
				) {
					aResult.push(oInstance._aStructure.fields[sFld])
				}
			}
		}
		return aResult;
	},

	_getFieldsSetupList : function(oInstance, aTypes, sKey) {
		var aFields = this._filterFields(oInstance, {type : aTypes}),
			aResult = [];
//			console.log('1');
		if (aFields.length > 0) {
			for (var nJ = 0; nJ < aFields.length; nJ++) {
//				console.log(aFields[nJ].objs);
				if (sKey != undefined && sKey != '' && (aFields[nJ].objs == undefined || aFields[nJ].objs.indexOf(sKey) < 0)) {
					continue;
				}
				aResult.push(aFields[nJ]);
			}
		}
		return aResult;
	},

	_getFieldSetsSetupList : function(oInstance){
		var aFS  = oInstance._aStructure.fieldSets != undefined ? oInstance._aStructure.fieldSets : [],
			aResult = [];
		for (var sFS in oInstance._aStructure.fieldSets) {
			aResult.push({
				'name' : oInstance._aStructure.fieldSets[sFS].name.toLowerCase(),
				'label' : 'FieldSet ' + oInstance._aStructure.fieldSets[sFS].label
			});
		}
		return aResult;	
	},

	_getInstance : function(oComponent) {
		var sId = oComponent.getGlobalId(),
		 	oInst = this._aInstances[sId];
	 	if (oInst == undefined) {
	 		this._aInstances[sId] = {};
	 		return this._aInstances[sId]
	 	}
	 	return oInst;
	},

	_setInstance : function(oComponent) {
		var sId = oComponent.getGlobalId();
		if (this._aInstances == null) {
			this._aInstances = {};
		}
		var oInst = {};
		oInst._sObjectName = oComponent.get('v.simpleObject') != null ? oComponent.get('v.simpleObject').toLowerCase() : null;
		oInst._sTitleField = oComponent.get('v.simpleTitle') != null ? oComponent.get('v.simpleTitle').toLowerCase() : null;
		oInst._sStartField = oComponent.get('v.simpleStart') != null ? oComponent.get('v.simpleStart').toLowerCase() : null;
		oInst._sEndField = oComponent.get('v.simpleStop') != null ? oComponent.get('v.simpleStop').toLowerCase() : null;
		oInst._sReferenceKeyField = oComponent.get('v.simpleReferenceKey') != null 
			? oComponent.get('v.simpleReferenceKey').toLowerCase() 
			: null;
		oInst._aFields = [];
		oInst._sFields = oInst._aFields.length > 0 ? oInst._aFields.join(',') : '';
		oInst._sFieldSet = oComponent.get('v.simpleFieldSet') != null ? oComponent.get('v.simpleFieldSet').toLowerCase() : null;
		oInst._sListView = oComponent.get('v.simpleListView');
		oInst._sRecordId = oComponent.get('v.recordId');
		oInst._oRecord = oComponent.get('v.record');
		oInst._aCache = {};
		oInst._nCacheTime = 100000;
		oInst._oComponent = oComponent;
//		oInst._calculatedPosition = null;

		var sDate = oComponent.get('v.simpleDate');
		oInst._dDate = sDate != '' && sDate != undefined 
			? Date.SFParse(sDate)
			//$A.localizationService.parseDateTime(sDate) 
			: new Date();

		/*if (oInstance._dDate == undefined || this._dDate == null) {
			oInstance._dDate = new Date();
		}*/
		oInst._oDiv = oComponent.find('CA_Simple');
		oInst.oDate = oComponent.find('curDate');

		this._aInstances[sId] = oInst;
		return oInst;
	},
    
    /*_getListViewsSetupList : function(){
        var aFS  = this._aStructure.listViews != undefined ? this._aStructure.listViews : [],
			aResult = [];
		for (var sFS in this._aStructure.listViews) {
			aResult.push({
				'name' : this._aStructure.listViews[sFS].name.toLowerCase(),
				'label' : 'List View ' + this._aStructure.listViews[sFS].label
			});
		}
		return aResult;	
    },*/


	changeDate: function(oComponent, sDate) {
		var bRefresh = true,
			oInstance = this._getInstance(oComponent),
			tNow = (new Date()).getTime();
		switch (sDate) {
			case '+1' :
			case '-1' :
				var nMonth = oInstance._dDate.getMonth();
				oInstance._dDate.setMonth(nMonth + parseInt(sDate));
				if (nMonth == oInstance._dDate.getMonth()) {
					oInstance._dDate.setDate(oInstance._dDate.getDate() + parseInt(sDate));
				}

				break;
			default :
//				console.log(sDate);
				if (sDate == undefined) {
					return;
				}
//				console.log(typeof(sDate));
				var dParse = typeof(sDate) == 'object' 
					? new Date(sDate) 
					: Date.SFParse(sDate);
					//$A.localizationService.parseDateTime(sDate);
				bRefresh = oInstance._dDate.getMonth() != dParse.getMonth() || oInstance._dDate.getFullYear() != dParse.getFullYear();
				oInstance._dDate.setTime(dParse.getTime());

				break;
		}
		var dPeriod = new Date(oInstance._dDate);
		dPeriod.setHours(0,0,0,0);dPeriod.setDate(1);
		var nPeriod = dPeriod.getTime();


		
		
		if (bRefresh && 
			(
				oInstance._aCache[nPeriod] == undefined 
				|| oInstance._aCache[nPeriod].dt + oInstance._nCacheTime < tNow
			)
		) {
			this._refresh(oComponent);
		} else {
			oComponent.set('v.simpleDate', oInstance._dDate.format('yyyy-MM-dd'));
			oComponent.set('v._dateTitle', oInstance._dDate.format('mmmm yyyy'));
//			oComponent.set('v.simpleDate', $A.localizationService.formatDateTime(oInstance._dDate, 'yyyy-MM-DD'));
//			oComponent.set('v._dateTitle', $A.localizationService.formatDateTime(oInstance._dDate, 'MMMM yyyy'));
			//console.log('x ' + oInstance._dDate);
//			oInstance._oComponent.set('v._events', oInstance._aCache[nPeriod].data);
			//console.log('==' + this._dDate);
		}
		

	},

	reload : function(oComponent) {
		var oInstance = this._getInstance(oComponent);
//			dPeriod = new Date(oInstance._dDate);
		oInstance._aCache = {};
		this._refresh(oComponent);
		//this.changeDate(oComponent, oInstance._dDate);
//		dPeriod.setHours(0,0,0,0);dPeriod.setDate(1);
//		var nPeriod = dPeriod.getTime();


	},
/*	refreshEvent : function(){
		this._refresh();
	},*/
	_refresh : function(oComponent){

		var oInstance = this._getInstance(oComponent);
		if (!oInstance._bOKMode) {
			return;
		}
		//console.log('-- ' + oInstance._dDate);
		var dStart = new Date(oInstance._dDate),
			dEnd = new Date(oInstance._dDate),
			self = this;
		dStart.setDate(1);
		dStart.setHours(0,0,0,0);
		dEnd.setTime(dStart.getTime());
		dEnd.setMonth(dEnd.getMonth() + 1);
		
		dEnd.setTime(dEnd.getTime() - 1);
		
		this._request(
			oComponent, 
			{
			'event' : 'getData',
			'title' : oInstance._sTitleField,
			'start' : dStart.toISOString(),
			'end' : dEnd.toISOString(),
			'filter' : '',
			'object' : oInstance._sObjectName,
			'startField' : oInstance._sStartField,
			'endField' : oInstance._sEndField,
			'fields' : oInstance._sFields,
			'listView' : oInstance._sListView,
			'recordId' : oInstance._sRecordId,
			'keyField' : oInstance._sReferenceKeyField != 'NONE' && oInstance._sReferenceKeyField != '' ? oInstance._sReferenceKeyField : ''
		}, function(data){
//			console.log('== data ', data);
			var aEvents = JSON.parse(data.events);
			self._parseEvents(oInstance, aEvents);
//			console.table(aEvents);
			oInstance._aCache[dStart.getTime()] = {dt : (new Date()).getTime(), data : aEvents};
//			oInstance._calculatedPosition = null;
			var sDate = '' + oInstance._dDate.getFullYear() + '-' + (1 + oInstance._dDate.getMonth()) + '-' + oInstance._dDate.getDate();
			oInstance._oComponent.set('v.simpleDate', sDate);
			//$A.localizationService.formatDateTime(oInstance._dDate, 'yyyy-MM-DD')
			oInstance._oComponent.set('v._events', aEvents);
//			oInstance._oComponent.set('v._dateTitle', $A.localizationService.formatDateTime(oInstance._dDate, 'MMMM yyyy'));
			oInstance._oComponent.set('v._dateTitle', oInstance._dDate.format('mmmm yyyy'));

			//console.log('change skip to false');
		});
	},

	_getObjectStructure : function(oComponent){

		var self = this,
			oInstance = this._getInstance(oComponent);
			
		this._request(oComponent,
			{
				'event' 	: 'getStructure',
				'object' 	: oInstance._sObjectName,
				'fieldset' 	: oInstance._sFieldSet,
				'fields'    : oInstance._sFields
			}, 
			function(data){
				var oDivEl = oInstance._oComponent.getElement(),
					oHeader = oInstance._oComponent.find("ca_header");
		        if (oHeader != undefined && oHeader != null) {
		        	var nW = oHeader.getElement().clientWidth;
		        	if (nW < 700) {
		        		$A.util.addClass(oDivEl, '_CA_Compact_Layout');
		        	}
		        }
				if (oInstance._oComponent.get('v.simpleHeight') > 0) {
					if (oDivEl != undefined) {
						oDivEl.style.minHeight = '' + oInstance._oComponent.get('v.simpleHeight') + 'px';
					}
				} else {
					$A.util.addClass(oDivEl, '_max');
				}

//				console.log( + ' / ' + (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 ? 'TRUE' : 'FALSE'));
				var sUA = navigator.userAgent.toLowerCase(),
					oBrowser = $A.get("$Browser"),
					bSticky = oBrowser.isFIREFOX || (sUA.indexOf('safari') >= 0 && sUA.indexOf('chrome') < 0);
						//|| oBrowser.isIPhone || oBrowser.isIOS || oBrowser.isIPad 
				if (bSticky) {
					$A.util.addClass(oDivEl, '_CA_Sticky');
				}


				oInstance._aStructure = data;
				oInstance._aStructure.fields = JSON.parse(data.fields);

	//			console.log(self._aStructure.fields);
				/*self._aStructure.fields.map(function(aFld){
					aFld.label.replace(/Opportunity\/Account\sID/gi, "Related To")
	                    .replace(/Contact\/Lead\sID/gi, "Name")
	                    .replace('Created By ID', "Created By")
	                    .replace('Assigned To ID', "Assigned To");
				});*/
	            oInstance._sSession = data.sessionId || '';
				oInstance._aStructure.fieldSets = (data.fieldSets !=null && data.fieldSets != '') ? JSON.parse(data.fieldSets) : {};
				
				if (data.fieldSet != undefined && data.fieldSet != '') {
					oInstance._sFields = data.fieldSet;
					oInstance._aFields = data.fieldSet.split(',');
				}

				if (!self._checkSettings(oComponent)) {
					oInstance._bOKMode = false;
					oInstance._oComponent.set('v.displayMode', 'setup'); 
					return;
				}
				oInstance._bOKMode = true;
				self._refresh(oComponent);
			}
		);

        /*this._request(oComponent, 
        	{
				'event' 	: 'rest',
            	'data' 		: '{}',
				'url' 		: document.location.origin + '/services/data/v35.0/sobjects/' + oInstance._sObjectName + '/listviews'
//            'url' 		: 'https://gs0.salesforce.com/services/data/v35.0/sobjects/' + oInstance._sObjectName + '/listviews'
            
        	}, function(data){
            	console.log(data);
        	}
    	);*/
	},

	_request : function(oComponent, aParams, fFunc){
		var oAction = oComponent.get("c.CA_Remote"),
            aResult = {};
        
        
		oAction.setParams({'sIncomeParams' : JSON.stringify(aParams)});
		oAction.setCallback(oComponent, function(oResponse) {
            var sState = oResponse.getState();
            if (sState === "SUCCESS") {
                
                try {
                    aResult = JSON.parse(oResponse.getReturnValue());
                } catch (e){
//                    console.log(oResponse.getReturnValue(), e);
                    
                }
            	
                fFunc(aResult);
            } else if (sState === "ERROR") {
                var aErrors = oResponse.getError();
                if (aErrors) {
                    if (aErrors[0] && aErrors[0].message) {
                    	console.log('Lighthning error: ' + aErrors[0].message);
                    }
                } else {
                	console.log('Lighthning error');
                }
            }
        });
        $A.enqueueAction(oAction);
//            this.queue.run(function(){});
	},

	_parseEvents : function(oInstance, aList) {
		for (var nI = 0; nI < aList.length; nI++) {
			var oEvent = aList[nI], 
				aFieldsValues,
				mFieldValue;

//console.log('== agenda ', oEvent.start, ' - ', oEvent.end);
//console.log($A);
			oEvent.startDate = Date.SFParse(oEvent.start, true);
			oEvent.startDateTT = oEvent.startDate.getTime();
			//$A.localizationService.parseDateTime(oEvent.start);
			oEvent.endDate = Date.SFParse(oEvent.end, true);
			oEvent.endDateTT = oEvent.endDate.getTime();
			//$A.localizationService.parseDateTime(oEvent.end);
//			oEvent.start =  $A.localizationService.formatDateTime(oEvent.startDate, oEvent.isalldayevent !== 'true' ? 'MMM d, yyyy h:mm a' : 'MMM d, yyyy');
//			oEvent.end = $A.localizationService.formatDateTime(oEvent.endDate, oEvent.isalldayevent !== 'true' ? 'MMM d, yyyy h:mm a' : 'MMM d, yyyy');

			oEvent.start =  oEvent.startDate.format(oEvent.isalldayevent !== 'true' ? 'mmm d, yyyy h:ii a' : 'mmm d, yyyy');
			oEvent.end = oEvent.endDate.format(oEvent.isalldayevent !== 'true' ? 'mmm d, yyyy h:ii a' : 'mmm d, yyyy');
			oEvent.startTime =  oEvent.isalldayevent !== 'true' ? oEvent.startDate.format('h:ii a') : '';

//			oEvent.startTime =  oEvent.isalldayevent !== 'true' ? $A.localizationService.formatDateTime(oEvent.startDate, 'h:mm a') : '';

			//$A.localizationService.formatDateTime(oEvent.startDate, oEvent.isalldayevent !== 'true' ? 'MMM d, yyyy h:mm a' : 'MMM d, yyyy');

			aFieldsValues = [];
			for (var nJ = 0; nJ < oInstance._aFields.length; nJ++) {
				
				var aField = this._getField(oInstance, oInstance._aFields[nJ]);
				//if (aField == null || oEvent[oInstance._aFields[nJ]] == undefined) {
				if (aField == null ) {
					continue;
				}
				var aFieldData = {"label" : aField.label};
				if (oEvent[oInstance._aFields[nJ]] == undefined) {
					aFieldData.value = '';
				} else {
					mFieldValue = this._getFieldAsString(oInstance, aField, oEvent[oInstance._aFields[nJ]], oEvent);
					
					if (mFieldValue.link != undefined && mFieldValue.value != undefined) {
						aFieldData.value = mFieldValue.value;
						aFieldData.link = mFieldValue.link;
					} else {
						aFieldData.value = mFieldValue;
					}
				}
				aFieldsValues.push(aFieldData);
			}
			oEvent.fields = aFieldsValues;

		}
	},

	_getField : function(oInstance, sName) {
		return oInstance._aStructure.fields[sName] != undefined ? oInstance._aStructure.fields[sName] : null;
		
	},

	_getFieldAsString : function(oInstance, aField, mValue, oAllEvent) {
		var mResult;
		switch(aField.type) {
			case 'DATE':
				var dD = Date.SFParse(mValue);
				//$A.localizationService.parseDateTime(mValue);
				mResult = $A.localizationService.formatDate(dD);
				break;
			case 'DATETIME':
				var dD = Date.SFParse(mValue, true);
					//$A.localizationService.parseDateTime(mValue);
				mResult = $A.localizationService.formatDateTime(dD);
				break;
			case 'REFERENCE':
				if (oAllEvent[aField.name + '.name'] != undefined) {
					mResult = {'link' : mValue, 'value' : this._cutString(oAllEvent[aField.name + '.name'], 50)};
				} else {
					mResult = mValue;
				}
				break;
			default:
				mResult = this._cutString(mValue, 50);
		}
		return mResult;
	},

	_cutString : function(sStr, nLength) {
		nLength = nLength || 0;
		if (nLength < 1 || !sStr.length || sStr.length < nLength) {
			return sStr;
		}
		var nPos = sStr.indexOf(' ', nLength) || sStr.indexOf('.', nLength) || sStr.indexOf(',', nLength);
		if (nPos >= nLength){
			sStr = sStr.substring(0, nPos) + '...';
		}
		return sStr;



	},
	_initDateFunctions : function(){
		if (Date.prototype.format == undefined) {
		    Date.prototype.formatWhat = ['dd', 'd', 
		                'hh', 'h', 
		                'yyyy', 'yy' , 
		                '(:ii)', 'ii', 'ss', 'z', 
		                'aa', 'a',
		                'mmmm', 'mmm', 'MM', 'mm',
		                'eeee', 'eee' , 'w'
		                ];
		    Date.prototype.formatTo = ['Date', 'Date', 
		                'Hours', 'Hours', 
		                'FullYear', 'FullYear',  
		                'Minutes', 'Minutes', 'Seconds', 'TimezoneOffset', 
		                'Hours', 'Hours',
		                'Month', 'Month', 'Month', 'Month',
		                'Day', 'Day', 'Day',
		    ];
		    
		    Date.prototype.formatRegexp = ['[0-9]{2}', '[0-9]{1,2}', 
		                '[0-9]{2}', '[0-9]{1,2}', 
		                '[0-9]{4}', '[0-9]{2}' , 
		//                '[|\(\:0-9\)]{0,2}', '[0-9]{2}', '[0-9]{2}', 'z', 
		                '[\\:0-9]{0,3}', '[0-9]{2}', '[0-9]{2}', 'z', 
		                '(AM|PM)', '(a|p)',
		                '(January|February|March|April|May|June|July|August|September|October|November|December)', 
		                '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)', 
		                '[0-9]{2}', '[0-9]{1,2}',
		                '(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)', 
		                '(Sun|Mon|Tue|Wed|Thu|Fri|Sat)', 
		                '[0-7]{1}'
		                ];
		    
		    Date.prototype.formatText =  {
		            "week" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		            "weekShort" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		            "month" : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		            "monthShort" : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		    };
		    
		    Date.prototype.format = function(sFormat, bUtc) {
		        var nValue,
		            sResult = sFormat;
		        if (sResult === undefined || sResult == '')  {
		            return '';
		        }
		        for (var nI = 0; nI < Date.prototype.formatWhat.length; nI++) {
		            if (this['get' + (bUtc ? 'UTC' : '') + Date.prototype.formatTo[nI]] != undefined) {
		                nValue = this['get' + (bUtc ? 'UTC' : '') + Date.prototype.formatTo[nI]]();
		            } else {
		                nValue = '';
		            }
		            switch(Date.prototype.formatWhat[nI]) {
		                case 'eee' :
		                    nValue = Date.prototype.formatText.weekShort[nValue];
		                    break;
		                case 'eeee' :
		                    nValue = Date.prototype.formatText.week[nValue];
		                    break;
		                case 'mmm' :
		                    nValue = Date.prototype.formatText.monthShort[nValue];
		                    break;
		                case 'mmmm' :
		                    nValue = Date.prototype.formatText.month[nValue];
		                    break;
		                case 'h' :
		                    nValue = nValue % 12 == 0 ? 12 : nValue % 12;
		                    break;
		                case '(:ii)' :
		                    nValue = nValue > 0 ? ':' + ((nValue < 10 ? '0' : '') + nValue) : '';
		                    break;
		                case 'mm' :
		                    nValue++
		                    break;
		//                    nValue = (nValue < 10 ? '0' : '')  + nValue;
		                case 'MM' :
		                    nValue++;
		                case 'yy' :
		                    nValue = nValue % 100;
		                case 'dd' :
		                case 'hh' :
		                case 'ii' :
		                case 'ss' :
		                    nValue = (nValue < 10 ? '0' : '') + nValue;
		                    break;
		                case 'aa' :
		                    nValue = (nValue  >= 12) ? 'PM' : 'AM';
		                    break;
		                case 'a' :
		                    nValue = (nValue  >= 12)  ? 'p' : 'a';
		                    break;
		                    
		                    
		            }
		            sResult = sResult.replace(Date.prototype.formatWhat[nI], nValue);
		        }
		        return sResult;
		    }
		}

		Date.SFParse = Date.SFParse || function(sDate, bTime){
			
			if (bTime) {
				var aParts = sDate.trim().split(' '),
					aD = aParts[0].split("-"),
					aT = aParts.length > 1 ? aParts[1].split(":") : null;
				return aT != null 
					? new Date(aD[0], (aD[1] - 1), aD[2], aT[0], aT[1], aT[2]) 
					: new Date(aParts[0], (aParts[1] - 1), aParts[2]);
			} else {
				var aParts = sDate.split("-");
				return new Date(aParts[0], (aParts[1] - 1), aParts[2]);
			}
		}
	},

	create : function(component, event){
		var oEvt = $A.get("e.force:createRecord");
		
		if (oEvt) {
			var sId = event.getSource ? event.getSource().get('v.evt') : event.target['evt'],
				oInstance = this._getInstance(component),
				sObjName = oInstance._aStructure.api;
//			console.log('create ', sObjName);
			//sObjName = sObjName.charAt(0).toUpperCase() + sObjName.slice(1).toLowerCase();
			//console.log(sObjName);
			oEvt.setParams({
		        "entityApiName": sObjName
		    });
			oEvt.fire();
		} else {
			//$A.createComponent(''
		}		
	}
	
	

})