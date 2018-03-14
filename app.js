$(document).ready(function() {
	
	
$.ajax({
  url: 'https://randomuser.me/api/?results=12&gender=female&nat=CA',
  dataType: 'json',
  success: function(data) {
	  employees = data.results;
	  var boxes = '';

$(employees).each(function(i, employee) {
	let employeePhoto = data.results[i].picture.large;  
	let employeeName = data.results[i].name.first;
	let employeeAlias = data.results[i].name.last;
	let employeeEmail = data.results[i].email;
	let employeeLocation = data.results[i].location.city;
	let employeePhone = data.results[i].cell;
	let employeeAddress = data.results[i].location.street;
	let employeeBirthday = data.results[i].dob;	


    boxes += `
		<div class="col-sm-4" data-toggle="modal" data-target="#employee-modal${i--}">
			<div class="card mb-4">
			  <div class="card-body">
				  <div class="col-xs-4 col-lg-5 float-left">
					  <img class="img-fluid rounded-circle"  src="${employeePhoto}" alt="${employeeName[i++]}">
				  </div>
				 <div class="col-xs-8 col-lg-7 float-right"> 
					<h5 class="card-title mt-4">${employeeName}</h5>
					<p class="card-text font-weight-light text-secondary mb-0">${employeeEmail}</p>
					 <p class="card-text font-weight-light text-secondary">${employeeAlias}</p>
				  </div>
			  </div>
			</div>
		</div>

<div class="modal fade" id="employee-modal${i}" tabindex="-1" role="dialog">
	  <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <div class="modal-body text-center">
			<img class="img-fluid rounded-circle mb-3" src="${employeePhoto}" alt="${employeeName}">
			<h5 class="modal-title">${employeeName} <span class="badge badge-success">New</span></h5>
			  <p class="font-weight-light text-secondary mt-1">${employeeEmail}</p>
			  <p class="font-weight-light text-secondary mb-5">${employeeLocation}</p>
			  <hr>
			  <p class="font-weight-light text-secondary mt-5">${employeePhone}</p>
			  <p class="font-weight-light text-secondary">${employeeAddress}</p>
			  <p class="font-weight-light text-secondary">Birthday: ${employeeBirthday}</p>
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		  </div>
		</div>
	  </div>
	</div>

`

$("#directory").html(boxes);
	
});
	  



}
	
  });
});