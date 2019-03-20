package Lab1_Black_White_Chess;

public class Robot extends Player implements Data{

    /*机器人玩耍*/
    void play(Table table){
        int[][] expect = new int[table.getScale()][table.getScale()];
        for (int i = 0; i < table.getScale(); i++) {
            for (int j = 0; j < table.getScale(); j++) {
                boolean can_put = table.can_put(i,j,color);
                int index = Table.getSave().size();
                if(can_put) {
                    expect[i][j] = index;
                }
                else {
                    expect[i][j] = 0;
                }
            }
        }
        int row = 0;
        int col = 0;
        int max = 0;
        for (int i = 0; i < table.getScale(); i++) {
            for (int j = 0; j < table.getScale(); j++) {
                if(expect[i][j]>max){
                    row = i;
                    col = j;
                    max = expect[i][j];
                    /*更新save这个链表*/
                    table.can_put(i,j,color);
                }
            }
        }
        if(max>0) {
            table.put(row, col, color, this, server.getPerson());
            System.out.println("Robot places " + color + " at "+(char)(row+'a') + (char)(col+'a'));
        }
        else {
            System.out.println("Robot has no valid place, person continue.");
        }
        server.setTurn(PERSON);
    }

    public int add_num(int add){
        piece_num+=add;
        return piece_num;
    }

}
