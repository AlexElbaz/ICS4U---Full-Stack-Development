const companies = [
   { name: "Company One", category: "Finance", start: 1981, end: 2004 },
   { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
   { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
   { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
   { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
   { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
   { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
   { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
   { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];


//let filteredAges = ages.filter((age) => {if (age > 30) return true; else return false;});
   // Can make ^^ shorter.


// If we put the {} we need to explicitly return a value. I.e. you must put {return ....}, it is expecting you to do some work. If you aren't doing any work, don't need the curly braces, nor an explicit return statement.
   // If we only have a single parameter then we don't need ()
   // Same for after the arrow function.
let filteredAges = ages.filter(age => age > 30);

// We can include the index if we want.
// backticks (``) allow us to create template literals (template strings). Use ${...} to access a variable.
filteredAges.forEach((age, index) => console.log(`${index}: ${age}`));


let technologyCompanies = companies.filter(company => company.category === "Technology");
technologyCompanies.forEach(company => console.log(`${company.name} [${company.start} - ${company.end}]`));




// Ternary Operator
let age = 32;

// condition ? what to return if true : what to return if false;
   // Note that like in the example below, you can chain these ifs.
let message = age > 30 ? 'You are old' : age < 10 ? 'You are very little' : 'You are not old';
console.log(message);




// Think of sort like compareTo, rather than returning true or false like the other higher order functions thus far, it will return a number. If that number is positive the program will say a > b and move accordingly, if negative b > a.
// Sort generally goes by ascending order, it is sort of built in a way that favours ascending order.
let sortedAges = ages.sort((a, b) => a - b);
sortedAges.forEach(age => console.log(age));


// To get descending order, simply do b.start - a.start.
let sortedCompanies = companies.sort((a, b) => a.start - b.start);
sortedCompanies.forEach(company => console.log(`${company.name} [${company.start} - ${company.end}]`));



let test = companies.map(company => `Hello ${company.name}`);
test.forEach(company => console.log(company));



let test1 = companies.map(company => {
   let t = {};
   t.property1 = company.start;
   t.property2 = company.end;
   return t;
});
test1.forEach(company => console.log(company));



let totalAge = ages.reduce((total, age) => age + total,0);
console.log(totalAge);















