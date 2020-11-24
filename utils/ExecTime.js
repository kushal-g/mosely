module.exports = class ExecTime {
	_startTime = 0;
	_endTime = 0;
  
	constructor() {
	  this._startTime = 0;
	  this._endTime = 0;
	}
  
	start = () => {
	  this._startTime = Date.now();
	  this._endTime = 0;
	};
  
	end = () => {
	  this._endTime = Date.now();
	};
  
	format = () => {
	  if (this._endTime < this._startTime) {
		throw new Error("Stop time before getting time");
	  }
	  let milliseconds = this._endTime - this._startTime;
	  var day, hour, minute, seconds;
	  seconds = Math.floor(milliseconds / 1000);
	  milliseconds = milliseconds % 1000;
	  minute = Math.floor(seconds / 60);
	  seconds = seconds % 60;
	  hour = Math.floor(minute / 60);
	  minute = minute % 60;
	  day = Math.floor(hour / 24);
	  hour = hour % 24;
	  return {
		day,
		hour,
		minute,
		seconds,
		milliseconds,
	  };
	};
  
	getMs = () => {
	  if (this._endTime < this._startTime) {
		throw new Error("Stop time before getting time");
	  }
  
	  return this._endTime - this._startTime;
	};
  };