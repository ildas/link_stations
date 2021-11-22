const stations = require('./data/link_stations.json')
const { logger } = require('./logger')

/**
 * calculates distance based on the Pythagorean theorem c=sqrt(a2+b2)
 * @param {Object} linkStation object with x,y, reach and power
 * @param {number[]} location x,y coordinates
 * @returns {Object} linkStation object with x,y, reach and power
 */
function _calculateDistance (linkStation, location) {
  const [x, y] = location
  return Math.sqrt(Math.pow((linkStation.x - x), 2) + Math.pow((linkStation.y - y), 2))
}

/**
 * Returns all the stations within reach
 * @param {Object} location the x and y coordinates of the location
 * @returns {Array} maxPowerStation that yields the largest power for the giver location
 */
const _getAllStationsWithinReach = (location) => {
  const { linkStations } = stations
  return linkStations.filter(linkS => {
    const distance = _calculateDistance(linkS, location)
    if (linkS.reach > distance) {
      linkS.power = Math.pow((linkS.reach - distance), 2)
      return linkS
    }
    return false
  })
}

/**
 * The function takes an array of stations and sorts them using the
 * JS built in mergesort sorting method for arrays. Mergesort is
 * efficient for smaller sets of data. If the number of stations
 * increases substantially we can apply more efficient algorithms like
 * heapsort
 *
 * @param {Object[]} stations linkStation objects
 * @returns {Object[]} sorted linkStation objects
 */
function _getSortedPowerStations (stations) {
  return stations.sort((a, b) => b.power - a.power)
}

/**
 * Returns the power station with the largest power or undefined if there are no power stations within reach
 * of the said location
 * @param {Object} location
 * @returns {Object|undefined}
 */
function getMaxPowerStation (location) {
  logger.info(`searching for stations within reach for location ${location}`)
  const allStationsWithinReach = _getAllStationsWithinReach(location)
  logger.info({ allStationsWithinReach })
  const sortedStations = _getSortedPowerStations(allStationsWithinReach)
  return sortedStations[0]
}

module.exports = {
  getMaxPowerStation
}
