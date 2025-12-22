import java.io.File;
import java.util.*;

public class PopularMerchandise {
    public static void main(String[] args) {

        //try opening the csv file using Scanner
        try {
            Scanner sc = new Scanner(new File("C:\\Users\\arsh\\Desktop\\KDU\\Java\\JavaConcertTicketSystem\\src\\items.csv"));

            //create hashmap for counting items
            HashMap<String, Integer> itemCount = new HashMap<>();

            //read the entire line, then split it
            while (sc.hasNextLine()) {
                String line = sc.nextLine();
                String[] items = line.split(",");

                for (String item : items) {
                    item = item.trim();

                    if (itemCount.containsKey(item)) {
                        itemCount.put(item, itemCount.get(item) + 1);
                    } else {
                        itemCount.put(item, 1);
                    }
                }
            }

            //to find top 3, sort by value
            List<Map.Entry<String, Integer>> list =
                    new ArrayList<>(itemCount.entrySet());

            //sort the items by count
            list.sort((a, b) -> b.getValue() - a.getValue());

            System.out.println("Top 3 popular items:");
            for (int i = 0; i < 3 && i < list.size(); i++) {
                System.out.println(
                        list.get(i).getKey() + " : " + list.get(i).getValue()
                );
            }

            sc.close();

        } catch (Exception e) {
            System.out.println("Error reading file");
        }
    }
}

