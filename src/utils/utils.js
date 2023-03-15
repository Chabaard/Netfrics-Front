/* eslint-disable import/prefer-default-export */

export const utils = {
  getSeries(families) {
    let series = {
      name: 'Séries',
      series: [],
    };
    if (families) {
      families.forEach((familie) => {
        if (familie.series) {
          familie.series.forEach((serie) => {
            series.series.push(serie);
          });
        }
      });
    }
    if (!series.series[0]) series = null;
    return series;
  },
  getMovies(families) {
    let movies = {
      name: 'Films',
      movies: [],
    };
    if (families) {
      families.forEach((familie) => {
        if (familie.movies) {
          familie.movies.forEach((movie) => {
            movies.movies.push(movie);
          });
        }
      });
    }
    if (!movies.list[0]) movies = null;
    return movies;
  },
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  },
  getRandomVideo(families) {
    const nArray = [];
    families.forEach((familie) => {
      if (familie.movies) {
        familie.movies.forEach((movie) => {
          nArray.push({movie, type: 'movies'})
        });
      }
      if (familie.series) {
        familie.series.forEach((serie) => {
          nArray.push({serie, type: 'series'})
        });
      }
    });
    const randomNumber = this.getRandomInt(nArray.length)
    return nArray[randomNumber];
  },
};
