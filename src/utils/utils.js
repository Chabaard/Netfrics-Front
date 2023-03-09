/* eslint-disable import/prefer-default-export */

export const utils = {
  getSeries(families) {
    const series = {
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
    return series;
  },

};
