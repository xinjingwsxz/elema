
//数据类型精确判断
function type(obj) {
	var ret = typeof(obj);
	if (ret != 'object') {
		return ret;
	} else if (obj === null) {
		return "null";
	}
	var str = Object.prototype.toString.call(obj);
	return str.substr(8, str.length - 9);
}
