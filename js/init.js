(function ($) {
    $(document).ready(function () {
        $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    });

    $(document).ready(function () {
        $('select').material_select();
    });
    $(function () {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();

    });
})(jQuery); // end of jQuery name space

$(document).ready(function(){
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
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    //initial state
    
    $(".account").hide();
    $(".index").hide();
    $(".new_task").hide();

    //log in button
    $('.login').click(function() {
        $(".login-screen").hide();
        $(".index").show();
        var usern = $('#username').val();
        var pass = $('#password').val();
        user = {
            username: usern,
            password: pass
            }


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

        $('.add-task').click(function() {
            $(".index").hide();
            $(".account").hide();
            $(".new_task").show();
            addTaskListeners();
        });

        $('.account-info').click(function() {
            $(".new_task").hide();
            $(".index").hide();
            $('.account').show();
            accountInfoListeners();
        });
    }

    function addTaskListeners() {
        $('.back').off("click");
        $('#task-it-button').off("click");

            $('.back').click(function() {
                $(".new_task").hide();
                $(".login-screen").hide();
                $(".index").show();
                //console.log("back addtasklisteners");
                generateExamples();
                loadTasks();
            });
        

        $('#task-it-button').click(function() {
            var task_details = $('#task-details').val(); 
            var task_date = $('#task-date').val(); 
            var task_location = $('#task-location').val(); 
            var task_price = $('#task-price').val(); 
            task_date = task_date +" "+ $('.datepicker').val();
            var task = {details: task_details,
                        date: task_date,
                        area: task_location,
                        price: "$"+task_price}

            //console.log(task_details);
            tasks.push(task);
        });


    }

    function accountInfoListeners() {
        $('.back').click(function() {
            $(".account").hide();
            $(".login-screen").hide();
            $(".index").show();
            //console.log("accountinfolisteners loadtasks");
            //loadTasks();
            //accountTasks();
        });
        accountTasks();

        if(example) {
            console.log("exampling");
            exampleToDo();
        }
    }

    function exampleToDo() {
        console.log("adding");

         var html = "<li>"
                        +"<div class=\"collapsible-header\">"
                            +"<span><i class=\"material-icons\">done_all</i></span>"
                            +"<span>Task "+(1)+"</span>"
                        +"</div>"
                        +"<div class=\"collapsible-body\">"
                            +"<div class=\"row\">"
                                +"<div class=\"col s6\">"
                                    +"<p>"
                                        +"Task Title: "+"Example"
                                        +"<br>"
                                        +"Status: In Progress"
                                    +"</p>"
                                +"</div>"
                                +"<div class=\"col s6\" style=\"padding-top:25px;\">"
                                    +"<a href=\"#\" id=\"pay-button\""
                                       +"class=\"btn-large waves-effect waves-light blue darken-1 right\">Finish</a>"
                                +"</div>"
                            +"</div>"
                        +"</div>"
                    +"</li>";

            if(example) {
                $("#to-do-list").append(html);
                example = false;
            }
    }


    function loadTasks() {
        //clear page
        $('#task-feed').html("");

        //generate example
        $('.dotask').off("click");

        var html2 = "<div class=\"section text-darken-1\"><h5 style=\"float: left; width: 50%;\">Task Location: "+"Champaign"+"</h5>"
        +"<h5 style=\"float: right; width: 50%; text-align: right;\">Posted On: "+"4:20 4 December 2015"+"</h5>"
        +"<span>Deadline: </span>"
        +"<span class=\"user\">User: "+"Ben Goodman"+"</span>"
        +"<span>"+"4:20 8 December 2015"+"</span>"
        +"<p>Offer: "+"$10.00"+"</p>"
        +"<p>Details:"+"Example task for the feed blahblabhblah"
        +"</div>"
        +"<a class=\"dotask logwaves-effect waves-light btn blue darken-1\">Do Task</a>"
        +"<div class=\"divider\"></div>";

        $('#task-feed').append(html2);

        $('.dotask').click(function() {
            console.log("doTask");
            example = true;
        });
        //end of example

        var d = new Date();
        d = d.toLocaleString();
        for(var i = 0; i < tasks.length; i++) {
            //console.log(i + tasks[i].details);

            var html = "<div class=\"section text-darken-1\"><h5 style=\"float: left; width: 50%;\">Task Location: "+tasks[i].area+"</h5>"
            +"<h5 style=\"float: right; width: 50%; text-align: right;\">Posted On: "+d+"</h5>"
            +"<span>Deadline: </span>"
            +"<span class=\"user\">User: "+user.username+"</span>"
            +"<span>"+tasks[i].date+"</span>"
            +"<p>Offer: "+tasks[i].price+"</p>"
            +"<p>Details:"+tasks[i].details
            +"</div>"
            +"<div class=\"divider\"></div>";



            $('#task-feed').append(html);
        }
    }

    function accountTasks(){
        $('#posted-tasks').html("");
        for (var i = 0; i < tasks.length; i++){
            console.log("appending tasks account");
            var html = "<li>"
                        +"<div class=\"collapsible-header\">"
                            +"<span><i class=\"material-icons\">done_all</i></span>"
                            +"<span>Task "+(i+1)+"</span>"
                        +"</div>"
                        +"<div class=\"collapsible-body\">"
                            +"<div class=\"row\">"
                                +"<div class=\"col s6\">"
                                    +"<p>"
                                        +"Task Title: "+tasks[i].details
                                        +"<br>"
                                        +"Status: Finished"
                                    +"</p>"
                                +"</div>"
                                +"<div class=\"col s6\" style=\"padding-top:25px;\">"
                                    +"<a href=\"#\" id=\"pay-button\""
                                       +"class=\"btn-large waves-effect waves-light blue darken-1 right\">Pay</a>"
                                +"</div>"
                            +"</div>"
                        +"</div>"
                    +"</li>";
            $('#posted-tasks').append(html);
        }
    }


});
