public without sharing  class   aaPage27 {
    Event e;
    Boolean isClicked;
    public Datetime dt1;
    public aaPage27(ApexPages.StandardController controller) {
        e = (Event) controller.getRecord();
    }
    //test by Sailappa
    public String OptionTime { get; set; }
    public String Timestamp {
        get {
            Date DT;
            Time TM;
            DateTime DT_TM;
            if (e.ActivityDate != null) {
                if (Optiontime == null) {
                    Optiontime = OptionTimes[0].getValue();
                }

                DT = e.ActivityDate;
                TM = ParseTime(OptionTime);
                DT_TM = DateTime.newInstance(DT, TM);
                dt1 = DT_TM ;
                return DT_TM.format('dd/MM/yyyy hh:mm a');
            } else {
                return '';
            }
        }
        private set;
    }
    public List<SelectOption> OptionTimes {
        get {
            if (OptionTimes == null) {
                DateTime DT_TM1 = DateTime.newInstance(Date.Today(), Time.newInstance(0,0,0,0));
                DateTime DT_TM2 = DT_TM1;

                OptionTimes = new List<SelectOption>();
                while (DT_TM1.isSameDay(DT_TM2)) {
                    String strTM = DT_TM1.Format('h:mm a');
                    OptionTimes.add(new SelectOption(strTM,strTM));
                    DT_TM1 = DT_TM1.addMinutes(15);
                }
            }
            return OptionTimes;
        }
        private set;
    }
    public PageReference ClickTime() {
        OptionTime = ApexPages.currentPage().getParameters().get('Time');
        return null;
    }
    public String getClickTimeNow() {
        String out;
        Long lDT_TM;
        Long lNow = DateTime.Now().getTime();
        Long timeDiff = (1000 * 60 * 60 * 24) * 2; // Make it much longer that what it should be
        Long check = 0;

        for (SelectOption opt : OptionTimes) {
            lDT_TM = DateTime.newInstance(Date.Today(), ParseTime(opt.getValue())).getTime();
            if (Math.Abs(lNow - lDT_TM) < timeDiff) {
                timeDiff = Math.Abs(lNow - lDT_TM);
                out = opt.getValue();
            }
            if (Math.Abs(lNow - lDT_TM) > check ) {
                timeDiff = Math.Abs(lNow - lDT_TM);
            }
        }
        System.debug('SFDC: Check: ' + check );
        return out;
    }
    public PageReference DoNothing() {

    System.debug('the time stamp value is'+dt1);
        return null;
    }
    private Time ParseTime(String strTime) {
        Integer TM_H;
        Integer TM_M;
        String TM_AP;
        String[] tmp;

        tmp = strTime.split(':', 2);
        TM_H = Integer.valueOf(tmp[0]);

        tmp = tmp[1].split(' ', 2);
        TM_M = Integer.valueOf(tmp[0]);
        TM_AP = tmp[1];
        return Time.newInstance(TM_H + (TM_AP.startsWith('P') ? 12 : 0), TM_M, 0, 0);
    }

}