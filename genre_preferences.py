genre_list = []
genre_set = set()
genre_dict = {}

print("Enter 10 movie genres:")

for i in range(10):
    genre = input()

    genre_list.append(genre)
    genre_set.add(genre)

    if genre in genre_dict:
        genre_dict[genre] += 1
    else:
        genre_dict[genre] = 1

print("\nList:", genre_list)
print("Set:", genre_set)
print("Dictionary:", genre_dict)
