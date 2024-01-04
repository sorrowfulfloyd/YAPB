const replaceTurkishChars = (expr) => {
  return {$regex: expr.replace(/[iıİ]/gi, '[ıIiİ]'), $options: 'i'}
}

module.exports = replaceTurkishChars
