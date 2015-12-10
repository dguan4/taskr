(function ($) {
    $(document).ready(function () {
        $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    });

    $(document).ready(function () {
        $('select').material_select();
    });
    $(document).ready(function () {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
    });
    $(function () {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();

    });
})(jQuery); // end of jQuery name space

$(document).ready(function () {
    //global variables
    var user;
    var tasks = [];
    var loaded = false;

    var example = false;

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    //initial state

    $(".account").hide();
    $(".index").hide();
    $(".new_task").hide();

    //log in button
    $('.login').click(function () {
        $(".login-screen").hide();
        $(".index").show();
        var usern = $('#username').val();
        var pass = $('#password').val();
        user = {
            username: usern,
            password: pass,
            points: Math.floor((Math.random() * 100) + 1),
            email: 'No email provided.',
            phone: 'No phone provided.'
        };
        refreshUserDetails();
        indexListeners();
    });

    function generateExamples() {
        console.log("generating");
    }

    function indexListeners() {
        //console.log("index listeners load task");
        generateExamples();
        loadTasks();
        $('.add-task').off("click");

        $('.add-task').click(function () {
            $(".index").hide();
            $(".account").hide();
            $(".new_task").show();
            addTaskListeners();
        });

        $('.account-info').click(function () {
            $(".new_task").hide();
            $(".index").hide();
            $('.account').show();
            accountInfoListeners();
        });
    }

    function addTaskListeners() {
        $('.user-details').html('<li class="back">' +
                        '<a href="#" class="back btn-floating btn-large blue darken-1 tooltipped"' +
                           'data-position="bottom" data-delay="800" data-tooltip="Back">' +
                            '<i class="large material-icons">keyboard_arrow_left</i>' +
                        '</a>' +
                    '</li>' +
        '<li>Logged in as: ' + user.username + '</li>' +
            '<li>Current balance: $' + user.points + '</li>');
        $('.back').off("click");
        $('#task-it-button').off("click");

        $('.back').click(function () {
            $(".new_task").hide();
            $(".login-screen").hide();
            $(".index").show();
            refreshUserDetails();
            generateExamples();
            loadTasks();
        });


        $('#task-it-button').click(function () {
            var task_details = $('#task-details').val();
            var task_time = $('#task-time').val();
            if(document.getElementById('am').checked){
                task_time += ' AM';
            }
            else{
                task_time += ' PM';
            }
            var task_location = $('#task-street').val() + ' ' + $('#task-city').val() + ' ' + $('#task-zipcode').val();
            var task_price = $('#task-price').val();
            task_time = $('.datepicker').val() + ' at ' + task_time;
            var task = {
                details: task_details,
                date: task_time,
                location: task_location,
                price: "$" + task_price
            };

            tasks.push(task);
        });


    }

    function accountInfoListeners() {
        $('.back').click(function () {
            $(".account").hide();
            $(".login-screen").hide();
            $(".index").show();
            refreshUserDetails();
            //console.log("accountinfolisteners loadtasks");
            //loadTasks();
            //accountTasks();
        });
        accountTasks();

        refreshAcctInfo();

        $('#update-info').click(function(){
            updateAcctInfo();
            refreshAcctInfo();
        });

        if (example) {
            console.log("exampling");
            exampleToDo();
        }
    }

    function refreshUserDetails(){
        $(".user-details").html('<li>Logged in as: ' + user.username + '</li>' +
            '<li>Current balance: $' + user.points + '</li>');
    }

    function updateAcctInfo(){
        user.username = $('#user-name').val();
        user.password= $('#user-password').val();
        user.email = $("#email").val();
        user.phone = $("#phone").val();
    }

    function refreshAcctInfo(){
        //fill up our user info
        $('#user-name').attr("value", user.username);
        $('#user-password').attr("value", user.password);
        $("#email").attr("value", user.email);
        $("#phone").attr("value", user.phone);

        $('#user-name-label').attr("class", "active");
        $('#user-password-label').attr("class", "active");
        $("#email-label").attr("class", "active");
        $("#phone-label").attr("class", "active");
    }

    function exampleToDo() {
        console.log("adding");

        var html = "<li>"
            + "<div class=\"collapsible-header\">"
            + "<span><i class=\"material-icons\">done_all</i></span>"
            + "<span>Task 1</span>"
            + "</div>"
            + "<div class=\"collapsible-body\" id=\"to-do-task\">"
            + "<div class=\"row\">"
            + "<div class=\"col s6\" style=\"padding-left:25px; padding-top:15px;\">"
            + "<div>"
            + "<span class=\"task-info-label\">Task Title:</span> Dankster Or's Task"
            + "</div>"
            + "<div>"
            + "<span class=\"task-info-label\">Task Location:</span> 331 E Stoughton St Champaign, IL 61820"
            + "</div>"
            + "<div>"
            + "<span class=\"task-info-label\">Status:</span> <span class=\"italic amber-text text-accent-4\">In Progress</span>"
            + "</div>"
            + "</div>"
            + "<div class=\"col s6\" style=\"padding-top: 25px;\">"
            + "<a href=\"#\" id=\"pay-button\""
            + "class=\"disabled btn-large waves-effect waves-light blue darken-1 right\" onclick=\"Materialize.toast('You have not finished this task yet!', 3250)\">Request payment</a>"
            + "<div class=\"italic\">"
            + "After you finish this task, request your money here!  <i class=\"material-icons\">trending_flat</i>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</li>";
        if (example) {
            $("#to-do-list").append(html);
            example = false;
        }
    }


    function loadTasks() {
        //clear page
        $('#task-feed').html("");

        //generate example
        $('.dotask').off("click");

        var html2 = "<div class=\"row text-darken-1\">" +
                "<div class=\"col s6\">"
                    + "<h5><span class=\"task-info-label\">Task Location:</span> 331 E Stoughton St Champaign, IL 61820</h5>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Posted On: </span>"
                        + "<span>12/4/2015, 3:25 PM</span>"
                    + "</div>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Offer: </span>"
                        + "<span>$30</span>"
                    + "</div>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Details: </span>"
                        + "<span>Would like someone to pick up a few things from County Market grocery store.  House address and grocery list will be provided once you contact me.</span>"
                    + "</div>"
                + "</div>"
                + "<div class=\"right-align col s6\">"
                    + "<h5><span class=\"task-info-label\">Deadline:</span> <span class=\"red-text text-lighten-1\">12/10/2015, 5:00pm</span></h5>"
                    + "<div>User: Dankster Or</div>"
                    + "<div class=\"chip\"><img src=\"https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/money_bag.png\">This task is offering more than $10!</div>"
                    + "<div class=\"chip\"><img src=\"https://image.freepik.com/free-icon/circle-outline-with-exclamation-point_318-49537.png\">Only 2 more hours before task deadline!</div>"
                + "</div>"
                + "<div class=\"right-align col s12\">"
                    + "<a class=\"dotask logwaves-effect waves-light btn blue darken-1\">Bid for this Task</a>"
                + "</div>"
            + "</div>"
            + "<div class=\"divider\"></div>";

        var html3 = "<div class=\"row text-darken-1\">" +
                "<div class=\"col s6\">"
                    + "<h5><span class=\"task-info-label\">Task Location:</span> 606 E University Ave, Champaign, IL 61820</h5>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Posted On: </span>"
                        + "<span>12/1/2015, 11:09 AM</span>"
                    + "</div>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Offer: </span>"
                        + "<span>$5</span>"
                    + "</div>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Details: </span>"
                        + "<span>Can someone take my letter to the post office for me?  Just one letter.  Pick it up outside my house and bring it to the office.</span>"
                    + "</div>"
                + "</div>"
                + "<div class=\"right-align col s6\">"
                    + "<h5><span class=\"task-info-label\">Deadline:</span> 12/10/2015, 6:25pm</h5>"
                    + "<div>User: David Guan</div>"
                + "</div>"
                + "<div class=\"right-align col s12\">"
                    + "<a class=\"dotask logwaves-effect waves-light btn blue darken-1\">Bid for this Task</a>"
                + "</div>"
            + "</div>"
            + "<div class=\"divider\"></div>";

        var html4 = "<div class=\"row text-darken-1\">" +
                "<div class=\"col s6\">"
                    + "<h5><span class=\"task-info-label\">Task Location:</span> 401 E Park St, Champaign, IL 61820</h5>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Posted On: </span>"
                        + "<span>12/9/2015, 3:00 PM</span>"
                    + "</div>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Offer: </span>"
                        + "<span>$6</span>"
                    + "</div>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Details: </span>"
                        + "<span>Save a room for me at Grainger for one hour -- room 2098231.  Just chill in it until I arrive, do homework or whatever.  Just don't want it taken before I get there.</span>"
                    + "</div>"
                + "</div>"
                + "<div class=\"right-align col s6\">"
                    + "<h5><span class=\"task-info-label\">Deadline:</span> 12/13/2015, 3:00 PM</h5>"
                    + "<div>User: Or Dankster</div>"
                +"<div class=\"chip\"><img src=\"https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_home_48px-128.png\">This task is within 1 mile of you!</div>"
                + "</div>"
                + "<div class=\"right-align col s12\">"
                    + "<a class=\"dotask logwaves-effect waves-light btn blue darken-1\">Bid for this Task</a>"
                + "</div>"
            + "</div>"
            + "<div class=\"divider\"></div>";

        $('#task-feed').append(html2);
        $('#task-feed').append(html3);
        $('#task-feed').append(html4);

        $('.dotask').click(function () {
            console.log("doTask");
            example = true;
            $('#task-modal').openModal();
        });
        //end of example

        var d = new Date();
        d = d.toLocaleString(navigator.language, {year: '2-digit', month:'2-digit' ,day:'2-digit', hour: '2-digit', minute:'2-digit'});
        for (var i = 0; i < tasks.length; i++) {
            //console.log(i + tasks[i].details);

            var html ="<div class=\"row text-darken-1\">" +
                "<div class=\"col s6\">"
                    + "<h5>Task Location: " + tasks[i].location + "</h5>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Posted On: </span>"
                        + "<span>" + d + "</span>"
                    + "</div>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Offer: </span>"
                        + "<span>" + tasks[i].price + "</span>"
                    + "</div>"
                    + "<div>"
                        + " <span class=\"task-info-label\">Details: </span>"
                        + "<span>" + tasks[i].details + "</span>"
                    + "</div>"
                + "</div>"
                + "<div class=\"right-align col s6\">"
                    + "<h5>Deadline:" + tasks[i].date + "</h5>"
                    + "<span>User: " + user.username + "</span>"
                + "</div>"
            + "</div>"
            + "<div class=\"divider\"></div>";

            $('#task-feed').append(html);
        }
    }

    function accountTasks() {
        $('#posted-tasks').html("");
        for (var i = 0; i < tasks.length; i++) {
            console.log("appending tasks account");
            var html = "<li>"
                + "<div class=\"collapsible-header\">"
                + "<span><i class=\"material-icons\">done_all</i></span>"
                + "<span>Task " + (i + 1) + "</span>"
                + "</div>"
                + "<div class=\"collapsible-body\">"
                + "<div class=\"row\">"
                + "<div class=\"col s6\">"
                + "<p>"
                + "Task Title: " + tasks[i].details
                + "<br>"
                + "Status: Finished"
                + "</p>"
                + "</div>"
                + "<div class=\"col s6\" style=\"padding-top:25px;\">"
                + "<a href=\"#\" id=\"pay-button\""
                + "class=\"btn-large waves-effect waves-light blue darken-1 right\">Pay</a>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</li>";
            $('#posted-tasks').append(html);
        }
    }


});
