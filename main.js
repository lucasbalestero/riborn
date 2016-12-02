var days = 0;
var seconds = 0.001; // Real seconds per game day
var interval = 1000 * seconds;

var dateInGame = new Date();
var beginDate = new Date();

var age = 0;

var displayAge;
var displayDateInGame;
var displayBeginDate = convertDate(beginDate);
var displayDateOfBirth;

var human = new Human(beginDate.getTime());
var deadHuman = new Human(beginDate.getTime());

var genericHumanStatus = new Task("Natural Status", strperday=0.001, intperday=0.001);


displayDateOfBirth = convertDate(human.dateOfBirth);

var lifeStages = {
	NEW_BORN : "New Born",
	BABY : "Baby",
	CHILD : "Child",
	TEENAGER : "Teenager",
	ADULT : "Adult",
	ELDERLY : "Elderly",
	DEAD : "Dead"
}

$(document).ready(function(){
	$('#reborn').hide();
	$('#deadHumanInformation').hide();

	$('#reborn').click(function(){
		$('#reborn').hide();
		createNewHuman();	
		$('#deadHumanInformation').show();
	});

});

window.setInterval(function(){
	update();
	draw();
}, interval);

function update(){
	incrementDays(1);
	updateAge();
	updateStats();
	checkDeath();
	checkLifeStatus();
}

function draw(){
	$('#firstDay').html(displayBeginDate);
	$('#day').html(displayDateInGame);
	$('#age').html(displayAge);
	$('#status').html(human.lifeStatus);
	$('#generation').html(human.generation);
	$('#dateOfBirth').html(displayDateOfBirth);
	$('#intelligence').html(human.intelligence.toFixed(2));
	$('#strength').html(human.strength.toFixed(2));
}

function checkLifeStatus(){

	if(human.lifeStatus == lifeStages.DEAD){
		updateDeadHuman();
		$('#reborn').show(); 
	}else{
		if(age == 0){
			human.lifeStatus = lifeStages.NEW_BORN;
		}else if(age >= 1){
			if(age < 3){
				human.lifeStatus = lifeStages.BABY;
			}else if(age < 13){
				human.lifeStatus = lifeStages.CHILD;
			}else if(age < 20){
				human.lifeStatus = lifeStages.TEENAGER;
			}else if(age < 60){
				human.lifeStatus = lifeStages.ADULT;
			}else{
				human.lifeStatus = lifeStages.ELDERLY;
			}
		}
	}
}


function updateDeadHuman(){
	deadHuman = new Human(human.dateOfBirth);
	deadHuman.dateOfDeath = dateInGame;
	deadHuman.lifeStatus = human.lifeStatus;
	deadHuman.intelligence = human.intelligence;
	deadHuman.strength = human.strength;
	deadHuman.generation = human.generation;
	deadHuman.deathChance = human.deathChance;
}


function createNewHuman(){
	human = new Human(dateInGame.getTime(), deadHuman.generation + 1);

	genericHumanStatus = new Task(genericHumanStatus.description, intperday=(deadHuman.intelligence / 1000), strperday=(deadHuman.strength / 1000));

	displayDateOfBirth = convertDate(human.dateOfBirth);
}


function checkDeath(){
	var randomNumber = Math.random() * 100;
	human.deathChance = 0.00001 * (age * 7);
	if(randomNumber < human.deathChance){
		human.lifeStatus = lifeStages.DEAD;
		human.dateOfDeath = dateInGame;
	}
}

function updateStats(){
	if(human.lifeStatus != lifeStages.DEAD){
		updateIntelligence();
		updateStrength();
	}
}


function updateIntelligence(){
	human.intelligence += genericHumanStatus.intperday;
}


function updateStrength(){
	human.strength += genericHumanStatus.strperday;
}


function incrementDays(num){
	days += num;
	dateInGame = beginDate.addDays(days);
	displayDateInGame = convertDate(dateInGame);
}

function _calculateAge(endDate) {
	var ageDifMs = endDate - human.dateOfBirth;
	var ageDate = new Date(ageDifMs);
	age = Math.abs(ageDate.getUTCFullYear() - 1970);
}

function updateAge(){
	if(human.lifeStatus == lifeStages.DEAD){
		_calculateAge(human.dateOfDeath);
		displayAge = getAge(human.dateOfBirth, human.dateOfDeath);
	}else{
		_calculateAge(dateInGame);
		displayAge = getAge(human.dateOfBirth, dateInGame);	
	}
}

function convertDate(inputFormat) {
	function pad(s) { return (s < 10) ? '0' + s : s; } // Add a 0 to the left when number is less than 10
	var d = new Date(inputFormat);
	return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

function getAge(firstDate,finalDate){

	var startDate = new Date(firstDate);
	var endDate = new Date(finalDate);
	var year = endDate.getFullYear() - startDate.getFullYear();

	if((endDate.getMonth() + 1) >= (startDate.getMonth() + 1)){
		var month = (endDate.getMonth() + 1)-(startDate.getMonth() + 1);
	}else{
		var month = 12 + (endDate.getMonth() + 1)-(startDate.getMonth() + 1);
		year--;
	}

	if(endDate.getDate() >= startDate.getDate()){
		var day = endDate.getDate()-startDate.getDate();
	}else{
		var day = 31 + endDate.getDate()-startDate.getDate();
		month--;

		if(month < 0){
			month = 11;
			year--;
		}
	}

	var fmtYear;
	var fmtMonth;
	var fmtDay;
	if(year == 1){
		fmtYear = "Year";
	}else{
		fmtYear = "Years";
	}

	if(month == 1){
		fmtMonth = "Month";
	}else{
		fmtMonth = "Months";
	}

	if(day == 1){
		fmtDay = "Day";
	}else{
		fmtDay = "Days";
	}

	var formatedAge = day + " " + fmtDay;
	if (month > 0){
		formatedAge = month + " " + fmtMonth + " " + formatedAge;
	}
	if (year > 0){
		formatedAge = year + " " + fmtYear + " " + formatedAge;
	}
	return formatedAge;
}
