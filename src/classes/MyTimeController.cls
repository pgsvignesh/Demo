public class MyTimeController {

    public Time myTime { 
        get {
            if (myTime == null) {
                myTime =  DateTime.now().time();
            }
            return myTime;
        } 
        set;
    }
    public void actionSave(){
        System.debug('myTime ++++'+myTime );
    }
}