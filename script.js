var Knowledge = new Array(
"Exhibits a strong knowledge of data storage:::(Sets, Lists, Maps, Hashing)",
"Exhibits a strong knowledge of data transformation:::(Sorting, Filters)",
"Exhibits a basic knowledge of computational complexity:::(Identifies constant vs linear vs exponential growth)",
"Exhibits a basic knowledge of test techniques:::(The burden of test permutations in complex systems)",
);
var Skills = new Array(
"Exhibits strong experience with at least one programming language:::(C: ptr arithmetic, Java: Generics, pass by value)",
"Exhibits basic experience with Unix/Linux operating systems:::(ls, grep, sed)",
"Exhibits basic experience with regular expressions on any of various platforms:::(s/old/new/g)",
"Exhibits a practical understanding of performance optimization in their problem domain:::(parallelization, indexing, hashing, refactoring)",
"Exhibits problem solving best practices:::(decomposition into managable units, inductive judgement, deductive reasoning)",
);

var Talents = new Array(
"Exhibits an intuition for managing expectations:::(self, team, external stakeholders)",
"Exhibits respect for existing processes and maintaining important enterprise systems:::(production support, environment support, sre, dev-ops)",
"Exhibits an eagerness to master new techniques and technologies:::(How do they pursue this goal?)",
"Exhibits personal organization and mental discipline",
"Exhibits an ability to communicate abstract ideas",
"Exhibits a positive attitude",
);

setTimeout(initQuestions);


function initQuestions() {
	$('#aokQuestions').empty();

	var mainDiv = $('<div/>');
	mainDiv.addClass('col-xs-12');

	var p = 0;
	mainDiv.append(getTitle("Knowledge"));
	for (i = 0; i < Knowledge.length; i++, p++) {
		mainDiv.append(getKnowledge(i, p));
	}

	mainDiv.append(getTitle("Skills"));
	for (i = 0; i < Skills.length; i++, p++) {
		mainDiv.append(getSkills(i, p));
	}

	mainDiv.append(getTitle("Talents"));
	for (i = 0; i < Talents.length; i++, p++) {
		mainDiv.append(getTalent(i, p));
	}

	var score = $('<h1/>');
	score.attr('id', 'aok-score');
	mainDiv.append(score);

	$('#aokQuestions').append(mainDiv);
}

function getTitle(title) {
	var out = $('<h1/>');
	out.html(title);
	return out;
}

function getKnowledge(i,p) {
	return getQuestion(p, 'btn-success', Knowledge[i]);
}

function getSkills(i, p) {
	return getQuestion(p, 'btn-info', Skills[i]);
}

function getTalent(i, p) {
	return getQuestion(p, 'btn-warning', Talents[i]);
}

function getScore() {
	var total = Knowledge.length + Skills.length + Talents.length;
	var checks = 0;
	for (i = 0; i < total; i++) {
		if ($('#aok-question-' + i).prop('checked')) checks++;
	}
	return checks/total;
}

function handleClick() {
	var score = (getScore()*100).toFixed(1);
	$('#aok-score').html("Total: "+score+"%");
}

function getQuestion(qNum, qClass, qData) {
	var id = 'aok-question-' + qNum;
	var out = $('<div/>');
	out.addClass('form-group');

	var input = $('<input/>');
	input.attr('id',id);
	input.attr('type','checkbox');
	input.attr('autocomplete','off');
	input.on('click', handleClick);

	var group = $('<div/>');
	group.addClass('btn-group');

	var flag = $('<label/>');
	flag.addClass('btn');
	flag.addClass(qClass);
	flag.attr('for',id);
	var checker = $('<span/>');
	checker.addClass('glyphicon glyphicon-ok');
	var spacer = $('<span/>');
	flag.append(checker);
	flag.append(spacer);

	var question = $('<label/>');
	question.addClass('btn btn-default active');
	question.attr('for',id);
	var text = "";
	if (qData.includes(':::')) {
		var q = qData.split(":::");
		text += q[0];
		text += '<br/><i><font color=#777 size="2em">';
		text += q[1];
		text += '</font></i>';
	} else {
		text = qData;
	}
	question.html(text);

	group.append(flag);
	group.append(question);

	out.append(input);
	out.append(group);
	return out;
}
