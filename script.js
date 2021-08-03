const dex = document.getElementById('dex');
const fetchSentiMonsters = async () => {
    const url = "/amokatized.json";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const sentiMonsters = data.monsters.map((result, index) => ({
		...result,
		id: index + 1,
		image: `./images/${result.image}`
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
	const url = `\amokatized.json`;
	const res = await fetch(url);
	const sentiMonstere = await res.json();
	displayPopup(sentiMonstere, id);
};

const displayPopup = (sentiMonstere, id) => {	
	const image = `./images/${sentiMonstere.monsters[id - 1].image}`;
	const power_and_ability = Array(sentiMonstere.monsters[id - 1].power_and_ability).map((powerandability) => powerandability.join(", "));
	
	if (sentiMonstere.monsters[id - 1].power_and_ability[0] === null) {
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
					${sentiMonstere.monsters[id - 1].id + 1}. ${sentiMonstere.monsters[id - 1].name}
				</h2>
				<p><small>Serve: </small>${sentiMonstere.monsters[id - 1].serve}</p>
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
