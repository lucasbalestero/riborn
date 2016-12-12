class Profession {
	constructor(field, company, role, salary) {
		this.field = field;
		this.company = company;
		this.role = role;
		this.workingTime = 0;
		this.salary = salary;
		this.productivity = 50;
	}

	employ(field, company, role, salary) {
		this.field = field;
		this.company = company;
		this.role = role;
		this.workingTime = 0;
		this.salary = salary;
		this.productivity = 50;
	}

	fire() {
		this.field = "None";
		this.company = "None";
		this.role = "Unemployed";
		this.workingTime = 0;
		this.salary = 0;
		this.productivity = 50;
	}

	raiseSalary() {
		this.salary = Math.ceil(this.salary + this.salary * 0.1);
	}
}


//PROFESSION LIBS

checkJobs() {
	//----------TODO: RETURN ARRAY OF JOBS.

	var job = {
		field : "",
		company : "",
		role : "",
		workingTime : 0,
		salary : 0,
		productivity : 0
	};
	
	outer:
	for (let i = 0; i <= techCompanies.companies.length - 1; i++) {
		for (let j = 0; j <= techCompanies.roles.length - 1; j++) {
			if (human.Intelligence >= techCompanies.getIntValue(i, j)) {
				job.field = techCompanies.field;
				job.company = techCompanies.companies[i];
				job.role = techCompanies.roles[j];
			}
			else
				break outer;
		}
	}
		
}

var job = {
	field : "",
	company : "",
	role : "",
	workingTime : 0,
	salary : 0,
	productivity : 0
};

var techCompanies = {
	field : "Information Technology",
	companies : new Array("Blopper Solutions", "Babel Systems", "Digitools"),
	roles : new Array("QA Tester", "Developer", 
		"Software Engineer", "Project Manager", "IT Director"),
	
	getIntValue : function(i, j) {
		// ARGS: i: INDEX OF ARRAY 'companies'; j: INDEX OF ARRAY 'roles'.
		var base = 10;
		return (base * i * (techCompanies.roles.length + 1)) + (base + base * j);
	}
};