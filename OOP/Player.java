package Lab1_Black_White_Chess;

public class Player {
    protected int piece_num = 2;
    protected String color;
    protected Server server;

    public void play(){

    }

    public int add_num(int add){
        piece_num+=add;
        return piece_num;
    }

    public Server getServer() {
        return server;
    }

    public void setServer(Server server) {
        this.server = server;
    }

    public int getPiece_num() {
        return piece_num;
    }
    public void setPiece_num(int piece_num) {
        this.piece_num = piece_num;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
