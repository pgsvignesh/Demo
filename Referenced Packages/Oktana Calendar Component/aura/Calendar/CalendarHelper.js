({
    getEventInMonth : function(component,month,year) {        
        var eventsInMonth = component.get("c.getActivitiesInMonth");
        month+=1;
        eventsInMonth.setParams({
            "month": ''+month,
            "year": ''+year
        });
        
        eventsInMonth.setCallback(this, function(response){
            var state = response.getState();
            component.set('v.isSpinnerGeneric', false); //Turn off the spinner
            if(state === "SUCCESS"){
                var activities = response.getReturnValue(); 
                component.set("v.activities",activities);
                var data= [];
                for(var day in activities){
                    for(var act in activities[day]){                           
                        data.push({
                            eventId: activities[day][act].id,
                            eventName: activities[day][act].name,
                            date: activities[day][act].startDate.slice(0,10),
                            day: day,
                            type: activities[day][act].type,
                            status: activities[day][act].status
                        });
                    }
                }               
               component.set("v.activities",data);                             
               var calendar = component.get("v.calendar");
                calendar.events = data;
                this.draw(component);
            }
            else if (state === "ERROR"){
                var errors = response.getError();
                if (errors) {
                    $A.logf("Errors", errors);
                    if (errors[0] && errors[0].message) {
                        $A.error("Error message: " + errors[0].message);
                    }
                } else {
                    $A.error("Unknown error");
                }
            };
        });        
        $A.enqueueAction(eventsInMonth);
    },
    getPrevMonth: function(component){
        var dt = component.get("v.current_date");
        var month = dt.getMonth()-1; // prev month
        var year = dt.getFullYear();
        component.set("v.current_date", new Date(year, month, 1));
        this.getEventInMonth(component,month,year);
        
        
    },loadCalendar : function(cmp, helper){
     	var dt    = new Date();      
        var month = dt.getMonth();    // current month          
        var year  = dt.getFullYear();
        var calendarDom = cmp.find('_okty_calendar').getElement();
        var header = cmp.find('calendar_title').getElement();
        var calendar = this.newCalendar(calendarDom,header,[]);
        cmp.set("v.calendar",calendar);     
        cmp.set('v.loadedScript', false);
        this.getEventInMonth(cmp,month,year,0);      
    },
    getPrevMonthRender: function(component) {
        var calendar = component.get("v.calendar");
        this.prevMonth(component);
    },
    getNextMonthRender: function(component) {
        var calendar = component.get("v.calendar");
        this.nextMonth(component);
      
    },
    getNextMonth: function(component){
        var dt = component.get("v.current_date");
        var month = dt.getMonth()+1; // next month
        var year = dt.getFullYear();
        component.set("v.current_date", new Date(year, month, 1));
        this.getEventInMonth(component,month,year);       
        
    },
    newCalendar : function(selector, header, events) {
        var calendar = {};
        calendar.el = selector;
        calendar.events = events;
        calendar.current = moment().date(1);
        calendar.title = header;
        calendar.dayOpen = '';
        return calendar;
    },
    drawHeader : function(component) {
        var calendar = component.get("v.calendar");
        calendar.title.innerHTML = calendar.current.format('MMMM').bold()+ ' ' + calendar.current.format('YYYY');
        component.set("v.calendar", calendar);
    },
    drawMonth : function(component) {
    var calendar = component.get("v.calendar");
    
    calendar.events.forEach(function(ev) {
      ev.date = moment(ev.date);
    });    
    if(calendar.month) {
      calendar.oldMonth = calendar.month;
      calendar.oldMonth.className = 'okty_calendar_month okty_calendar_out ' + (calendar.next ? 'okty_calendar_next' : 'okty_calendar_prev');
    
      calendar.oldMonth.parentNode.removeChild(calendar.oldMonth);
      calendar.month = this.createElement('div', 'okty_calendar_month');
      calendar.middle = this.createElement('div','okty_calendar_middle');
      this.backFill(component);
      this.currentMonth(component);
      this.fowardFill(component);
      calendar.month.appendChild(calendar.middle);
      calendar.el.appendChild(calendar.month);
      window.setTimeout(function() {
        calendar.month.className = 'okty_calendar_month okty_calendar_in ' + (calendar.next ? 'okty_calendar_next' : 'okty_calendar_prev');
      }, 16);
    } else {
        calendar.month = this.createElement('div', 'okty_calendar_month');
        calendar.middle = this.createElement('div','okty_calendar_middle');
        calendar.month.appendChild(calendar.middle);
        calendar.el.appendChild(calendar.month);
        this.backFill(component);
        this.currentMonth(component);
        this.fowardFill(component);
        calendar.month.className = 'okty_calendar_month okty_calendar_new';
    }
    component.set("v.calendar", calendar);
  },
    draw : function(component) {
    //Delete Details event if exist one open
    var calendar = component.get("v.calendar");
    var currentOpened = document.querySelector('.okty_calendar_details');
    if(currentOpened){
      currentOpened.parentNode.removeChild(currentOpened);
      currentOpened.className = 'okty_calendar_details okty_calendar_out';
    }
    //Create Header
    this.drawHeader(component);

    //Draw Month
    this.drawMonth(component);
  },
    backFill : function(component) {
    var calendar = component.get("v.calendar");
    var clone = calendar.current.clone();
    var dayOfWeek = clone.day();

    if(!dayOfWeek) { return; }

    clone.subtract('days', dayOfWeek+1);

    for(var i = dayOfWeek; i > 0 ; i--) {
      this.drawDay(clone.add('days', 1), component);
    }
    component.set("v.calendar", calendar);
  },
    fowardFill : function(component) {
    var calendar = component.get("v.calendar");
    var clone = calendar.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if(dayOfWeek === 6) { return; }

    for(var i = dayOfWeek; i < 6 ; i++) {
      this.drawDay(clone.add('days', 1), component);
    }
    component.set("v.calendar", calendar);
  },
    currentMonth : function(component) {
    var calendar = component.get("v.calendar");
    var clone = calendar.current.clone();

    while(clone.month() === calendar.current.month()) {
      this.drawDay(clone, component);
      clone.add('days', 1);
    }
    component.set("v.calendar", calendar);
  },
    getWeek : function(day, component) {
    var calendar = component.get("v.calendar");
    if(!calendar.week || day.day() === 0) {
      calendar.week = this.createElement('div', 'okty_calendar_week');
      calendar.middle.appendChild(calendar.week);
    }
    component.set("v.calendar", calendar);
  },
    drawDay : function(day, component) {
    var calendar = component.get("v.calendar");
    this.getWeek(day, component);
    
    //Outer Day
    var outer = this.createElement('div', this.getDayClass(day, component));
    var isFullContainer = false; // to draw at the bottom of the calendar container
    var options = {
        interval: 300
    };
    var hammerDay = new Hammer(outer, options);
    var ref = this;    
    hammerDay.on("tap", function(ev){
      ev.preventDefault();
      ref.openDay(outer, isFullContainer, component);                
    });
    var oneDay = this.createElement('div',this.isToday(day));
    //Day Name
    var name = this.createElement('div', 'okty_calendar_day-name', day.format('dd').charAt(0));

    //Day Number
    var number = this.createElement('div', 'okty_calendar_day-number', day.format('DD'));

    //Events
    var events = this.createElement('div', 'okty_calendar_day-events');
    this.drawEvents(day, events, component);

    outer.appendChild(events);
    outer.appendChild(oneDay);

    oneDay.appendChild(name);
    oneDay.appendChild(number);
    
    calendar.week.appendChild(outer);

    component.set("v.calendar", calendar);
  },
    drawEvents : function(day, element, component) {
    var calendar = component.get("v.calendar");
    if(day.month() ===  calendar.current.month()) {
      var todaysEvents = calendar.events.reduce(function(memo, ev) {
        if(ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
        return memo;
      }, []);

      if(todaysEvents.length > 0){
          //change style according to Event Status
          for(var i=0;i<todaysEvents.length;i++){
            if(todaysEvents[i].status==false){
              var evSpan = this.createElement('span','');
              element.appendChild(evSpan);
              return false;
            }
          }
          var evSpan = this.createElement('span','okty_calendar_all');
          element.appendChild(evSpan);
      }
    }
    component.set("v.calendar", calendar);
  },
    getDayClass : function(day, component) {
    var calendar = component.get("v.calendar");
    classes = ['okty_calendar_day'];
    if(day.month() !== calendar.current.month()) {
      classes.push('okty_calendar_other');
    }
    return classes.join(' ');
  },
    isToday : function(day){
    var today = moment();    
    classes = ['okty_calendar_day-one'];
    if (today.isSame(day, 'day')){
      classes.push('okty_calendar_today');
    }
    return classes.join(' ');
  },
    openDay : function(el, isFullContainer, component) {
    var calendar = component.get("v.calendar");
    calendar.currentEvents = [];
    var currentOpened = document.querySelector('.okty_calendar_day-one.okty_calendar_open.okty_calendar_today');
    if(currentOpened){
      currentOpened.className = 'okty_calendar_day-one okty_calendar_today';
    }else{
      currentOpened = document.querySelector('.okty_calendar_day-one.okty_calendar_open');
      if(currentOpened){
        currentOpened.className = 'okty_calendar_day-one';
      }
    }
    var dayOpen = el.querySelector('.okty_calendar_day-one');
    dayOpen.className= dayOpen.className + ' okty_calendar_open'; 

    currentOpened = document.querySelector('.okty_calendar_details');

    //Check to see if there is an open details box
    if(currentOpened) {
      currentOpened.parentNode.removeChild(currentOpened);
      currentOpened.className = 'okty_calendar_details okty_calendar_out';
    }
    this.drawDetails(el, isFullContainer, component);
    component.set("v.calendar", calendar);
  },

    drawDetails : function(el, isFullContainer, component){
    //Create the Details Container
    var calendar = component.get("v.calendar");
    var details = this.createElement('div');
    if(!isFullContainer)
      details.className = 'okty_calendar_details';
    else
      details.className = 'okty_calendar_details okty_calendar_full';
    
    //Header details
    var dayNumber = this.drawHeaderDetails(el,details,isFullContainer, component);
    
    //Body details
    var restEvents = this.drawBodyDetails(el, dayNumber,details,isFullContainer, component);
    
    //Footer details
    this.drawFooterDetails(el, details,restEvents,isFullContainer,component);
    
    if(!isFullContainer)
      setTimeout(function(){details.className ='okty_calendar_details okty_calendar_in';});
    else
      setTimeout(function(){details.className ='okty_calendar_details okty_calendar_full okty_calendar_in';});
      component.set("v.calendar", calendar);
  },
    drawHeaderDetails : function (el, details, isFullContainer, component){
    //Create the arrow
    var calendar = component.get("v.calendar");
    var containerHeader = this.createElement('div');
    var containerArrow = this.createElement('div'); 
    var arrow = this.createElement('div');
    var dayNumber = +el.querySelectorAll('.okty_calendar_day-number')[0].innerText || +el.querySelectorAll('.okty_calendar_day-number')[0].textContent;
    if(!isFullContainer){
      containerHeader.className = 'okty_calendar_details-header';
      containerArrow.className = 'okty_calendar_container-arrow';
      arrow.className = 'okty_calendar_arrow';
    }else{
      containerHeader.className = 'okty_calendar_details-full-header';
      containerArrow.className = 'okty_calendar_container-arrow';
      arrow.className = 'okty_calendar_arrow okty_calendar_full-arrow';
          
      var headerDate = this.createElement('div','okty_calendar_details-header-date');
      var headerDay = this.createElement('h1','okty_calendar_details-header-day',dayNumber);
      var headerMonthYear = this.createElement('div','okty_calendar_details-full-header-month');
      headerMonthYear.innerHTML = calendar.current.format('MMM').toUpperCase().bold()+ ' ' + calendar.current.format('YYYY');
      headerDate.appendChild(headerDay);
      headerDate.appendChild(headerMonthYear);
      containerHeader.appendChild(headerDate);
    }
    //Create the event wrapper
    containerArrow.appendChild(arrow);
    containerHeader.appendChild(containerArrow);
    details.appendChild(containerHeader);
    calendar.el.appendChild(details);
    var options = {preventDefault: true};
    var hammerDay = new Hammer(containerArrow, options);
    var flagEvent = false;
    hammerDay.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammerDay.on('tap pandown', function(ev){
      if(!flagEvent){
        flagEvent = true;
        var parentArrow = containerHeader.parentNode;
        parentArrow.className = 'okty_calendar_details okty_calendar_scroll';
        window.setTimeout(function() {
          parentArrow.parentNode.removeChild(parentArrow);
        }, 550);
        var dayOpen = document.querySelector('.okty_calendar_day-one.okty_calendar_open');
        dayOpen.className = 'okty_calendar_day-one';
      }
    });
    component.set("v.calendar", calendar);
    return dayNumber; 
  },
    drawBodyDetails : function (el,dayNumber, details, isFullContainer, component){
    var calendar = component.get("v.calendar");
    var day = calendar.current.clone().date(dayNumber);
    var todaysEvents = calendar.events.reduce(function(memo, ev) {
      if(ev.date.isSame(day, 'day')) {
        memo.push(ev);
      }
      return memo;
    }, []);
    var totalEvents = todaysEvents.length;
    var restEvents = 0;    
    var paginator = [[]];
    if(!isFullContainer){
      if(totalEvents > 0){
        if(totalEvents > 5){ // Events to show 5 at most
          restEvents = totalEvents - 5;
          totalEvents = 5;
        }
        for(var i=0; i<totalEvents; i++){
          paginator[0].push(todaysEvents[i]);  
        }
      }
    }else{    
      var maxPerPage = 10;
      var totalPages = Math.ceil(totalEvents/maxPerPage);
      paginator = new Array(totalPages);
      var aux = 0;
      var iterator = (totalEvents > maxPerPage) ? maxPerPage: totalEvents;
      var auxContEvents = totalEvents - maxPerPage;
      for(var j=0; j<totalPages; j++){
        if(typeof paginator[j] !== Array){
          paginator[j] = new Array();
        }        
        for(var i=0; i<iterator;i++){
          paginator[j].push(todaysEvents[aux]);
          aux+=1;
        }
        if(auxContEvents > maxPerPage){
          iterator = maxPerPage;
          auxContEvents-=maxPerPage;
        }else{
          iterator = auxContEvents;
        }
      }
      calendar.isMoreThanMaxPerPage = false; //to draw buttons footers
      if(totalEvents>maxPerPage){
        calendar.isMoreThanMaxPerPage = true;
      } 
      calendar.currentEvents = paginator;
      calendar.posListEvents = 0; // for event touch, PREVIOUS or NEXT btn
    }
    this.renderEvents(paginator[0], details, isFullContainer);
    component.set("v.calendar", calendar);
    return restEvents;
  },
    drawFooterDetails : function (el, details, restEvents, isFullContainer, component){
    var calendar = component.get("v.calendar");
    var footerDetails = this.createElement('div');
    if(!isFullContainer){
      if(restEvents>0){
        footerDetails.className = 'okty_calendar_details-footer';
        footerDetails.innderText = footerDetails.textContent = 'YOU HAVE '+ restEvents +' MORE' + (restEvents > 1 ? ' TASKS ': ' TASK ');
        
        var options = {preventDefault: true};
        var isFullContainer = true; // to draw the full details above the calendar container
        var hammerFooter = new Hammer(footerDetails, options);
        hammerFooter.on("tap",function(ev){
          calendar.openDay(el, isFullContainer);
        });
      }
    }else{
      if(calendar.isMoreThanMaxPerPage){
        var footerPrevious = this.createElement('btn','okty_calendar_details-footer-btn okty_calendar_details-footer-prev','PREVIOUS');
        var footerNext = this.createElement('btn','okty_calendar_details-footer-btn okty_calendar_details-footer-next','NEXT');
        if(calendar.posListEvents==0){
          footerPrevious.className = footerPrevious.className + ' okty_calendar_details-footer-btn-empty';
        }
        if(calendar.posListEvents == calendar.currentEvents.length-1){
          footerNext.className = footerNext.className  + ' okty_calendar_details-footer-btn-empty';
        }
        footerDetails.className = 'okty_calendar_details-full-footer';
        footerDetails.appendChild(footerPrevious);
        footerDetails.appendChild(footerNext);
        var options = {preventDefault: true, interval: 350};
        var hammerFooterPrev = new Hammer(footerPrevious, options);
        hammerFooterPrev.on("tap",function(ev){
          window.setTimeout(function() {
            if(calendar.posListEvents > 0){
              calendar.posListEvents-=1;
              calendar.renderEvents(calendar.currentEvents[calendar.posListEvents], details, isFullContainer);
              if(calendar.posListEvents==0){
                footerPrevious.className = footerPrevious.className + ' okty_calendar_details-footer-btn-empty';
              }
              if(calendar.posListEvents<calendar.currentEvents.length){
                footerNext.className = 'okty_calendar_details-footer-btn okty_calendar_details-footer-next';
              }            
            }
          },350);
        });
        options = {preventDefault: true, interval: 350};
        var hammerFooterNext = new Hammer(footerNext, options);
        hammerFooterNext.on("tap",function(ev){
          window.setTimeout(function() {
            if(calendar.posListEvents<calendar.currentEvents.length-1){
              calendar.posListEvents+=1;
              calendar.renderEvents(calendar.currentEvents[calendar.posListEvents], details, isFullContainer);
              if(calendar.posListEvents >= calendar.currentEvents.length-1){
                footerNext.className = footerNext.className  + ' okty_calendar_details-footer-btn-empty';
              }
              if(calendar.posListEvents>0){
                footerPrevious.className = 'okty_calendar_details-footer-btn okty_calendar_details-footer-prev';
              }
            }
          },350);
        });
      }
    }
    component.set("v.calendar", calendar);
    details.appendChild(footerDetails);
  },
    renderEvents : function(events, ele, isFullContainer) {
    //Remove any events in the current details element
    
    var currentWrapper = ele.querySelector('.okty_calendar_events');
    var wrapper = this.createElement('div', 'okty_calendar_events okty_calendar_in'+
      (isFullContainer ? ' okty_calendar_full ' : ''));
      for(var i=0; i<events.length; i++){
        var div = this.createElement('div', 'okty_calendar_event');
        var link = this.createElement('a', '');
        link.href = "#/sObject/" + events[i].eventId + "/view";
        var square = this.createElement('div', 'okty_calendar_event-category ' + 'okty_calendar_'+events[i].type + '-icon '+ 'okty_calendar_'+events[i].status);//event or task
        var span;
        if (events[i].status == true) {
          span = this.createElement('div', 'okty_calendar_description_done okty_calendar_'+events[i].status, events[i].eventName);
        } else {
          span = this.createElement('div', 'okty_calendar_description okty_calendar_'+events[i].status, events[i].eventName);
        }

        div.appendChild(link);
        div.appendChild(square);
        div.appendChild(span);
        wrapper.appendChild(div);
      }
    if(!events.length) {
      var div = this.createElement('div', 'okty_calendar_event okty_calendar_empty');
      var span = this.createElement('span', '', 'YOU DONT HAVE TASKS TODAY');
      div.appendChild(span);
      wrapper.appendChild(div);
    }
    if(currentWrapper) {
      currentWrapper.className = 'okty_calendar_events okty_calendar_out';
      currentWrapper.parentNode.removeChild(currentWrapper);
      ele.appendChild(wrapper);
    } else {
      ele.appendChild(wrapper); // draw footer
    }
  },
    nextMonth : function(component) {
    var calendar = component.get("v.calendar");
    calendar.current.add('months', 1);
    calendar.next = true;
    component.set("v.calendar", calendar);
  },

    prevMonth : function(component) {
    var calendar = component.get("v.calendar");
    calendar.current.subtract('months', 1);
    calendar.next = false;
    component.set("v.calendar", calendar);
  },

  //var calendar = component.get("v.calendar");
  //window.Calendar = calendar;

    createElement : function(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if(className) {
      ele.className = className;
    }
    if(innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
})