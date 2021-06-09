function Fade(){
	document.getElementById("filler").style.display = "block";
	setTimeout(function(){document.getElementById("filler").style.display = "none";},1500);
}
function Echo(value, colour = null){
	if (localStorage.getItem('User-'+user+'-Settings-Textsize: ') == null){
		var textsize = '2vh';
	}
	else{
		var textsize = localStorage.getItem('User-'+user+'-Settings-Textsize: ');
	}
	var echo = document.createElement("p");
	echo.style.fontSize = textsize;
	echo.innerHTML = value;
	if (colour != null){
		echo.style.color = colour;
	}
	document.getElementById('messagebox').appendChild(echo);
}
function go(user,sessionid,place){
	localStorage.setItem("User-"+user+"-SessionId: ",sessionid);
	window.location.replace(place + ".html?"+ user + '/' + sessionid);
}
function CheckLogin(){
	var users = localStorage.getItem("Users: ").split(",");
	var username = document.getElementById('username').value;
	if (users.includes(username)){
		var pass = localStorage.getItem("User-"+username+"-Password: ")
		var enteredpass = document.getElementById('password').value;
		if (pass == enteredpass){
			var sessionid = Math.random();
			localStorage.setItem("User-"+username+"-SessionId: ",sessionid);
			window.location.replace("home.html?"+ username + '/' + sessionid);
		}
		else {
			document.getElementById('sin').style.display = "block";
		}
	}
	else {
		document.getElementById('sin').style.display = "block";
	}
}
function alphaOnly(id,allowcomma = false) {
	var val = document.getElementById(id).value;
	var val = val.split('');
	for (var v in val){
	   if (val[v] == ',' && allowcomma == false){
		   val[v] = '';
	   }
	   if (val[v] == '/' && allowcomma == false){
		   val[v] = '';
	   }
	   if (val[v] == ' ' && allowcomma == false){
		   val[v] = '';
	   }
	   if (val[v] == '*' && allowcomma == false){
		   val[v] = '';
	   }
	   if (val[v] == '|'){
		   val[v] = '';
	   }
	   if (val[v] == '{'){
		   val[v] = '';
	   }
	   if (val[v] == '}'){
		   val[v] = '';
	   }
	   if (val[v] == ';'){
		   val[v] = '';
	   }
   }
   var val = val.join('');
   document.getElementById(id).value = val;
}
function CheckCreate(){
	var users = localStorage.getItem("Users: ").split(",");
	var username = document.getElementById('username').value;
	if (!users.includes(username)){
		var enteredpass = document.getElementById('password').value;
		localStorage.setItem("User-"+username+"-Password: ",enteredpass);
		localStorage.setItem("Users: ",users.toString()+","+username);
		CheckLogin();
	}
	else {
		document.getElementById('sin').style.display = "block";
	}
}
function MessageListener(user){
	if (localStorage.getItem('User-'+user+'-Settings-Textsize: ') == null){
		var textsize = '2vh';
	}
	else{
		var textsize = localStorage.getItem('User-'+user+'-Settings-Textsize: ');
	}
	if (localStorage.getItem('User-'+user+'-Messages: ') == null){
		localStorage.setItem('User-'+user+'-Messages: ','! Welcome '+user+' to Insert-Name-Here');
	}
	document.getElementById('messagebox').innerHTML = '';
	var value = localStorage.getItem('User-'+user+'-Messages: ').split("|");
	for (var val in value){
		if (value[val][0] == '!'){
			Echo(value[val],'yellow');
		}
		else{
			Echo(value[val]);
		}
	}
}
function SendMessage(user){
	message = document.getElementById('message').value;
	recipients = document.getElementById('recipients').value.split(',');
	var sentsuc = ''
	for (rec in recipients){
		if (localStorage.getItem("Users: ").split(",").includes(recipients[rec])){
		var prior = localStorage.getItem('User-'+recipients[rec]+'-Messages: ');
		localStorage.setItem('User-'+recipients[rec]+'-Messages: ',user+": "+message+'|'+prior);
		document.getElementById('message').value = '';
		document.getElementById('recipients').value = '';
			if (sentsuc == ''){
				if (recipients[rec] != ''){
				var sentsuc = recipients[rec];
				}
			}
			else{
				if (recipients[rec] != ''){
				var sentsuc = sentsuc+' and '+recipients[rec];
				}
			}
		}
	}
	var prior = localStorage.getItem('User-'+user+'-Messages: ');
	console.log(sentsuc);
	if (sentsuc != ''){
		localStorage.setItem('User-'+user+'-Messages: ',user+' (to '+sentsuc+"): "+message+'|'+prior)
	}
}
function ChangeFontSize(user){
	var val = ((Number(document.getElementById('fontsize').value)-1)*0.25)+1;
	localStorage.setItem('User-'+user+'-Settings-Textsize: ',val.toString()+"vh")
	document.getElementById('fontsize:eg').setAttribute('style','font-size:'+val.toString()+"vh;");
}
function ChangePass(User){
	document.getElementById('done').style.display = "none";
	var old = document.getElementById('old');
	var newl = document.getElementById('new');
	var con = document.getElementById('con');
	if (old.value == localStorage.getItem("User-"+user+"-Password: ") && newl.value == con.value){
		document.getElementById('sin').style.display = "none";
		document.getElementById('done').style.display = "block";
		localStorage.setItem("User-"+user+"-Password: ", newl.value);
	}
	else{
		document.getElementById('sin').style.display = "block";
	}
}
function Delete(user,logout = true){
	localStorage.removeItem('User-'+user+'-Settings-Textsize: ')
	localStorage.removeItem('User-'+user+'-Password: ')
	localStorage.removeItem('User-'+user+'-Messages: ')
	var users = localStorage.getItem('Users: ').split(",");
	const index = users.indexOf(user);
	if (index > -1) {
		users.splice(index, 1);
	}
	localStorage.setItem("Users: ",users.toString());
	if (logout == true){
		window.location.replace("create.html");
	}
}
function Terminal(user,textsize,echooff=false,command = null,isfunction=false){
	if (localStorage.getItem("AdminPass: ") == null){
		localStorage.setItem("AdminPass: ",'bobross');
	}
	if (sessionStorage.getItem("User-"+user+"-TerminalAccess: ") == '!'){
		if (document.getElementById('message').value == localStorage.getItem("AdminPass: ")){
			sessionStorage.setItem("User-"+user+"-TerminalAccess: ",'+');
			document.getElementById('message').type = 'text';
			document.getElementById('passaccept').style.display = 'block';
			document.getElementById('passdeny').style.display = 'none';
		}
		else {
			document.getElementById('passdeny').style.display = 'block';
		}
	}
	else {
		var returnthis = null;
		if (command == null){
			var command = document.getElementById('message').value;
		}
		if (!echooff){
			Echo("> "+command,'yellow');
		}
		var command = command.split(' ');
		var l = command.length
		/* Deal with multiple commands in one line */
		try {
			var iter = 0
			if (command[0] != 'function'){
				while (command.join(" ").includes("{") && command.join(" ").includes("}")){
					var start = '';
					var skip = 0;
					for (x in command){
					/* if (x != 0) { # Un-needed*/
							if (command[x][0] == '{'){
								if (start == ''){
									var start = x;
								}
								else {
									var skip = skip + 1;
								}
							}
							if (command[x][command[x].length-1] == '}'){
								if (skip == 0){
									var end = x;
								}
								else {
									var skip = skip - 1;
								}
								if (start != ''){
									if (parseInt(start) <= parseInt(end)){
										if (start == end){
											var val = command[start];
										}
										else {
											var val = command.slice(start,parseInt(end)+1);
											var val = val.join(' ');
										}
										var val = val.substring(1,val.length-1);
										command[start] = Terminal(user,textsize,true,val);
										for (y in command){
											if (parseInt(y) > parseInt(start) && parseInt(y) <= parseInt(end)){
												command[y] = '';
											}
										}
										var start = '';
									}
								}
							}
					/* } */
					}
				var command = command.filter(function(x){
					return x !== '';
				});
				iter = iter+1;
				if (iter > 1000){ /* Kill on iteration 101 */
					die
				}
				}
			}
		}
		catch (err) {
			Echo('!! Error in reading {[command]} or reacursion error');
		}
		/* Combine all segments after 3rd segment in command */
		if (l > 3){
			var eh = command.slice(2, l);
			var eh = eh.join(' ');
			command[2] = eh;
			var command = command.splice(0,3);
		}
		/* Commands */
		/* Delete users command (delete [users] # '*' represents all users) */
		if (command[0] == 'delete'){
			try {
				var endfeedback = '';
				var allusers = localStorage.getItem("Users: ").split(",");
				var actors = command[1].split(',');
				for (actor in actors){
					if (allusers.includes(actors[actor])){
						Delete(actors[actor],false);
						if (endfeedback == ''){
							var endfeedback = actors[actor];
						}
						else {
							if (endfeedback != "all"){
								var endfeedback = endfeedback + ',' + actors[actor];
							}
						}
					}
					if (actors[actor] == '*'){
						for (u in allusers){
							Delete(allusers[u],false);
							var endfeedback = 'all';
						}
					}
				}
				if (endfeedback == ''){
					die
				}
				if (!echooff){
					Echo("Deleted "+endfeedback);
				}
			}
			catch(err) {
				if (!echooff){
					Echo("Could not delete user");
				}
			}
		}

		/* Variable control command */
		else if (command[0] == 'var'){
			try {
				/* Sub commands */
				/* Set variable (var [path] set [value]) */
				if (command[2].split(" ")[0] == 'set'){
					try {
						if (command[1] == undefined){
							die
						}
						if (command[2] == undefined){
							die
						}
						var val = command[2].split(" ");
						var val = val.splice(1,val.length);
						var val = val.join(' ');
						localStorage.setItem(command[1]+": ",val)
						if (!echooff){
							Echo("Set variable '"+command[1]+": ' to '"+val+"'");
						}
					}
					catch(err) {
						if (!echooff){
							Echo("Could not set variable");
						}
					}
				}

				/* Set variable (var [path] remove) */
				else if (command[2] == 'remove'){
					if (command[1] == '*'){
						localStorage.clear();
						if (!echooff){
							Echo("Removed all local storage data");
						}
					}
					else{
						localStorage.removeItem(command[1]+': ');
						if (!echooff){
							Echo("Removed '"+command[1]+": ' from local storage");
						}
					}
				}
				
				/* Get */
				else if (command[2] == 'get'){
					try{
						if (!echooff){
							Echo(localStorage.getItem(command[1]+": ").toString());/* To string not neccesary, useful for finding if it is a null value thou */
						}
						var returnthis = localStorage.getItem(command[1]+": ");
					}
					catch(err) {
						if (!echooff){
							Echo('Variable does not exist');
						}
					}
				}
			}
			catch(err) {
				if (!echooff){
					Echo("Error in reading variable command");
				}
			}
		}
		
		/* Change admin password (set_console_password [new_password]) */
		else if (command[0] == 'set_console_password'){
			try {
				if (command[1] == ''){
					die
				}
				if (command[1] == null){
					die
				}
				localStorage.setItem("AdminPass: ",command[1]);
				if (!echooff){
					Echo("Changed console password");
				}
			}
			catch(err) {
				if (!echooff){
					Echo("Error in setting console password");
				}
			}
		}
		
		/* User oriented variable modification */
		else if (command[0] == 'user'){
			try{
				var userlist = localStorage.getItem("Users: ").split(',');
				if (userlist.includes(command[1])){
					if (command[2].split(' ')[0] == 'get'){
						if (command[2].split(' ')[1] == 'password'){
								var returnthis = localStorage.getItem("User-"+command[1]+"-Password: ");
						}
						if (command[2].split(' ')[1] == 'fontsize'){
							var returnthis = localStorage.getItem("User-"+command[1]+"-Settings-Textsize: ");
							if (returnthis == null){
								var returnthis = '2vh';
							}
						}
						if (!echooff){
							Echo(returnthis);
						}
					}
					else if (command[2].split(' ')[0] == 'set'){
						if (command[2].split(' ')[1] == 'password'){
							localStorage.setItem("User-"+command[1]+"-Password: ",command[2].split(' ')[2]);
							Echo('Changed user '+command[1]+"'s password")
						}
						if (command[2].split(' ')[1] == 'fontsize'){
							localStorage.setItem("User-"+command[1]+"-Settings-Textsize: ",command[2].split(' ')[2]);
							Echo('Changed user '+command[1]+"'s fontsize to "+command[2].split(' ')[2])
						}
					}
				}
				else{
					die
				}
			}
			catch(err){
				if (!echooff){
					Echo('Could not access user data');
				}
			}
		}
		
		/* Userlist, returns list of users */
		else if (command[0] == 'userlist'){
			var returnthis = localStorage.getItem("Users: ");
			if (!echooff){
				Echo(returnthis);
			}
		}
		
		/* Maths opperators (op [equation]) */
		else if (command[0] == 'op'){
			var equ = command.slice(1).join(' ');
			try{
				var returnthis = eval(equ);
			}
			catch (err) {
				if (!echooff){
					Echo("Invalid equation");
				}
			}
			if (!echooff){
				Echo(returnthis);
			}
		}
		
		/* Equivelent of print in python */
		else if (command[0] == 'echo'){
			Echo(command[2],command[1]);
		}
		
		/* If conditional statement */
		else if (command[0] == 'if'){
			if (command[1] == true){
				Terminal(user,textsize,true,command[2],isfunction);
			}
		}
		
		/* Function stuff */
		else if (command[0] == 'function') {
			localStorage.setItem('function-'+command[1]+": ",command[2]);
			if (!echooff){
				Echo("Set function '"+command[1]+"' to '"+command[2]+"'");
			}
		}
		else if (command[0] == 'call'){
			try{
				var list_of_commands = localStorage.getItem('function-'+command[1]+": ").split(';;');
				for (c in list_of_commands){
					Terminal(user,textsize,true,list_of_commands[c],true);
					if (localStorage.getItem('return') != null){
						var returnthis = localStorage.getItem('return');
					}
					localStorage.removeItem('return');
				}
			}
			catch(err){
				if (!echooff){
					Echo("Could not run function");
				}
			}
		}
		
		/* Return */
		else if (command[0] == 'return'){
			if (isfunction == true){
				if (command[2] == undefined){
					localStorage.setItem('return',command[1]);
				}
				else{
					localStorage.setItem('return',command[1]+' '+command[2]);
				}
			}
			else {
				Echo("Return command only usable in function");
			}
		}
		
		else if (command[0] == 'sendmessage'){
			try{
				var actors = command[1].split(',');
				var users = localStorage.getItem('Users: ').split(',');
				if (command[1] == undefined || command[2] == undefined){
					die
				}
				if (command[1][0] == '*'){
					for (u in users){
						if (users[u] != ''){
							localStorage.setItem('User-'+users[u]+'-Messages: ',command[2]+"|"+localStorage.getItem('User-'+users[u]+'-Messages: '));
						}
					}
					if (!echooff){
						Echo('Sent message "'+command[2]+'" to all users');
					}
				}
				else{
					var return_string = '';
					for (a in actors){
						if (users.includes(actors[a])){
							localStorage.setItem('User-'+actors[a]+'-Messages: ',command[2]+"|"+localStorage.getItem('User-'+actors[a]+'-Messages: '));
							if (return_string == ''){
								var return_string = actors[a];
							}
							else{
								var return_string = return_string+','+actors[a];
							}
						}
					}
					if (return_string == ''){
						die
					}
					if (!echooff){
						Echo('Sent message "'+command[2]+'" to '+return_string);
					}
				}
			}
			catch(err){
				if (!echooff){
					Echo("Could not send message");
				}
			}
		}
		/* Help command (help) */
		else if (command[0] == 'help' && !echooff){
			Echo("Welcome to 'More Diseased Then Javascript ver 1.0.0'",'gold');
			Echo("Special Characters:",'white');
			Echo("++ * - all (only works in delete commands or sendmessage currently)");
			Echo("++ | - indicates new message when used in variable 'User-[user]-Messages' or in sendmessage command");
			Echo("++ ! - indicates anouncement message when used in variable 'User-[user]-Messages' or in sendmessage command");
			Echo("++ {[command]} - used to insert command into other command (must always have spaces next to brackets(unless other brackets when using commands like '{{test}}' but like '{op {number} * {number1} }' in other commands))), eg. var {var get test} set {var get test2} - sets variable with the name of the value of test to the value of test2");
			Echo("Commands:",'white');
			Echo("++ command name - information - usage");
			Echo("++ help - Shows command help info - help");
			Echo("++ sendmessage - sends a message to a list of users (separated by ','), can also be used for announcements to all users by using '*' and starting the message with a '!' - sendmessage [list_of_users] [message]");
			Echo("++ set_console_password - Changes the console password (a simplified way without the var command) - set_console_password [new_password]");
			Echo("++ var - Variable management command (variable names cannot contain spaces) - var [variable_name] [remove or get or set] [variable_new_value(only for set command)]");
			Echo("++ delete - Delete users - delete [[list of user separated by ','] or *]");
			Echo("++ userlist - Returns list of users - userlist");
			Echo("++ op - Returns output of js line (suggested use is for maths operations, js line cannot contain {}) - op [equation]");
			Echo("++ user - User oriented variable modification - user [user] [set or get] [password or fontsize] [value(only for set)]");
			Echo("++ echo - Prints value - echo [colour] [value]");
			Echo("++ if - Conditional statement - if {[op command conditional statement]} [command to run if true]");
			Echo("++ function - Define function - function [function name] [value]");
			Echo("++ call - Call function - call [function name]");
			Echo("++ return - Returns a value (only usable within a function) - return [value]");
		}
		
		/* If it isn't command treat like var [variable] get */
		else{
			try{
				if (!echooff){
					Echo(localStorage.getItem(command[0]+": ").toString());/* To string not neccesary, useful for finding if it is a null value thou */
				}
				var returnthis = localStorage.getItem(command[0]+": ");
			}
			catch(err) {
				if (!echooff){
					Echo('Variable does not exist');
				}
			}
		}
	}
	/* Clears message box, scrolls to bottom of console (quality of life improvements) */
	
	document.getElementById('message').value = '';
	var elem = document.getElementById('messagebox');
	elem.scrollTop = elem.scrollHeight;
	
	/* Returns value (really only usefull for 'smth smth get' commands or 'op' or 'userlist' */
	return returnthis;
}