/*** Controller ***/
            
public class chooseColor {
    String s = 'blue,red';
    public String[] getString() {
        String [] value =s.split(',');
        System.debug(value);
        return value;
    }    
/* test*/	
    public void setString(String s) {
        this.s = s;
    }
}