let newMatches = [];

function hasChangedPage() {
    let hasChangedPage = true;
}

function createMatch() {
    if (document.querySelector('#homeTeam').value === '' || document.querySelector('#awayTeam').value === '' || document.querySelector('#setOne').value === '' || document.querySelector('#setTwo').value === '' || document.querySelector('#setThree').value === '') {
        document.querySelector('#msg').classList.add('text-danger');
        document.querySelector('#msg').innerHTML = 'You must fill out all the required fields (all of those which do not have OPTIONAL on them).';
        setTimeout(function() {document.querySelector('#msg').innerHTML = ''}, 3000);
        document.querySelector('#homeTeam').value = '';
        document.querySelector('#awayTeam').value = '';
        document.querySelector('#setOne').value = '';
        document.querySelector('#setTwo').value = '';
        document.querySelector('#setThree').value = '';
        document.querySelector('#setFour').value = '';
        document.querySelector('#setFive').value = '';
    } else {
        let homeSets = 0;
        let awaySets = 0;

        if (document.querySelector('#setOne').value.substring(0, 2) > document.querySelector('#setOne').value.substring(3))
            homeSets++;
        else
            awaySets++;
        if (document.querySelector('#setTwo').value.substring(0, 2) > document.querySelector('#setTwo').value.substring(3))
            homeSets++;
        else
            awaySets++;
        if (document.querySelector('#setThree').value.substring(0, 2) > document.querySelector('#setThree').value.substring(3))
            homeSets++;
        else
            awaySets++;
        if (document.querySelector('#setFour').value != '') {
            if (document.querySelector('#setFour').value.substring(0, 2) > document.querySelector('#setFour').value.substring(3))
                homeSets++;
            else
                awaySets++;
            if (document.querySelector('#setFive').value != '') {
            if (document.querySelector('#setFive').value.substring(0, 2) > document.querySelector('#setFive').value.substring(3))
                homeSets++;
            else
                awaySets++;
            }
        }

        const newMatch = {
            home: document.querySelector('#homeTeam').value,
            away: document.querySelector('#awayTeam').value,
            gameOne: document.querySelector('#setOne').value,
            gameTwo: document.querySelector('#setTwo').value,
            gameThree: document.querySelector('#setThree').value,
            gameFour: document.querySelector('#setFour').value === '' ? document.querySelector('#setFour').value = null : document.querySelector('#setFour').value,
            gameFive: document.querySelector('#setFive').value === '' ? document.querySelector('#setFive').value = null : document.querySelector('#setFive').value,
            homeSets: homeSets,
            awaySets: awaySets
        };

        document.querySelector('#msg').classList.remove('text-danger');
        document.querySelector('#msg').innerHTML = 'Match Added.'
        setTimeout(function() {document.querySelector('#msg').innerHTML = ''}, 3000);

        if (hasChangedPage === true && localStorage.getItem('newMatches') != null)
            newMatches = JSON.parse(localStorage.getItem('newMatches'));

        newMatches.push(newMatch);

        localStorage.setItem('newMatches', JSON.stringify(newMatches));

        document.querySelector('#homeTeam').value = '';
        document.querySelector('#awayTeam').value = '';
        document.querySelector('#setOne').value = '';
        document.querySelector('#setTwo').value = '';
        document.querySelector('#setThree').value = '';
        document.querySelector('#setFour').value = '';
        document.querySelector('#setFive').value = '';
    }
}


function clearStorage() {
    localStorage.clear();
}