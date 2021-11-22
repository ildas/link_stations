const { getMaxPowerStation } = require('./src/utils')
const { locations } = require('./src/data/locations')
const { logger } = require('./src/logger')

for (const location of locations) {
  const maxPowerStation = getMaxPowerStation(location)
  if (!maxPowerStation) {
    logger.debug(`No link station within reach for location ${location}`)
    continue
  }
  logger.debug(`Best link station for point ${location} is ${maxPowerStation.x},${maxPowerStation.y} with power ${maxPowerStation.power}`)
}
