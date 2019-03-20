package Lab1_Black_White_Chess;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

class Server implements Data {
    /*property*/
    private Table table;
    private String turn;
    private Person person;
    private Robot robot;

    /*constructor，bind with server object*/
    Server() {
        table = new Table();
        person = new Person();
        robot = new Robot();
        person.setServer(this);
        robot.setServer(this);
    }

    /*method*/
    /*运行的开始*/
    void run(){
        /*初始化游戏数据，开始计时，打印表格*/
        init_game();
        long begin = System.currentTimeMillis();
        printTable();

        /*开始对战,在可交替下棋的情况下交替*/
        person.setServer(this);
        robot.setServer(this);
        fight();

        /*结束游戏*/
        long end = System.currentTimeMillis();
        /*记录文档*/
        File file = new File("Reversi.csv");
        if(!file.exists()){
            try {
                file.createNewFile();
            }catch (IOException e){
                System.out.println("(ｷ｀ﾟДﾟ´)!!哎呀！不能创建存储对局的文件啊呀.");
                System.exit(1);
            }
        }
        produce_record(begin,end,file);

    }

    /*初始化对局信息*/
    private void init_game(){
        Scanner input = new Scanner(System.in);
        System.out.println("我的小可爱，告诉我棋盘多大吧(#^.^#)");
        System.out.println("如果棋盘大小小于4或者大于10，本小娜都会罢工的哦(＾Ｕ＾)ノ\nEnter the board dimension:");

        /*设置规模和计算机棋子颜色以及确定首发是机器人还是人*/
        set_inform(input);
        System.out.println("小呀小可爱，你想让我当X还是O呢？O(∩_∩)O\nComputer plays(X/O):");
        set_X_O(input);
        System.out.println("好的呢，都给您安排好啦~ ❥(^_-) 初始棋盘如下\nIt is ready:");
    }

    /*对战*/
    private void fight(){
        fight:
        {
            while (!is_finish()) {
                switch (turn) {
                    case PERSON:
                        person.play(table);
                        if (person.isGive_up()) {
                            break fight;
                        }
                        setTurn(ROBOT);
                        break;
                    case ROBOT:
                        robot.play(table);
                        printTable();
                        break;
                    default:
                        break;
                }
            }
        }
        if(person.isGive_up()){
            System.out.println("Invalid move.");
            printResult(person,robot,true);
        }
        else {
            printResult(person,robot,false);
        }
    }

    /*设置棋盘规模*/
    private void set_inform(Scanner input){
        try {
            String scale_str = input.nextLine();
            int scale_int = Integer.parseInt(scale_str);

            if(scale_int >= 4 && scale_int <= 10) {
                table.setScale(scale_int);
                table.init_table();
            }
            else {
                System.out.println("我的小可爱呀！ 你怎么就不好好看看我们的范围呢[○･｀Д´･ ○]");
                set_inform(input);
            }
        }catch (NumberFormatException e){
            System.out.println("小可爱o(╥﹏╥)o  请输入合法数字嘛");
        }
    }

    /*设置电脑的棋子颜色*/
    private void set_X_O(Scanner input){
        String X_or_O = input.nextLine();
        switch (X_or_O){
            case X:
                person.setColor(O);
                robot.setColor(X);
                setTurn(ROBOT);
                break;
            case O:person.setColor(X);
                robot.setColor(O);
                setTurn(PERSON);
                break;
            default:System.out.println("小可爱你有点不乖哦╭(╯^╰)╮ 咱们的棋子只有X和O 再输入一次吧");
                set_X_O(input);
        }
    }

    /*判断是否结束游戏*/
    private boolean is_finish(){
        if(person.getPiece_num() == table.getScale()*table.getScale()){
            return true;
        }
        else if(person.getPiece_num() == 0){
            return true;
        }
        else if(robot.getPiece_num() == 0){
            return true;
        }

        for (int i = 0; i < table.getScale(); i++) {
            for (int j = 0; j < table.getScale(); j++) {
                if(table.can_put(i,j,X) || table.can_put(i,j,O)){
                    return false;
                }
            }
        }
        return true;
    }

    /*打印棋盘面*/
    void printTable(){
        int scale = table.getScale();
        char row = 'a' - 1;
        char col = 'a' - 1;
        System.out.print(" ");/*打印列码时的缩进*/
        for (int i = 0; i < scale; i++) {
            System.out.print(++col);
        }
        System.out.print("\n");

        for (int i = 0; i < scale; i++) {
            System.out.print(++row);
            for (int j = 0; j < scale; j++) {
                System.out.print(table.getTable_surface()[i][j]);
            }
            System.out.print("\n");
        }
    }

    /*打印游戏结果*/
    private void printResult(Person player1, Robot player2, boolean isGiveUp){
        System.out.println("Game over.");
        System.out.println(player1.getColor() + ":" + player2.getColor() +
                " = " + player1.getPiece_num() + ":" + player2.getPiece_num());
        if(isGiveUp){
            System.out.println(Table.turn_color(person.getColor())+" player wins.");
        }
        else if(player1.getPiece_num() != player2.getPiece_num()){
            System.out.println((player1.getPiece_num()>player2.getPiece_num()) ? (player1.getColor() + " player wins."):(player2.getColor() + " player wins."));
        }
        else {
            System.out.println("It is a draw.");
        }
    }

    /*做记录*/
    private void produce_record(long begin, long end, File file){
        try {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            String date = df.format(new Date());// new Date()为获取当前系统时间
            long use_time = (end-begin)/1000;
            int scale = table.getScale();
            StringBuilder str = new StringBuilder(date).append(",").append(use_time).append(",").append(scale).append("*").append(scale).append(",");
            if(X.equals(person.getColor())){
                str.append("human,computer,");
                if(person.isGive_up())
                    str.append("Human gave up.");
                else
                    str.append(person.getPiece_num() + " to " + robot.getPiece_num());
            }
            else {
                str.append("computer,human,");
                if(person.isGive_up())
                    str.append("Human gave up.");
                else
                    str.append(robot.getPiece_num()).append(" to ").append(person.getPiece_num());
            }

            /*写入文件*/
            RandomAccessFile raf = new RandomAccessFile(file,"rw");
            raf.seek(raf.length());
            if(raf.length() > 0)
                raf.write("\n".getBytes());
            raf.write(str.toString().getBytes());
            raf.close();
        }catch (Exception e){
            System.out.println("IO异常！");
        }
    }

    void setTurn(String turn) {
        this.turn = turn;
    }

    Person getPerson() {
        return person;
    }

    Robot getRobot() {
        return robot;
    }
}
