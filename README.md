# Pinnet
#### Pin the best part of your day 📍🌎
===========================

Pinnet is a web app that can share and display maps with many different points of interest. Want to see a map of the best Sushi resturants 🍣 ? How about a map of Art Museums 🖼 ? A map of hidden gems in the city 💎 ? Pinnet can do all these things and can be shared with anyone! Pinnet allows users to collaboratively create maps which list multiple "points". For example: "Best Places to Eat Around Town" or "Locations of Movie Scenes".

Open source library used: Leaflet<sup>1</sup>

Pinnet is built as a midterm project for Lighthouse Labs Web Development Programe by:

- Tha God (Ryan)
- Admiral Michael Le Duong
- GOAT Sidney


## List of Basic Functions

- users can see a list of the available maps
- users can view a map 🔍
- a map can contain many points 📍
- each point can have: a title, description, and image
- authenticated users can create maps
- authenticated users can modify maps (add, edit, remove points)
- users can favourite a map ⭐️
- users have profiles, indicating their favourite maps and maps they've contributed to 👤

## Entity Relationship Diagram (ERD)

![ERD](https://github.com/diavolosz/Lighthouse-MT-wikiMaps/blob/master/sampleImage/ERD.png)

## Wire Frames

![Wire Frame](https://github.com/diavolosz/Lighthouse-MT-wikiMaps/blob/master/sampleImage/Final_mock_up.png)

## Page Previews

![Welcome Page](https://github.com/diavolosz/Lighthouse-MT-wikiMaps/blob/master/sampleImage/welcomePage.png)

![Adding New Pin](https://github.com/diavolosz/Lighthouse-MT-wikiMaps/blob/master/sampleImage/nePin.png)

![Main Map View](https://github.com/diavolosz/Lighthouse-MT-wikiMaps/blob/master/sampleImage/mapPinDisplay.png)

![Editing Pin](https://github.com/diavolosz/Lighthouse-MT-wikiMaps/blob/master/sampleImage/pinEdit.png)

![List of Maps](https://github.com/diavolosz/Lighthouse-MT-wikiMaps/blob/master/sampleImage/browse.png)

![Create a New Map](https://github.com/diavolosz/Lighthouse-MT-wikiMaps/blob/master/sampleImage/newMap.png)

## Getting Started

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at http://localhost:8080/.
3. Go to http://localhost:8080/ in your browser.
4. Explore the site! Maybe make your own maps 👀
4. Begin exploring the city! 🗺

## Future Feature Implementation

- Delete created maps
- auto-locate user 




## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- bcryptjs
- cookie-session
- express


1: Refer to leaflet: https://leafletjs.com/
