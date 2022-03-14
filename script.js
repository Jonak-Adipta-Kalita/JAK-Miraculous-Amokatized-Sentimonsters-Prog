const dex = document.getElementById('dex');
const fetchSentiMonsters = async () => {
    const res = await fetch("https://jak_api.p.rapidapi.com/miraculous", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "jak_api.p.rapidapi.com",
			"x-rapidapi-key": "d3474315fcmshe6f03eb826f16bcp181f82jsn7d262d2601be"
		}
	});
	const data = await res.json();
	console.log(data);
	const sentiMonsters = data.amokatized.map((result, index) => ({
		...result,
		id: index + 1,
		image: `https://jak-api.vercel.app/${result.image}`
	}));
	displaySentiMonsters(sentiMonsters);
};

const displaySentiMonsters = (sentiMonster) => {
    const sentiMonsterHTMLString = sentiMonster
        .map((sentiMonstere) => (`
			<li class="card" onclick="selectSentiMonsters(${sentiMonstere.id})">
				<img class="card-image" src="${sentiMonstere.image}"/>
				<h2 class="card-title">${sentiMonstere.id}. ${sentiMonstere.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = sentiMonsterHTMLString;
};

const selectSentiMonsters = async (id) => {
	const res = await fetch("https://jak_api.p.rapidapi.com/miraculous", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "jak_api.p.rapidapi.com",
			"x-rapidapi-key": "d3474315fcmshe6f03eb826f16bcp181f82jsn7d262d2601be"
		}
	});
	const sentiMonstere = await res.json();
	displayPopup(sentiMonstere, id);
};

const displayPopup = (sentiMonstere, id) => {	
	const image = `https://jak-api.vercel.app/${sentiMonstere.amokatized[id - 1].image}`;
	const power_and_ability = Array(sentiMonstere.amokatized[id - 1].power_and_ability).map((powerandability) => powerandability.join(", "));
	
	if (sentiMonstere.amokatized[id - 1].power_and_ability[0] === null) {
		power_and_abilityHTML_String = "";
	} else {
		power_and_abilityHTML_String = `<small>Power and Ability(s): </small>${power_and_ability}`;
	}
	

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${sentiMonstere.amokatized[id - 1].id + 1}. ${sentiMonstere.amokatized[id - 1].name}
				</h2>
				<p><small>Serve: </small>${sentiMonstere.amokatized[id - 1].serve}</p>
				<p>${power_and_abilityHTML_String}</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchSentiMonsters();
