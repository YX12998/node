function checeklogin(req) {
	var sess = req.session;
	if (!sess.userName) {
		return false;
	} else {
		return true;
	}
}
exports.checeklogin = checeklogin;