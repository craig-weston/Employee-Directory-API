$(document).ready(function() {

	// capitalizes the first letter in each string
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
 $.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=gb,au,dk,es,fi,fr,nl,nz,us',
  dataType: 'json',
  success: function(data) {
	  employees = data.results;
	  var boxes = '';

	$(employees).each(function(i, employee) {
	
	// Store employee information in variables
	let employeePhoto = data.results[i].picture.large;  
	let employeeName = capitalizeFirstLetter(data.results[i].name.first);
	let employeeLast = capitalizeFirstLetter(data.results[i].name.last);
	let employeeEmail = data.results[i].email;
	let employeeLocation = capitalizeFirstLetter(data.results[i].location.city);
	let employeePhone = data.results[i].cell;
	let employeeCity = capitalizeFirstLetter(data.results[i].location.city);
	let employeeAddress = data.results[i].location.street;
	let employeePostCode = data.results[i].location.postcode;
	let employeeState =	data.results[i].location.state;
	var employeeBirthday = new Date(data.results[i].dob);	
	employeeBirthday = new Date(employeeBirthday).toUTCString();
	employeeBirthday = employeeBirthday.split(' ').slice(0, 4).join(' ')
	
	
	// creating employee card and modal window for each employee using template literals
	
    boxes += `
		<div class="col-sm-4" data-toggle="modal" data-target="#employee-modal${i}">
			<div class="card mb-4">
			  <div class="card-body">
				  <div class="col-xs-4 col-lg-5 float-left">
					  <img class="img-fluid rounded-circle"  src="${employeePhoto}" alt="${employeeName} ${employeeLast}">
				  </div>
				 <div class="col-xs-8 col-lg-7 float-right"> 
					<h5 class="card-title mt-4">${employeeName} ${employeeLast}</h5>
					<p class="card-text font-weight-light text-secondary mb-0">${employeeEmail}</p>
					 <p class="card-text font-weight-light text-secondary">${employeeLocation}</p>
				  </div>
			  </div>
			</div>
		</div>

	<div class="modal fade" id="employee-modal${i--}" tabindex="-1" role="dialog">
		  <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
			<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
			  </div>
			  <div class="modal-body text-center">
				<img class="img-fluid rounded-circle mb-3" src="${employeePhoto}" alt="${employeeName} ${employeeLast}">
				<h5 class="modal-title">${employeeName} ${employeeLast} <span class="badge badge-success">New</span></h5>
				  <p class="font-weight-light text-secondary mt-1">${employeeEmail}</p>
				  <p class="font-weight-light text-secondary mb-5">${employeeLocation}</p>
				  <hr>
				  <p class="font-weight-light text-secondary mt-5">${employeePhone}</p>
				  <p class="font-weight-light text-secondary">${employeeAddress}, ${employeeCity}, ${employeeState}, ${employeePostCode}</p>
				  <p class="font-weight-light text-secondary">Birthday: ${employeeBirthday}</p>
			  </div>
			  <div class="modal-footer">
			<button type="button" class="btn btn-default btn-prev">Prev</button>
			<button type="button" class="btn btn-default btn-next">Next</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			  </div>
			</div>
		  </div>
		</div>
	`
	$("#directory").html(boxes);
	
	// function for next and previous buttons on modal
		$("div[id^='employee-modal']").each(function(){

		  var currentModal = $(this);

		  //click next
		  currentModal.find('.btn-next').click(function(){
			currentModal.modal('hide');
			currentModal.closest("div[id^='employee-modal']").nextAll("div[id^='employee-modal']").first().modal('show'); 
		  });

		  //click prev
		  currentModal.find('.btn-prev').click(function(){
			currentModal.modal('hide');
			currentModal.closest("div[id^='employee-modal']").prevAll("div[id^='employee-modal']").first().modal('show'); 
		  });

		});
		
		const $employees = $('.col-sm-4');
		const $message = $('<p>Not found...</p>');
		const $input = $('input');		

		// search feature to filter employees
		function search () {
		  matchedEmployees = [];
		  $employees.hide();
		  $message.remove();
		  // if employee matches the search, add it to a new array
		  $employees.each(function () {
			if ($(this).text().includes($input.val().toLowerCase())) {
			  matchedEmployees.push(this);
			}
		  })
		  // show matched employees
		  for (let i=0; i<12; i++) {
			for (let e=0; e<matchedEmployees.length; e++) {
			  if ($employees[i] == matchedEmployees[e]) {
				$employees[i].style.display = '';
			  }
			}
		  }
		} // end search



		$('#employee-search').keyup(search);
		
		
	  });
  	}
  });
});