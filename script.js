//Jon Christie's WorkDay Planner
$(function() {});

// Current hour and day variables
var now = moment().format("H A");
var today = moment().format("dddd, MMMM Do");

// Day Planner variable. Note time sticks to "H A" format from line 6
var planDay = [
	{ time: "9 AM", event: "" },
	{ time: "10 AM", event: "" },
	{ time: "11 AM", event: "" },
	{ time: "12 PM", event: "" },
	{ time: "1 PM", event: "" },
	{ time: "2 PM", event: "" },
	{ time: "3 PM", event: "" },
	{ time: "4 PM", event: "" },
	{ time: "5 PM", event: "" }
];

// Checking local storage for previous saved entries (following line of code) and retrieve them (next 2 lines of code)
var checkPrevious = JSON.parse(localStorage.getItem("dayPlanner"));
if (checkPrevious !== null) {
	planDay = checkPrevious;
}

// Header with current day
$("#currentDay").text(today);

//Now the WorkDay Planner
// Color coded rows for each timeblock
planDay.forEach(function(timeBlock, index) {
	// variable for • the time block label • the color of the text area • the user entry row including label, user event, and save button
	var timeLabel = timeBlock.time;
	var blockColor = colorMe(timeLabel);
	var block =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm-2 col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		' description">' +
		timeBlock.event +
		'</textarea><div class="col-sm-2 col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="far fa-save"></i></button></div></div></div>';

	// SHOW PLANNER (timeblocks)
	$(".container").append(block);
});

// Color coding function "colorMe" with variables to compare with real time, then "if" statement block (lines 55-61)
function colorMe(time) {
	var testNow = moment(now, "H A");
	var testBlock = moment(time, "H A");
	if (testNow.isBefore(testBlock) === true) {
		return "future";
	} else if (testNow.isAfter(testBlock) === true) {
		return "past";
	} else {
		return "present";
	}
}

// User Entries
// when save button is clicked by User, timeblock is targeted and varaible "userEntry" created to store user entry. 
$(".saveBtn").on("click", function(event) {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);

	//User event saved in target index and updated to local storage
	planDay[blockID].event = userEntry;
	localStorage.setItem("dayPlanner", JSON.stringify(planDay));
});
