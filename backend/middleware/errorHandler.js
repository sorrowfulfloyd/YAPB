const errorHandler = (err, req, res, next) => {
	if (err.name === "ValidationError" || err.name === "CastError") {
		return res
			.status(403)
			.json({ message: "Bir şeyler ters gitti!", error: err.message });
	}

	console.log(`-----\n#HATA# - ${err.message} \n-----\n`);
	return res.status(500).json({ message: "Bir şeyler ters gitti!" });
};

module.exports = errorHandler;
