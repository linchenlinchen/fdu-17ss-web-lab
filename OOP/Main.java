package Lab1_Black_White_Chess;

public class Main implements Data{
    /*创建一个静态的Server实例，能够被main函数调用*/
    private static Server server = new Server();

    public static void main(String[] args) {
	// write your code here
        /*使用Server类运行*/
        server.run();
    }
}
