import { withInstall } from '@nocturne-ui/utils'
import Tour from './src/tour'
import TourStep from './src/tour-step'

export * from './src/props'

export const NTour = withInstall(Tour)
export const NTourStep = withInstall(TourStep)
export default NTour
