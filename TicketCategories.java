import java.util.*;

public class TicketCategories {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        ArrayList<String> ticketList = new ArrayList<>();
        HashSet<String> ticketSet = new HashSet<>();
        HashMap<String, Integer> ticketMap = new HashMap<>();

        System.out.println("Enter 10 ticket categories:");

        for (int i = 0; i < 10; i++) {
            String ticket = sc.nextLine();

            // Add to ArrayList
            ticketList.add(ticket);

            // Add to HashSet
            ticketSet.add(ticket);

            // Add/update count in HashMap
            if (ticketMap.containsKey(ticket)) {
                ticketMap.put(ticket, ticketMap.get(ticket) + 1);
            } else {
                ticketMap.put(ticket, 1);
            }
        }

        System.out.println();
        System.out.println("ArrayList: " + ticketList);
        System.out.println("HashSet: " + ticketSet);
        System.out.println("HashMap: " + ticketMap);

        sc.close();

    }
}
