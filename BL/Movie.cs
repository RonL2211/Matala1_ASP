namespace Matala1_ASP.BL
{
    public class Movie
    {
        string id;
        string title;
        double rating;
        double income;
        int year;
        double duration;
        string language;
        string description;
        string genre;
        string photo;
        static List<Movie> MovieList = new List<Movie>();

        public string Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public double Rating { get => rating; set => rating = value; }
        public double Income { get => income; set => income = value; }
        public int Year { get => year; set => year = value; }
        public double Duration { get => duration; set => duration = value; }
        public string Language { get => language; set => language = value; }
        public string Description { get => description; set => description = value; }
        public string Genre { get => genre; set => genre = value; }
        public string Photo { get => photo; set => photo = value; }

        static public bool Insert(Movie movieTOInsert)
        {
            foreach (var movie in MovieList)
            {
                if (movie.Id == movieTOInsert.id)
                {
                    return false;
                }
            }
            try
            {
                MovieList.Add(movieTOInsert);
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }
        static public List<Movie> Read()
        {
            return MovieList;
        }

    }
}
