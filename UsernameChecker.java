import java.util.Scanner;

public class UsernameChecker {
    public static void main(String[] args) {

        //allows Java to read user input from the keyboard
        Scanner sc = new Scanner(System.in);

        //ask the user to enter the username and confirmation
        //nextLine() is used because usernames are strings
        System.out.print("Enter username: ");
        String username1 = sc.nextLine();

        System.out.print("Confirm username: ");
        String username2 = sc.nextLine();

        //find length of both strings using .length() method
        int length1 = username1.length();
        int length2 = username2.length();

        //print the lengths
        System.out.println("Length 1: "+ length1);
        System.out.println("Length 2: "+ length2);

        //checking if lengths match
        boolean lengthsMatch = (length1 == length2);
        System.out.println("Lengths match: " + lengthsMatch);

        //check if strings are exactly the same
        boolean stringsMatch = username1.equals(username2);
        System.out.println("Strings match: " + stringsMatch);

        sc.close();
    }
}