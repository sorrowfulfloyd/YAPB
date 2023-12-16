const notFound = async (req, res, next) => {
  res.status(404).json({ message: 'Aradığınız sayfa bulunamadı veya yanlış istek türü..' });
}

module.exports = notFound