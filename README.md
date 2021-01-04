# Rick and Morty Search

A web app that allows you to search all Rick and Morty characters and find out some information about them.

## The API

Rick and Morty Character Search utilizes https://rickandmortyapi.com/. This API has data about the characters, locations, and episodes of _everyone's_ favorite show! It is a treasure trove of easily consumable data!

## The Data

For this app, I focused on the character data. Specifically the image, name, species, origin and living status. Fortunately, rickandmortyapi is well laid out and extremely intuitive. Finding and accessing the data was simple and easy. The data itself is paginated and that is the one area that caused some difficulties for me.

### Pagination

To work with the multiple pages of data, I have written the fetch call into a funciton. If the data returns with multiple pages, a button is displayed that calls the API again with an increased page number. On the subsequent calls, if when the last page is reached, the button is hidden.

## Design

SASS was used for the styling. The design of this web app is very simple and straightforward, it displays cards inside a grid container which is housed insie a flex container. I used a mobile first approach and mediaqueries are present at 768px and 1400px.

### Cards

The results are diplayed as cards, while the design isn't exactly inventive, it is a recognizable and workable design. If I decide to add more data, the cards are large enough to accept info without distorting.

## Live Site

The Live site can be found here (LINK).
