package Lab1_Black_White_Chess;

import java.util.Scanner;

class Person extends Player implements Data{
    /*property*/
    private boolean give_up = false;

    /*method*/
    void play(Table table){
        /*获取放置位置坐标*/
        System.out.println("Enter move for "+this.getColor() +" RowCol:");
        Scanner input = new Scanner(System.in);
        String str = input.nextLine();
        /*转化为数字*/
        int row = str.charAt(0)-'a';
        int col = str.charAt(1)-'a';
        /*有效的位置输入*/
        if(table.can_put(row,col,color)){
            table.put(row,col,color,this,server.getRobot());
            server.printTable();
            server.setTurn(ROBOT);
        }
        /*无效的输入*/
        else {
            setGive_up();
        }
    }

    boolean isGive_up() {
        return give_up;
    }

    private void setGive_up() {
        this.give_up = true;
    }
}
