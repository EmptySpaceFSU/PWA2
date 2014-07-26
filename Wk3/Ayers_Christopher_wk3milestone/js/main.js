/**
 * Christopher Ayers
 * Full Sail University
 * Last Update: Jul-24-2014
 * Week 3: Milestone Project
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

/* ========================================================= */

//$('.projectsbtn').click(function(e) {                         Updated the code below to assignment.
//	window.location.href='projects.html';
//});

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
   $('#register').on('click', function(){
      var lastname = $('#last').val(),
          firstname = $('#first').val(),
          username = $('#userName').val(),
          email1 = $('#email1').val(),
          email2 = $('#email2').val(),
          password = $('#password').val();
      //console.log(lastname + ' ' + firstname + ' ' + username + ' ' + email1 + ' ' + password);

       if (email1 == email2) {
           $.ajax({
               url: 'xhr/register.php',
               type: 'post',
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
                       window.location.assign('admin.html');
                   } // end if
               } // end success
           }); // end Ajax request
       } else {
            alert('Emails do not match');
           $('#email1').val('');                // Clear box 1
           $('#email2').val('');                // Clear box 2
           $('#email1').focus();                // Give box 1 focus.
       }

   });
});


/* ================= Go to Projects page ======================================== */
$('.projectsbtn').on('click', function(e) {
    e.preventDefault();
    window.location.assign('projects.html');
});

/* ================== Get Projects ======================================= */
var projects = function() {
    $.ajax({
        url: 'xhr/get_projects.php',
        type: 'get',
        dataType: 'json',
        success: function(response) {
            if (response.error){
                console.log(response.error);
            } else {
                for (var i= 0,j=response.projects.length; i<j;i++){
                    var result = response.projects[i];
                    $('.projects').append(
                        '<div style="border:1px solid green">' +
                        '<input class="projectid" type="hidden" value="' + result.id + '">' +
                        'Project Name: ' + result.projectName + '<br>' +
                        'Project Description: ' + result.projectDescription + '<br>' +
                        'Project Status: ' + result.status + '<br>' +
                        '<button class="deletebtn">Delete</button>' +
                        '<button class="editbtn">Edit</button> ' + '</div> <br>')
                }
                $('.editbtn').on('click', function(e) {
                    console.log('test edit');
                    var pID = $(this).parent('div').find('.projectid').val();
                    console.log(pID);
                });
                $('.deletebtn').on('click', function(e) {
                    console.log('test delete');
                    var pID = $(this).parent('div').find('.projectid').val();   // Find the specific project ID.
                    console.log(pID);
                    $.ajax({
                        url: 'xhr/delete_project.php',
                        data: {
                            projectID:pID                           // Delete the specific project ID in question.
                        },
                        type:'post',
                        dataType:'json',
                        success: function(response) {
                            console.log('Test for Success!');

                            if (response.error) {
                                alert(response.error);
                            }else{
                                window.location.assign("projects.html");
                            }
                        }
                    });
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