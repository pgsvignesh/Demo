({

	_aInstances : null,

	
	
	init: function(oComponent) {
		Date.SFParse = Date.SFParse || function(sDate, bTime){
			if (typeof(sDate) != 'string') {
				return Date.parse(sDate);
			}
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

		var oInstance = this._setInstance(oComponent);

		
		var aData = oComponent.get('v.events');
		if (aData != undefined && aData.length > 0) {
			oInstance._dDate = oComponent.get('v.monthDate');
			this.recalculateData(oComponent, aData);
		}
	},

	recalculateData : function(oComponent, aEvents){
		
		var oInstance = this._getInstance(oComponent),
			dReal = Date.SFParse(oInstance._dDate),
			//$A.localizationService.parseDateTime(oInstance._dDate),
			dNext,
			nRealMonth = dReal.getMonth(),
			nI = 0,
			nDay,
			nRealDay;
		oInstance._aDays.length = 0;
		dReal.setDate(1);
		dReal.setHours(0,0,0,0);
		dNext = new Date(dReal);
		dNext.setMonth(dNext.getMonth() + 1);
		dNext.setTime(dNext.getTime() - 1);
		//dNext.setDate(1);

		var dFirstWeekDay = new Date(dReal),
			dLastWeekDay = new Date();
		dFirstWeekDay.setDate(1 - dFirstWeekDay.getDay());
		
		dLastWeekDay.setTime(dFirstWeekDay.getTime());
		dLastWeekDay.setDate(dLastWeekDay.getDate() + 42);
		var dTemp,
			aRows = [],
			nJ = 0;
//		console.log('== month 2 ', dFirstWeekDay, ' - ', dLastWeekDay)	;
		for (var dTemp = new Date(dFirstWeekDay); dTemp < dLastWeekDay; dTemp.setDate(dTemp.getDate() + 1)) {
			var nWeek = parseInt(nJ / 7);
			nJ++;
			if (aRows[nWeek] == undefined) {
				aRows[nWeek] = [];
			}

			nRealDay = (dTemp < dReal ? (-1) : 1 ) * dTemp.getDate();
			nDay = (dTemp >= dNext ? 100  : 0) + nRealDay;
			oInstance._aDays[nDay] = {
				title : '' + dTemp.format('mmm d, yyyy'),
					//$A.localizationService.formatDate(dTemp),
				day : '' + (dTemp.getDate()),
				data : [],
				classNameText : (nDay < 0 || nDay >= 100),
                classNameSelected : false,
				dayTemp : nDay,
				dt : dTemp.getTime(),
				dD : new Date(dTemp),
				'id' : 'day_' + dTemp.getTime()
			}
			aRows[nWeek].push(oInstance._aDays[nDay]);
		}

		var tReal = dReal.getTime(),
			tNext = dNext.getTime();
		for (var nI = 0; nI < aEvents.length; nI++) {
			
			var aEvt = aEvents[nI],
				dMin = new Date(tReal < aEvt.startDateTT ? aEvt.startDateTT : tReal),
				dMax = new Date(tNext < aEvt.endDateTT ? tNext : aEvt.endDateTT);
			
			for (var dTemp = new Date(dMin); dTemp <= dMax; dTemp.setDate(dTemp.getDate() + 1)) {
				nDay = dTemp.getDate();
				oInstance._aDays[nDay].data.push(aEvt);
			}
		}
		oInstance._aDays.map(function(aDay){
			if (aDay.data.length < 1) {
				return;
			}
			aDay.classNameSelected = true;
            //' slds-is-selected' ;
			for (var nJ = 0; nJ < aDay.data.length; nJ++) {
				aDay.title += "\n" + aDay.data[nJ].title + ' (' + aDay.data[nJ].start + ' - ' +  aDay.data[nJ].end + ')';
			}
		});
		oInstance._aMonthData[dReal.getTime()] = aRows;
		oInstance._oComponent.set('v._calculatedWeeks', aRows);
		
//		return aDays; 
	},

	setMonthDate : function(oComponent,  dDate) {
		var oInstance = this._getInstance(oComponent);
		oInstance._dDate = dDate;
		
		var dReal = new Date(dDate);
		dReal.setDate(1);
		dReal.setHours(0,0,0,0);
		var aRows = oInstance._aMonthData[dReal.getTime()];
		if (aRows != undefined) {
			oInstance._oComponent.set('v._calculatedWeeks', aRows);
		}
		//console.log('change date ' + oInstance._dDate);
	},

	selectDate : function(oComponent, nDay){
		var oInstance = this._getInstance(oComponent);
		if (oInstance._sMonthCalendar == 'calendar') {
			console.log(oInstance._dDate);
			var dReal = Date.SFParse(oInstance._dDate);
			dReal.setDate(nDay);
			var oEvent = oComponent.getEvent("evtChangeDate");
			oEvent.setParams({'date' : '' + dReal.getFullYear() + '-' + (1 + dReal.getMonth()) + '-' + dReal.getDate(), 'scroll' : true});
			oEvent.fire();
		} else {

			if (oInstance._aDays[nDay] == undefined || oInstance._aDays[nDay].data.length < 1) {
				oInstance._oComponent.set('v._calculatedDayEvents', []);
				return;
			}
			oInstance._oComponent.set('v._calculatedDayEvents', oInstance._aDays[nDay].data);
		}
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

		var oInst = {
			_oComponent : oComponent,
			_dDate : null,
			_aMonthData : {},
			_aDays : [],
			_aCurrentDays : null,
			_sMonthCalendar : oComponent.get('v.monthCalendar'),
		};
		

		this._aInstances[sId] = oInst;
		return oInst;
	}

	
})