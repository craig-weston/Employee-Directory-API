$(document).ready(function() {

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
	
$.ajax({
  url: 'https://randomuser.me/api/?results=12&gender=female&nat=CA',
  dataType: 'json',
  success: function(data) {
	  employees = data.results;
	  var boxes = '';

$(employees).each(function(i, employee) {
	let employeePhoto = data.results[i].picture.large;  
	let employeeName = capitalizeFirstLetter(data.results[i].name.first);
	let employeeLast = capitalizeFirstLetter(data.results[i].name.last);
	let employeeEmail = data.results[i].email;
	let employeeLocation = capitalizeFirstLetter(data.results[i].location.city);
	let employeePhone = data.results[i].cell;
	let employeeAddress = capitalizeFirstLetter(data.results[i].location.street);
	var employeeBirthday = new Date(data.results[i].dob);	
	employeeBirthday = new Date(employeeBirthday).toUTCString();
	employeeBirthday = employeeBirthday.split(' ').slice(0, 4).join(' ')


    boxes += `
		<div class="col-sm-4" data-toggle="modal" data-target="#employee-modal${i}">
			<div class="card mb-4">
			  <div class="card-body">
				  <div class="col-xs-4 col-lg-5 float-left">
					  <img class="img-fluid rounded-circle"  src="${employeePhoto}" alt="${employeeName}">
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
		  <div class="modal-dialog modal-dialog-centered modal-md" role="document">
			<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
			  </div>
			  <div class="modal-body text-center">
				<img class="img-fluid rounded-circle mb-3" src="${employeePhoto}" alt="${employeeName} ${employeeLast}">
				<h5 class="modal-title">${employeeName} <span class="badge badge-success">New</span></h5>
				  <p class="font-weight-light text-secondary mt-1">${employeeEmail}</p>
				  <p class="font-weight-light text-secondary mb-5">${employeeLocation}</p>
				  <hr>
				  <p class="font-weight-light text-secondary mt-5">${employeePhone}</p>
				  <p class="font-weight-light text-secondary">${employeeAddress}</p>
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

	
});
	  



}
	
  });
});