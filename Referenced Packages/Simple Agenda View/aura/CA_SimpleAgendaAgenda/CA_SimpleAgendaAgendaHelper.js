({

	_aInstances : null,
	_nTimer : null,
	_nStartScrollPos : null,
	
	init: function(oComponent) {
		this._initDateFunctions();

		var oInstance = this._setInstance(oComponent);
		//console.log(oComponent.isValid(), oComponent, oInstance);
		var aData = oComponent.get('v.events');
		//this._oDomBody = ;
		
		if (aData != undefined && aData.length > 0) {
			oInstance._dDate = Date.SFParse(oComponent.get('v.monthDate'));
			//$A.localizationService.parseDateTime(oComponent.get('v.monthDate'));
			console.log('--- start ' + oInstance._dDate);
			oInstance._dMonth.setTime(oInstance._dDate.getTime());
			oInstance._dMonth.setHours(0,0,0,0);oInstance._dMonth.setDate(1);			
			oInstance._dMin = (oInstance._dMin == null || oInstance._dMin > oInstance._dDate) ? new Date(oInstance._dDate) : oInstance._dMin;
			oInstance._dMax = (oInstance._dMax == null || oInstance._dMax < oInstance._dDate) ? new Date(oInstance._dDate) : oInstance._dMax;
			this.recalculateData(aData);
		}
	},

	recalculateData : function(oComponent, aEvents){
		var oInstance = this._getInstance(oComponent),
			aDays = [],
			dReal = new Date(oInstance._dDate),
			dNext = new Date(dReal),
			nRealMonth = dReal.getMonth(),
			nI = 0,
			nRealTT, nNextTT;
		
		
		oInstance._calculatedPosition = null;
		dReal.setDate(1);
		dNext.setMonth(dNext.getMonth() + 1);
		dNext.setDate(1);
		dNext.setTime(dNext.getTime() - 1);
		nRealTT = dReal.getTime();
		nNextTT = dNext.getTime();
		for (var nI = 0; nI < aEvents.length; nI++) {
			
			var aEvt = aEvents[nI],
				dMin = new Date(nRealTT < aEvt.startDateTT ? aEvt.startDateTT : nRealTT),
				dMax = new Date(dNext < aEvt.endDateTT ? dNext : aEvt.endDateTT);
			
			for (var dTemp = new Date(dMin); dTemp <= dMax; dTemp.setDate(dTemp.getDate() + 1)) {
				var nDay = dTemp.getDate();
				
				if (aDays[nDay] == undefined){
					aDays[nDay] = {
						title : '' + dTemp.format('mmm d, yyyy'),
						//$A.localizationService.formatDate(dTemp),
//						dTemp.getFullYear() + '/' + (dTemp.getMonth() + 1) + '/' + dTemp.getDate(),
						data : [],
						dt : dTemp.getTime(),
						'date' : new Date(dTemp),
						'id' : 'day_' + dTemp.getTime()
					}
				}
				aDays[nDay].data.push(aEvt);
			}
		}
		aDays = aDays.filter(function(mEl){return mEl != undefined; });
		this._setMonthData(oInstance, dReal, aDays)
//		return aDays; 
	},
    checkNoScroll : function(oComponent) {
        var oInstance = this._getInstance(oComponent);
        return oInstance._bNoScroll === true;
    },
	_setMonthData : function(oInstance, dMonth,  aData){
		var nFound = -1, 
			tMonth = dMonth.getTime();
//		console.log(oInstance._aMonthData);
		for (var nM = 0; nM < oInstance._aMonthData.length; nM++){
			if (oInstance._aMonthData[nM].dt == tMonth) {
				nFound = nM;
				break;
			} else if (oInstance._aMonthData[nM].dt > tMonth) {
				break;
			}
		}
		//var sMonthTitle = $A.localizationService.formatDateTime(dMonth, 'MMM yyyy');
		var sMonthTitle = dMonth.format('mmm yyyy');
		if (nFound  >= 0) {
			oInstance._aMonthData[nFound].data = aData;
		} else if (nM >= oInstance._aMonthData.length) {
			oInstance._aMonthData.push({data : aData, month : sMonthTitle, dt : tMonth, 'id' : 'month_' + tMonth, 'monthTitle' : sMonthTitle});
		} else {
			oInstance._aMonthData.splice(nM, 0, {data : aData, month : sMonthTitle, dt : tMonth, 'id' : 'month_' + tMonth, 'monthTitle' : sMonthTitle});
		}

		oInstance._oComponent.set('v._calculatedMonths', oInstance._aMonthData);

		this.setScrolling(oInstance._oComponent, false);
	},

	setMonthDate : function(oComponent, dDate) {
 		var oInstance = this._getInstance(oComponent),
 			dCur = oInstance._dDate;

		oInstance._dDate = Date.SFParse(dDate);
		//$A.localizationService.parseDateTime(dDate);
		console.log('--- start 2  ' + oInstance._dDate);
		oInstance._dMonth.setTime(oInstance._dDate.getTime());
		oInstance._dMonth.setHours(0,0,0,0);oInstance._dMonth.setDate(1);
		oInstance._dMin = (oInstance._dMin == null || oInstance._dMin > oInstance._dDate) ? new Date(oInstance._dDate) : oInstance._dMin;
		oInstance._dMax = (oInstance._dMax == null || oInstance._dMax < oInstance._dDate) ? new Date(oInstance._dDate) : oInstance._dMax;

		if (dCur != undefined && oInstance._dDate != undefined 
			&& oInstance._dDate.getTime() != dCur.getTime()
		) {
//			console.log('change month');
			this.setScrolling(oInstance._oComponent, false);
		}
		//console.log('setMonthDate 1');
	},

	setScrolling : function(oComponent, bStart){
//		console.log('setScrolling 1');
		var oInstance = this._getInstance(oComponent),
			self = this;
		if (oInstance._nTimer != null) {
			clearTimeout(oInstance._nTimer);
		}

		if (bStart != true) {

			oInstance._nTimer = setTimeout(
				$A.getCallback(
					function(){
						if (oComponent.isValid()) {
							self.setScrolling(oComponent, true);
						}
					}
				), 
				200
			);
			return;
		}
		if (oInstance._oDomBody == null) {
			oInstance._oDomBody = oComponent.getElement();
			if (oInstance._oDomBody == null) {
				return;
			}
		}
		if (oInstance._dDate == null 
            || oInstance._oComponent == null 
            || oInstance._aMonthData == null
			|| oInstance._bNoScroll 
		) {
            if (oInstance._bNoScroll) {
                oInstance._bNoScroll = false;
            }
			return;
		}
		var dDate = new Date(oInstance._dDate),
			aDivs = oInstance._calculatedPosition == null ? self._calculatePositions(oInstance._oDomBody, oInstance) : oInstance._calculatedPosition;

		var tDT = dDate.getTime();
		dDate.setHours(0,0,0,0);dDate.setDate(1);
		var tMT = dDate.getTime(),
			oMonthDiv,
			oDayDiv,
			oDiv,
			tNow;
		
		for(var nI = 0; nI < aDivs.length; nI++){
			oDiv =  aDivs[nI];
			if (tDT <= oDiv.dt) {
				oMonthDiv = oDiv.div;
				break;
			}
		}
		console.log('found' , oMonthDiv);
		if (oMonthDiv == undefined) { // || !(aDivs = oMonthDiv.childNodes) || aDivs.length < 1) {
			return;
		}
		/*
		for(var nI = 0; nI < aDivs.length; nI++){
			oDiv =  aDivs[nI];
			if (oDiv == null || oDiv.nodeType != 1 || !oDiv.dataset.dt == undefined ) { // hasAttribute('data-dt')
				continue;
			}
			tNow = parseInt(oDiv.getAttribute('data-dt'));
			if (tDT <= tNow) {
				oDayDiv = oDiv;
				break;
			}
		}*/
		var dRealDiv = oDayDiv || oMonthDiv,
			nTop = dRealDiv == undefined ? 0 : dRealDiv.offsetTop;
        oInstance._bNoScroll = true;
		oInstance._oDomBody.scrollTop = nTop;
		setTimeout(
			$A.getCallback(
				function(){
                    oInstance._bNoScroll = false;
				}
			),
			50);
		
	},



	startScrolling : function(oComponent, oEvent) {
//		return;
		var self = this;
		if (self._nTimer != null) {
			clearTimeout(self._nTimer);
		}
		self._nTimer = setTimeout(
			$A.getCallback(
				function(){
					if (oComponent.isValid()) {
						self._nTimer = null;
						self._checkScrolling(oComponent, oEvent);
					}
				}
			), 
			100);
	},

	_checkScrolling : function(oComponent, oEvent) {
		var self = this,
			oInstance = this._getInstance(oComponent),
			oScrollingDiv = oEvent.target,
			nTop = oScrollingDiv.scrollTop,
			//aChilds = oScrollingDiv.childNodes,
			aFound,
			nAddPosition = self._nStartScrollPos > nTop ? 0 : oScrollingDiv.offsetHeight - 10;
		self._nStartScrollPos = nTop;
        if (oInstance._skipScrolling ===  true || oInstance._bNoScroll) {
			return;
		}
		if (oInstance._calculatedPosition == null) {
			self._calculatePositions(oScrollingDiv, oInstance);
		}
		var aPositions = oInstance._calculatedPosition;
		if (aPositions == null) {
			return;
		}

		for (var nI = 0; nI < aPositions.length; nI++) {
			if (aPositions[nI].top > nTop + nAddPosition) {
				break;
			}
			aFound = aPositions[nI];
		}
		if (aFound == undefined) {
			aFound = aPositions[0];
		}
		if (aFound == undefined) {
			return;
		}
		//console.log(nI, aPositions[nI].top, aFound.dt);
		if (oInstance._dMonth.getTime() != aFound.dt) {

			var dDT = new Date();
			dDT.setTime(parseInt(aFound.dt));
//			console.log('new  date ' + dDT);
			oInstance._bNoScroll = true;
			//dSource.setMonth(dSource.getMonth() + (nWhere > 0 ? 1 : -1));
			var oEvent = oComponent.getEvent("evtChangeDate");
			oEvent.setParams({'date' : '' + dDT.getFullYear() + '-' + (1 + dDT.getMonth()) + '-' + dDT.getDate()});
			oEvent.fire();

//			self.changeDate(oComponent, dDT, true);
		}
//		console.log(aFound, nTop, nAddPosition,  ' date ' + oInstance._dDate.getTime());
	},

	_calculatePositions : function(oDiv, oInstance){
		var aChilds = oInstance._oComponent.find('days'),
			//oChild = oInstance._oComponent.getElement().firstChild,
		//find('days'),
			///oDiv.children,
			aResult = [];
		if (aChilds == undefined || aChilds == null) {
			return aResult;
		}
		console.log('== aChilds ', aChilds);
		for (var nI = 0; nI < aChilds.length; nI++) {
			var oChild = aChilds[nI].getElement();//;
			if (oChild == null || oChild.dataset == undefined || oChild.dataset.dt == undefined) {
				continue;
			}
			aResult.push({
				dt  : parseInt(oChild.dataset.dt),
				div : oChild,
				top : oChild.offsetTop
			});
		} 
		//while ((oChild = oChild.nextSibling) != null)

		oInstance._calculatedPosition = aResult;
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
		var oInst = {
			_oComponent : oComponent,
			_dDate : null,
			_dMonth : new Date(),
			_aMonthData : [],
			_oDomBody : oComponent.getElement(),
			_nTimer : null,
			_calculatedPosition : null,
			_dMin : null,
			_dMax : null,
            _bNoScroll : false

		};
		

		this._aInstances[sId] = oInst;
		return oInst;
	},

	beforeAfter : function(oComponent, nWhere){
		var oEvent = oComponent.getEvent("evtChangeDate"),
			oInstance = this._getInstance(oComponent),
			dSource = nWhere > 0 ? oInstance._dMax : oInstance._dMin;
		dSource.setMonth(dSource.getMonth() + (nWhere > 0 ? 1 : -1));
		oEvent.setParams({'date' : '' + dSource.getFullYear() + '-' + (1 + dSource.getMonth()) + '-' + dSource.getDate()});
		oEvent.fire();

/*		var oEvent2 = oComponent.getEvent("evtOpenDetails");
		//oEvent.setParams({'element' : oParent});
		oEvent2.fire();*/
	},

	openDetails : function(oComponent, evt){
		var oEl = evt.getParam('element'),
			oInstance = this._getInstance(oComponent),
			nTop = oEl.offsetTop - oInstance._oDomBody.scrollTop,
			nHeight = oEl.offsetHeight,
			nMax = oInstance._oDomBody.offsetHeight,
			nDiff = nTop + nHeight - nMax;
//		console.log(oEl.offsetTop, oEl.parentNode.offsetTop);
		if (nDiff > 0) {
            oInstance._bNoScroll = true;
			oInstance._oDomBody.scrollTop = oInstance._oDomBody.scrollTop + nDiff;
            oInstance._bNoScroll = false;
/*					setTimeout(function(){
		}, 50);*/

		}
		//console.log(nTop, nHeight, nMax, nDiff);
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
})