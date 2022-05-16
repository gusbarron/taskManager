
const iconImportant ="iImportant fas fa-star";
const iconNonImportant ="iImportant far fa-star";
var important = false;
var panelVisible = true;
var total = 0;

function toggleImportance(){
  if(important){
    $("#iImportant").removeClass(iconImportant).addClass(iconNonImportant);
    important = false;
  }
  else{
      $("#iImportant").removeClass(iconNonImportant).addClass(iconImportant);
      important = true;
  }


}


function togglePanel(){
  if(panelVisible){
    $("#form").hide();
    $("#btnTogglePanel").text("< Show");
    panelVisible=false;
  }
  else{
    $("#form").show();
    $("#btnTogglePanel").text("Hide >");
    panelVisible = true;
  }
}

function saveTask(){
  
  let title = $("#txtTitle").val();
  let description = $("#txtDesc").val();
  let dueDate = $("#selDate").val();
  let location = $("#txtLocation").val();
  let invites = $("#txtInvites").val();
  let color = $("#selColor").val();
  let frequency = $("#selFrequency").val();
  let status = $("#selStatus").val();

  let task = new Task(important, title, description, dueDate, location, invites, color, frequency, status);


  $.ajax({
    type: "post",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function(res) {
      console.log("Task saved", res);
      displayTask(task);
      clearForm();

      total += 1;
      $("#headCount").text("You have " + total + " tasks");
    },
    error: function(errorDetails) { 
      console.error("Saved failed", errorDetails);
    },
  });
}


function clearForm(){
  $("input").val("");
  $("textarea").val("");
  $("select").val("0");
  $("#selColor").val("#ffffff");
  important = true;
  toggleImportance();
}




function getStatusText(status){
  switch(status){
    case "1":
      return "Pending";
    case "2":
      return "In progress";
    case "3":
      return "Paused";
    case "4":
      return "Completed";
    case "5":
      return "Abandoned";

    default:
      return "Other";
  }
}

function getFrequencyText(frequency){
  switch(frequency){
    case "0":
      return "One Time";
    case "1":
      return "Daily";
    case "2":
      return "Weekly";
    case "3":
      return "Monthly";
    
    default:
      return "Other";
  }

}

function displayTask(task){
  let iconClass = iconNonImportant;
  if (task.important) {
    iconClass = iconImportant;
  }

  let syntax = `<div class="task-item" style="border: 1px solid ${task.color};">
  <div class="icon">
    <i class="${iconClass}"></i>
  </div>

  <div class="info-1">
    <h5>${task.title}</h5>
    <p>${task.description}</p>
  </div>

  <div class="info-2">
    <label>${task.dueDate}</label>
    <label>${task.location}</label>
  </div>

  <div class="info-3">
    <p>${task.invites}</p>
  </div>

  <div class="info-2">
    <label>${getFrequencyText(task.frequency)}</label>
    <label>${getStatusText(task.status)}</label>
  </div>


  </div>`;


  $("#tasks").append(syntax);
}

function fetchTasks(){
  $.ajax({
    type: "get",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function(res){
      let data = JSON.parse(res);
     
      total = 0;
      for(let i = 0; i < data.length; i++){
        let task = data[i];
       
        if(task.name == "Gustavo") {
          total += 1;
          displatTask(task);
        }
      }

      $("#headCount").text("You have " + total + " tasks");
    },
    error: function(err){
      console.error("Error retrieving data", err);
    },
  });
}

function clearAllTasks(){
  $.ajax({
    type: "delete",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Gustavo",
    success: function(){
      location.reload();
    },
    error: function (err) {
      console.log("Error clearing tasks", err);
    },
  });
}

function init(){
  console.log("Task Manager page");

  //assign events
  $("#iImportant").click(toggleImportance);
  $("#btnTogglePanel").click(togglePanel);
  $("#btnSave").click(saveTask);
  $("#btnClearAll").click(clearAllTasks);
  
  fetchTasks();
}

window.onload = init;

