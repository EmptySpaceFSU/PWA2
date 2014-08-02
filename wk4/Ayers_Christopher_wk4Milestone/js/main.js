/**
 * Christopher Ayers
 * Full Sail University
 * Last Update: Aug-1-2014
 * Week 4: Milestone Project
 */

/* ==================== Display Username =================== */

$.getJSON('xhr/check_login.php', function(data) {
    console.log(data);                  // Debug Test
    $.each(data, function(key, val){
        console.log(val.first_name);
        var nameIs = val.first_name;
        $('#userid').html("Welcome User: " + nameIs);
    })
})



/* ======================== Modal =========================== */

$('.modalClick').on('click', function(event) {
	event.preventDefault();
	$('#overlay')
		.fadeIn()
		.find('#modal')
		.fadeIn();
});

$('.close').on('click', function(event) {
	event.preventDefault();
	$('#overlay')
		.fadeOut()
		.find('#modal')
		.fadeOut();
});

/* ======================= Tabbed Navigation ================ */

$('#tabs p').hide().eq(0).show();
$('#tabs p:not(:first)').hide();
$('#nav li').click(function(e) {
	e.preventDefault();
	$('#tabs p').hide();


$('#nav li .current').removeClass("current");
	$(this).addClass('current');
	var clicked = $(this).find('a:first').attr('href');
	
	$('#tabs ' + clicked).fadeIn('fast');
	console.log(clicked);
}).eq(0).addClass('current');

/* ================= ToolTips ======================================== */
$('.masterTooltip').hover(function() {
	console.log('working!');
	var title = $(this).attr('title');
	$(this).data('tipText', title).removeAttr('title');
	$('<p class="tooltip"></p>')
	.text(title)
	.appendTo('body')
	.fadeIn('slow');
}, function() {
	$(this).attr('title', $(this).data('tipText'));
	$('.tooltip').remove();
}).mousemove(function(e) {
		var mousex = e.pageX + 25;
		var mousey = e.pageY + 15;
		$('.tooltip')
		.css({ top:mousey, left: mousex })
});
/* ====================== Log in =================================== */

$(function (ready) {
    $('#signinButton').click(function(){
        var user = $('#user').val();
        var pass = $('#pass').val();
        console.log('Can you see this?');

        $.ajax({
            url: 'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: user,
                password: pass
            },
            success: function (response) {
                console.log("test user");
                if (response.error) {
                    alert(response.error);
                } else {
                    window.location.assign('admin.html');
                }
            }
        });
    });
});

/* ===================== Log Out ==================================== */
$(function(ready) {
   $('#signOut').click(function(e){
       e.preventDefault;
       $.get('xhr/logout.php', function(){
           window.location.assign('index.html');
       });
   });
});


/* ===================== Register ==================================== */


$(function(ready){
    $('#registerbtn').on('click',function(){
        window.location.assign('register.html');        // Link from the homepage to registration.
    });


   $('#register').on('click', function(){               // This button assigns everything to variables
      var lastname = $('#last').val(),                  // to later pass back to the server in an AJAX
          firstname = $('#first').val(),                // message.
          username = $('#userName').val(),
          email1 = $('#email1').val(),
          email2 = $('#email2').val(),
          password = $('#password').val();

       if (email1 == email2) {                          // This function passes information back
           $.ajax({                                     // to the server to build a user profile.
               url: 'xhr/register.php',                 // It checks to make sure that the email
               type: 'post',                            // address match before moving forward.
               dataType: 'json',
               data: {
                   firstname: firstname,
                   lastname: lastname,
                   username: username,
                   email: email1,
                   password: password
               },

               success: function(response){
                   if (response.error){
                       alert(response.error);
                   } else {
                       window.location.assign('admin.html');    // If all goes well, you are moved
                   } // end if                                     to the admin page.
               } // end success
           }); // end Ajax request
       } else {
            alert('Emails do not match');
           $('#email1').val('');                // Clear box 1          This is the section that clears
           $('#email2').val('');                // Clear box 2          out the email fields for the user
           $('#email1').focus();                // Give box 1 focus.    if the emails do not match.
       }

   });
});


/* ================= Go to Projects page ======================================== */
$('.projectsbtn').on('click', function(e) {                     // A simple function to take the user to
    e.preventDefault();                                         // their projects section, while preventing
    window.location.assign('projects.html');                    // default system actions.
});

/* ================== Get Projects ======================================= */
var projects = function() {                                     // This ajax request pings the server for the
    $.ajax({                                                    // projects assigned to the user that is
        url: 'xhr/get_projects.php',                            // currently signed in.
        type: 'get',
        dataType: 'json',
        success: function(response) {
            if (response.error){
                console.log(response.error);
            } else {
                for (var i= 0,j=response.projects.length; i<j;i++){
                    var result = response.projects[i];
                    $('.projects').append(
                        '<div id="sortable" class="ui-state-default">' +    // This was updated for the dragging UI.
                        '<input class="projectid" type="hidden" value="' + result.id + '">' +
                        'Project Name: ' + result.projectName + '<br>' +
                        'Project Description: ' + result.projectDescription + '<br>' +
                        'Project Status: ' + result.status + '<br>' +
                        '<button class="deletebtn">Delete</button>');
                        //'<button class="editbtn">Edit!</button> ' + '</div> <br>')
                }   // I took out the edit button, but left in start of the functionality behind it.
                    // I did this because it keeps the site looking better.
                $('.editbtn').on('click', function(e) {
                }
                $('.deletebtn').on('click', function(e) {
                    console.log('test delete');
                    var pID = $(this).parent('div').find('.projectid').val();   // Find the specific project ID.
                    $(this).parent('div').effect('puff', 400);                  // Here, I added the puff effect
                    setTimeout(function () {                                    // The puff was being interrupted by
                        console.log(pID);                                       // the page reload, so I delayed the
                        $.ajax({                                                // AJAX request until after the puff
                            url: 'xhr/delete_project.php',                      // effect finished.
                            data: {
                                projectID: pID                           // Delete the specific project ID in question.
                            },
                            type: 'post',
                            dataType: 'json',
                            success: function (response) {
                                console.log('Test for Success!');

                                if (response.error) {
                                    alert(response.error);
                                } else {
                                    window.location.assign("projects.html");
                                }
                            } // End Success function
                        }); // End Ajax request
                    },500); // End Time Delay
                    }); // End delete

            } // End if
        } // .ajax pull kill
    })
};
projects();

/* ================= Add Project =================== */
$('#addButton').on('click', function() {

    var projName = $('#projectName').val(),
        projDesc = $('#projectDescription').val(),
        projDue = $('#projectDueDate').val(),
        status = $('input[name = "status"]:checked').prop('id');

    $.ajax({
        url: "xhr/new_project.php",
        type: "post",
        dataType: "json",
        data: {
            projectName: projName,
            projectDescription: projDesc,
            dueDate: projDue,
            status: status
        },
        success: function(response) {
            console.log('testing for success');

            if(response.error) {
                alert(response.error);
            } else {
                window.location.assign("projects.html");
            };
        }
    });
});
/* ================== Edit Project =================== */


/* ================== Sortable ======================= */
$(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
});
/* ================== Datepicker ===================== */
$(function() {
    $( "#datepicker" ).datepicker();
});
