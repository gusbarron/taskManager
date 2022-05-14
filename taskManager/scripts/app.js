
const iconImportant ="iImportant fas fa-star";
const iconNonImportant ="iImportant far fa-star";
var important = false;
var panelVisible = true;

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
    panelVisible=false;
  }
  else{
    $("#form").show();
    panelVisible = true;
  }
}

function saveTask(){
  let title = $("#txtTitle").val();
  let description = $("#txtDesc").val();
  let dueDate = $("#selDat").val();
  let location = $("#txtLocation").val();
  let invites = $("#txtInvites").val();
  let color = $("#selColor").val();
  let frequency = $("#selFrequency").val();
  let status = $("#selStatus").val();

  let task = new Task(important, title, description, dueDate, location, invites, color, frequency, status);
  console.log(task);
  displayTask(task);
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

function getFrequencyText(val){
  switch(val){
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
  <i class="iImportant far fa-star"></i>
  </div>

  <div class="info-1>
    <h5>${task.title}</h5>
    <p>${task.description}</p>
  </div>

  <div class="info-2>
    <label>${task.dueDate}</label>
    <label>${task.location}</label>
  </div>

  <div class="info-3>
    <p>${task.invites}</p>
  </div>

  <div class="info-4>
    <label>${getStatusText(task.status)}</label>
    <label>${getFrequencyText(task.frequency)}</label>
  </div>


  </div>`;


  $("#tasks").append(syntax);
}

function init(){
  console.log("Task Manager page");

  //assign events
  $("#iImportant").click(toggleImportance);
  $("#btnTogglePanel").click(togglePanel);
  $("#btnSave").click(saveTask);

}

window.onload = init;