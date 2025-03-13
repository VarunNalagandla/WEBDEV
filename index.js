let searchInput = document.getElementById('searchInput');
let resultCountries = document.getElementById('resultCountries');
let spinner = document.getElementById('spinner');
let countriesList = [];
let searchInputVal = '';

function addDiv(e) {
    let {
        flag,
        name,
        population
    } = e;
    let countryCard = document.createElement('div');
    countryCard.classList.add('country-card', 'col-11', 'col-md-5', 'ml-auto', 'mr-auto', 'd-flex', 'flex-row');
    resultCountries.appendChild(countryCard);

    let countryFlag = document.createElement('img');
    countryFlag.src = flag;
    countryFlag.classList.add('country-flag');
    countryCard.appendChild(countryFlag);

    let countryDiv2 = document.createElement('div');

    let countryN = document.createElement('p');
    countryN.textContent = name;
    countryN.classList.add('country-name');
    countryDiv2.appendChild(countryN);

    let countryP = document.createElement('p');
    countryP.textContent = population;
    countryP.classList.add('country-population');
    countryDiv2.appendChild(countryP);
    countryCard.appendChild(countryDiv2);
}



function sendData() {
    resultCountries.textContent = '';
    for (let e of countriesList) {
        let countryName = e.name;
        if (countryName.includes(searchInputVal)) {
            addDiv(e);
        }
    }
}

function getCountries() {
    spinner.classList.toggle('d-none');
    let url = 'https://apis.ccbp.in/countries-data';
    let options = {
        method: "GET"
    };
    fetch(url, options).then(function(response) {
        return response.json();
    }).then(function(obj) {
        spinner.classList.toggle('d-none');
        countriesList = obj;
        sendData();
    });
}

function onChangeSearchInput(event) {
    searchInputVal = event.target.value;
    sendData();
}

getCountries();
searchInput.addEventListener('keyup', onChangeSearchInput);
