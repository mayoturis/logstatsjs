function LogstatsLogger(webUrl, projectToken) {
	this.webUrl = webUrl;
	this.projectToken = projectToken;

	this.Levels = {
		DEBUG : "debug",
		INFO : "info",
		NOTICE : "notice",
		WARNING : "warning",
		ERROR : "error",
		CRITICAL : "critical",
		ALERT : "alert",
		EMERGENCY : "emergency"
	}
}

/**
 * Detailed debug information.
 *
 * @param string message
 * @param object  context
 */
LogstatsLogger.prototype.debug = function(message, context) {
	this.log(this.Levels.DEBUG, message, context);
}

/**
 * Interesting events.
 *
 * Example: User logs in, SQL logs.
 *
 * @param string message
 * @param object  context
 */
LogstatsLogger.prototype.info = function(message, context) {
	this.log(this.Levels.INFO, message, context);
}

/**
 * Normal but significant events.
 *
 * @param string message
 * @param object  context
 */
LogstatsLogger.prototype.notice = function(message, context) {
	this.log(this.Levels.NOTICE, message, context);
}


/**
 * Exceptional occurrences that are not errors.
 *
 * Example: Use of deprecated APIs, poor use of an API, undesirable things
 * that are not necessarily wrong.
 *
 * @param string message
 * @param object  context
 */
LogstatsLogger.prototype.warning = function(message, context) {
	this.log(this.Levels.WARNING, message, context);
}

/**
 * Runtime errors that do not require immediate action but should typically
 * be logged and monitored.
 *
 * @param string message
 * @param object  context
 */
LogstatsLogger.prototype.error = function(message, context) {
	this.log(this.Levels.ERROR, message, context);
}


/**
 * Critical conditions.
 *
 * Example: Application component unavailable, unexpected exception.
 *
 * @param string message
 * @param object  context
 */
LogstatsLogger.prototype.critical = function(message, context) {
	this.log(this.Levels.CRITICAL, message, context);
}

/**
 * Action must be taken immediately.
 *
 * Example: Entire website down, database unavailable, etc. This should
 * trigger the SMS alerts and wake you up.
 *
 * @param string message
 * @param object  context
 */
LogstatsLogger.prototype.alert = function(message, context) {
	this.log(this.Levels.ALERT, message, context);
}

/**
 * System is unusable.
 *
 * @param string message
 * @param object  context
 */
LogstatsLogger.prototype.emergency = function(message, context) {
	this.log(this.Levels.EMERGENCY, message, context);
}

LogstatsLogger.prototype.log = function(level, message, context) {
	var record = this.createRecord(level, message, context);
	this.send(record);
}

LogstatsLogger.prototype.send = function(record) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", this.webUrl, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send('project='+this.projectToken+'&messages='+JSON.stringify([record]));
}

LogstatsLogger.prototype.createRecord = function(level, message, context) {
	return {
		level : level,
		message : message,
		context : context,
		time : Math.floor(Date.now() / 1000)
	}
}

