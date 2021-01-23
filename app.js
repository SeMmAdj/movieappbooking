// step 1

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
//we have grabe all items which are not have class of occupied


const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;
// here we can not use const since price need to be changed

// by adding + before variable from which we want value, we convert to number from string
// will grab the price of selecteg movie, alos we need to convert into number and by default is string

// step 8
// update UI from local storage

updateUI()


// step 3
// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // we store number of selected seats and we have node list from which we need the length of 

    // step 5

    // copy selected seats, map through array of seats and return a new array(indexes)
    // take a index of seats(selected), take the index from each and save them into local storage
    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    console.log(seatIndex)
        // we need to convert into string
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))



    const selectedSeatsCount = selectedSeats.length;
    // now we have number of selected seats, so now can multuply with price of movies
    count.innerText = selectedSeatsCount;
    // fill into dom the number of selected seats
    total.innerText = selectedSeatsCount * ticketPrice;
    // muliply seats with price and fill into dom;



}

// step 7
// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {

    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// step 9
// get data from local storage and updateinto UI

function updateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // we grab selected seats from local storage, where we store them and we need to convert them into array

    console.log(selectedSeats)
        // check if we have something into selected seats
    if (selectedSeats !== null && selectedSeats.length > 0) {

        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                // if is not empty and class name on the seats which are present
                seat.classList.add('selected');

            }
        })


    }

    // update seats and price from localsorage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    // check if is not null

    if (selectedMovieIndex !== null) {

        movieSelect.selectedIndex = selectedMovieIndex;
    }

}





// step 4
// Movie select event , we listen the selected movies/price, how we will be able to chenge the price of movie
movieSelect.addEventListener('change', e => {

    ticketPrice = +e.target.value;
    // will take selected price 
    // call function to count and update the totat, and numbet of seats

    // step 6
    setMovieData(e.target.selectedIndex, e.target.value);
    // take the index of selected movie and the price of the movie

    updateSelectedCount()

})

// step 2

// we want on click on not occupied seat add clas selected etc
container.addEventListener('click', (e) => {

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // if clicked elemnt has class name seat and has not class occupied on itself
        // take that elemen and add class on it

        e.target.classList.toggle('selected')

        // now we want to multuple the number of selected seats with price of muvies
        updateSelectedCount();



    }

})

// Initial cont and total

updateSelectedCount()