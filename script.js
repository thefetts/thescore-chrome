(() => {
	const apiUrl = 'http://api.football-data.org/v1/competitions/398/fixtures';
	const headers = new Headers({'X-Auth-Token': '2945451223e343ca923612c7993143f7'});
	window.fetch(apiUrl, {headers})
		.then(json => json.json())
		.then(data => {
			const homeElement = document.querySelector('#home');
			const awayElement = document.querySelector('#away');

			const homeScore = sum(data, 'goalsHomeTeam');
			const awayScore = sum(data, 'goalsAwayTeam');

			homeElement.querySelector('.score').innerText = homeScore;
			awayElement.querySelector('.score').innerText = awayScore;

			if(homeScore > awayScore) {
				homeElement.className += ' winning';
				awayElement.className += ' losing';
			} else {
				homeElement.className += ' losing';
				awayElement.className += ' winning';
			}
		});
})();

function sum(data, attribute) {
	return data.fixtures.reduce((a, b) => a + b.result[attribute], 0);
}
