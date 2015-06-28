# tump-tump
Visualizing Seattle's bike count data; tump-tump go the tires over pneumatic tubes...

Seattle provides hourly bike count data from several locations across the city. It's presented in tabular format, so it could use some more engaging visualization. Especially useful would be some time-series charts to compare year-over-year changes in counts. 

Jake V. did some heavy [stats analysis] (https://jakevdp.github.io/blog/2014/06/10/is-seattle-really-seeing-an-uptick-in-cycling/) of this data using pandas. The city pays the data collector to [visualize] (http://www.seattle.gov/transportation/bikecounter_spokane.htm) a couple locations, but there lots o tubes (or maybe loops under the pavement?) across the city, and problem more coming. 

[Here's] (https://data.seattle.gov/Transportation/26th-Ave-SW-Greenway-at-SW-Oregon-St/mefu-7eau) where the city provides the bike data. 

Thoughts:

  - select locations from a map
  - view average counts by hour, latest trends for the year, comparisons versus last year, etc.
  - contrast with weather and other factors, a la Jake V.'s analysis

Currently I'm testing in the viz.js script, running it with node to load in API data. 

I'd like to local cache all the count data, for each location in a db, (mongo?) to avoid calling directly to the source. The database will be updated at intervals matching the base data, probably every couple weeks or so. 

Next steps are saving all count data to the db, and then making example d3 charts for a location.
