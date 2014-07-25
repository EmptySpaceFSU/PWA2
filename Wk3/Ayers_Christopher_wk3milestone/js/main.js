/**
 * Christopher Ayers
 * Full Sail University
 * Last Update: Jul-24-2014
 * Week 3: Milestone Project
 */

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

/* ========================================================= */
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

/* ========================================================= */