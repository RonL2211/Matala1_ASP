﻿using Matala1_ASP.BL;
using Microsoft.AspNetCore.Mvc;

namespace Matala1_ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        // GET: api/<MovieController>
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return Movie.Read();
        }

        // GET api/<MovieController>/5
        [HttpGet("{id}")]
        public Movie? Get(string id)
        {
            return Movie.Read().FirstOrDefault(m => m.Id == id);
        }

        // POST api/<MovieController>
        [HttpPost]
        public bool Post([FromBody] Movie movie)
        {
            return Movie.Insert(movie);
        }

        // PUT api/<MovieController>/5
        [HttpPut("{id}")]
        public bool Put(string id, [FromBody] Movie updatedMovie)
        {
            var existingMovie = Movie.Read().FirstOrDefault(m => m.Id == id);
            if (existingMovie == null) return false;

            existingMovie.Title = updatedMovie.Title;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.Income = updatedMovie.Income;
            existingMovie.Year = updatedMovie.Year;
            existingMovie.Duration = updatedMovie.Duration;
            existingMovie.Language = updatedMovie.Language;
            existingMovie.Description = updatedMovie.Description;
            existingMovie.Genre = updatedMovie.Genre;
            existingMovie.Photo = updatedMovie.Photo;

            return true;
        }

        // DELETE api/<MovieController>/5
        [HttpDelete("{id}")]
        public bool Delete(string id)
        {
            var movieToDelete = Movie.Read().FirstOrDefault(m => m.Id == id);
            if (movieToDelete == null) return false;

            Movie.Read().Remove(movieToDelete);
            return true;
        }
    }
}