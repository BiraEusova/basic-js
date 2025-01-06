const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats( domains ) {
  if (!Array.isArray(domains) || domains.length === 0) {
    return {};
  }

  const dnsStats = {};

  for (const domain of domains) {
    const parts = domain.split('.').reverse();


    for (let i = 0; i < parts.length; i++) {
      const currentDNS = '.' + parts.slice(0, i + 1).join('.');
      dnsStats[currentDNS] = (dnsStats[currentDNS] || 0) + 1;
    }
  }

  return dnsStats;
}

module.exports = {
  getDNSStats
};
