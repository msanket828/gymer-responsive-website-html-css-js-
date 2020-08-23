
//slick 
$('.slider').slick({
	dots: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
	mobileFirst: true,
	autoplaySpeed: 10000,
	arrows: false,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				arrows: false,
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 992,
			settings: {
				arrows: false,
				slidesToShow: 3,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 767,
			settings: {
				arrows: false,
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 0,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});


// services
$('.services-cards').slick({
	dots: true,
	slidesToShow: 3,
	slidesToScroll: 3,
	autoplay: true,
	autoplaySpeed: 10000,
	arrows: false,
	responsive: [
		{
			breakpoint: 995,
			settings: {
				arrows: false,
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

//menu btn active functionality

let menus = document.querySelectorAll(".menu-button");
let html = document.querySelector("html");

menus.forEach(function (menu) {
	menu.addEventListener('click', function () {
		menus.forEach(function (menu) {
			menu.classList.remove("active");
		})
		menu.classList.add('active');
		if (html.classList.contains("overflow")) {
			html.classList.remove("overflow");
		}
	});
})





//js functionality for the tab

let tabs = document.querySelectorAll(".button-item"),
	lis = document.querySelectorAll(".table-data > li"),
	ul = document.querySelector(".button-group");

ul.addEventListener('click', tabFunctionality);
function tabFunctionality(e) {
	let tab = e.target.dataset.val;	//dataset.(val) - is use to access data attribute in js
	if (tab) {
		tabs.forEach(function (tab) {
			tab.classList.remove("tabBtnActive");	//to make all the tabs inactive
		})
		e.target.classList.add("tabBtnActive");	//to make only click tab active
		//looping through each li
		lis.forEach(function (li) {
			if (li.id == tab) { //checking tab id is equal to the li id then condition true
				li.classList.add("tabContentActive"); //if true then display
			} else {
				li.classList.remove("tabContentActive");//if false the display:none;
			}
		})
	}
}


//for counters
var nums = document.querySelectorAll(".counts"),
	section = document.querySelector('.counter-div')

nums.forEach(function (num) {
	let speed = 120;
	let target = num.getAttribute("data-val");
	//fatArrow ES6 function	
	const updateCounter = () => {
		let count = +num.innerText;
		let inc = target / speed;
		if (count < target) {
			let currentVal = count + inc;
			num.innerText = Math.ceil(currentVal);
			setTimeout(updateCounter, 200);
		} else {
			num.innerText = target;
		}
	};

	window.addEventListener("scroll", function () {
		var pageAt = (window.innerHeight + window.scrollY);
		var pos = (section.offsetTop + section.offsetHeight / 2);
		console.log(pos);
		if (pageAt > pos) {
			updateCounter();
		}
	})
})



//menu-bar functionality

var hamburger = document.querySelector(".hamburger"),
	nav = document.querySelector('nav'),
	menu=document.querySelectorAll('.menu-button');

hamburger.addEventListener('click', function () {
	if (hamburger.classList.contains('activeHamburger')) {
		hamburger.classList.remove('activeHamburger');
		nav.classList.add('hidenav');
		html.classList.remove("overflow");
	} else {
		html.classList.add("overflow");
		hamburger.classList.add('activeHamburger');
		nav.classList.remove('hidenav');
	}
})

menu.forEach(function(link) {
	link.addEventListener('click',function() {
		if(!nav.classList.contains('hidenav')){
			nav.classList.add('hidenav');
		}
		if(hamburger.classList.contains('activeHamburger'))
		{
			hamburger.classList.remove('activeHamburger');
		}
	})
})


//validation in contact-us
var error = document.querySelectorAll('.error');
//takes all the inputs
var inputs = [
	fname = document.querySelector('#fname'),
	contact = document.querySelector('#mobileno'),
	subject = document.querySelector('#subject'),
	email = document.querySelector('#email'),
	message = document.querySelector('#message')
];


//all regex code
var Regex = [
	firstNameRegex = /^([a-zA-Z\s]{2,25})$/,
	mobileRegex = /^([0-9]{10})$/,
	subjectRegex = /^([a-zA-Z\s]{5,25})$/,
	emailRegex = /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/,
	messageRegex = /^([a-zA-Z0-9\-\.\_\?\s\,]+)$/
];



var submit = document.querySelector("#submit");

//after click on submit button
submit.addEventListener('click', function (e) {
	e.preventDefault();
	doValidation(e);
});

inputs.forEach(function (input) {
	var index = inputs.indexOf(input);
	input.addEventListener('keyup', function () {
		if (Regex[index].test(input.value)) {
			input.nextElementSibling.classList = "success";
			input.nextElementSibling.innerText = " you are correct";
		} else {
			errors(input, input.nextElementSibling);
		}
	});
})


function doValidation(e) {
	var allEmpty = false;
	inputs.forEach(function (input) {
		if (input.value == "") {
			allEmpty = true;
		};
	});
	// If every fields are empty show error
	if (allEmpty) {
		e.preventDefault();
		inputs.forEach(function (input) {
			if (input.value == "") {
				input.nextElementSibling.classList.remove('none');
				input.nextElementSibling.classList.add('danger');
				errors(input, input.nextElementSibling);
			};
		});
		return false;
	}
	// If every fields are invalid show errors message
	var spans = document.querySelectorAll('.form-group span');
	var allCorrect = false;
	spans.forEach(function (span) {
		var AllErrorify = span.classList.contains('danger');
		if (!AllErrorify) {
			allCorrect = true;
			span.classList.remove('success');
		}
	});
	// If every fields are correct alert success message
	if (allCorrect) {
		// form.reset();
		inputs.forEach(function (input) {
			input.value = "";
			input.nextElementSibling.classList = "none";
		})
		alert("your Data is submitted successfully");
	}
}

function errors(input, span) {
	// console.log(input.classList[0]);
	switch (input.id) {
		case "fname": if (input.value == "" || input.value == null) {
			span.classList = "fill";
			span.innerText = "please fill the field";
		} else {
			span.classList = "danger";
			span.innerText = "please provide valid username & use alphabets only";
		}
			break;
		case "mobileno": if (input.value == "" || input.value == null) {
			span.classList = "fill";
			span.innerText = "please fill the field";
		} else {
			span.classList = "danger";
			span.innerText = "please provide 10 digit no only";
		}
			break;
		case "subject": if (input.value == "" || input.value == null) {
			span.classList = "fill";
			span.innerText = "please fill the field";
		} else {
			span.classList = "danger";
			span.innerText = "please use alphabets only";
		}
			break;
		case "email": if (input.value == "" || input.value == null) {
			span.classList = "fill";
			span.innerText = "please fill the field";
		} else {
			span.classList = "danger";
			span.innerText = "please provide valid email";
		}
			break;
		case "message": if (input.value == "" || input.value == null) {
			span.classList = "fill";
			span.innerText = "please fill the field";
		} else {
			span.classList = "danger";
			span.innerText = "please provide valid message";
		}
			break;

		default: break;
	}
}