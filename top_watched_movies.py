file = open("watchlist.csv", "r")

movie_count = {}

line = file.read()
movies = line.split(",")

for movie in movies:
    movie = movie.strip()

    if movie in movie_count:
        movie_count[movie] += 1
    else:
        movie_count[movie] = 1

file.close()

sorted_movies = sorted(
    movie_count.items(),
    key=lambda x: x[1],
    reverse=True
)

print("Top 3 watched movies:")
for i in range(3):
    print(sorted_movies[i][0], ":", sorted_movies[i][1])
