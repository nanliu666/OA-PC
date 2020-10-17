import { regionData } from 'element-china-area-data'
import _ from 'lodash'

const REGION_DATA = _.map(_.cloneDeep(regionData), (region) => {
  if (_.get(_.head(region.children), 'label') === '市辖区') {
    region.children = _.concat(...region.children.map((child) => child.children))
  }
  return region
})

export default REGION_DATA
