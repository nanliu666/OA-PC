/**
 * @file 省份关系映射
 * @description 联系 provinceCode,provinceFileName
 */

import { get } from 'axios'

// 使用的地图版本
const MAP_VERSION = '4.8.0'

/**
 * @type {Array<{provinceCode: string, provinceFileName: string, provinceName: RegExp}>}
 */
export const PROVINCE_MAPPINGS = [
  { provinceCode: 'anhui.json', provinceFileName: 'province/anhui.json', provinceName: /安徽/ },
  { provinceCode: 'aomen.json', provinceFileName: 'province/aomen.json', provinceName: /澳门/ },
  { provinceCode: 'beijing.json', provinceFileName: 'province/beijing.json', provinceName: /北京/ },
  {
    provinceCode: 'chongqing.json',
    provinceFileName: 'province/chongqing.json',
    provinceName: /重庆/
  },
  { provinceCode: 'fujian.json', provinceFileName: 'province/fujian.json', provinceName: /福建/ },
  { provinceCode: 'gansu.json', provinceFileName: 'province/gansu.json', provinceName: /甘肃/ },
  {
    provinceCode: 'guangdong.json',
    provinceFileName: 'province/guangdong.json',
    provinceName: /广东/
  },
  {
    provinceCode: 'guangxi.json',
    provinceFileName: 'province/guangxi.json',
    provinceName: /广西/
  },
  {
    provinceCode: 'guizhou.json',
    provinceFileName: 'province/guizhou.json',
    provinceName: /贵州/
  },
  {
    provinceCode: 'hainan.json',
    provinceFileName: 'province/hainan.json',
    provinceName: /海南/
  },
  { provinceCode: 'hebei.json', provinceFileName: 'province/hebei.json', provinceName: /河北/ },
  {
    provinceCode: 'heilongjiang.json',
    provinceFileName: 'province/heilongjiang.json',
    provinceName: /黑龙江/
  },
  { provinceCode: 'henan.json', provinceFileName: 'province/henan.json', provinceName: /河南/ },
  { provinceCode: 'hubei.json', provinceFileName: 'province/hubei.json', provinceName: /湖北/ },
  { provinceCode: 'hunan.json', provinceFileName: 'province/hunan.json', provinceName: /湖南/ },
  {
    provinceCode: 'jiangsu.json',
    provinceFileName: 'province/jiangsu.json',
    provinceName: /江苏/
  },
  {
    provinceCode: 'jiangxi.json',
    provinceFileName: 'province/jiangxi.json',
    provinceName: /江西/
  },
  { provinceCode: 'jilin.json', provinceFileName: 'province/jilin.json', provinceName: /吉林/ },
  {
    provinceCode: 'liaoning.json',
    provinceFileName: 'province/liaoning.json',
    provinceName: /辽宁/
  },
  {
    provinceCode: 'neimenggu.json',
    provinceFileName: 'province/neimenggu.json',
    provinceName: /内蒙古/
  },
  { provinceCode: 'ningxia.json', provinceFileName: 'province/ningxia.json', provinceName: /宁夏/ },
  { provinceCode: 'qinghai.json', provinceFileName: 'province/qinghai.json', provinceName: /青海/ },
  {
    provinceCode: 'shandong.json',
    provinceFileName: 'province/shandong.json',
    provinceName: /山东/
  },
  {
    provinceCode: 'shanghai.json',
    provinceFileName: 'province/shanghai.json',
    provinceName: /上海/
  },
  {
    provinceCode: 'shanxi.json',
    provinceFileName: 'province/shanxi.json',
    provinceName: /山西/
  },
  {
    provinceCode: 'shanxi1.json',
    provinceFileName: 'province/shanxi1.json',
    provinceName: /陕西/
  },
  {
    provinceCode: 'sichuan.json',
    provinceFileName: 'province/sichuan.json',
    provinceName: /四川/
  },
  { provinceCode: 'taiwan.json', provinceFileName: 'province/taiwan.json', provinceName: /台湾/ },
  { provinceCode: 'tianjin.json', provinceFileName: 'province/tianjin.json', provinceName: /天津/ },
  {
    provinceCode: 'xianggang.json',
    provinceFileName: 'province/xianggang.json',
    provinceName: /香港/
  },
  {
    provinceCode: 'xinjiang.json',
    provinceFileName: 'province/xinjiang.json',
    provinceName: /新疆/
  },
  { provinceCode: 'xizang.json', provinceFileName: 'province/xizang.json', provinceName: /西藏/ },
  { provinceCode: 'yunnan.json', provinceFileName: 'province/yunnan.json', provinceName: /云南/ },
  {
    provinceCode: 'zhejiang.json',
    provinceFileName: 'province/zhejiang.json',
    provinceName: /浙江/
  },
  { provinceCode: 'china.json', provinceFileName: 'china.json', provinceName: /中国/ },
  {
    provinceCode: 'china-cities.json',
    provinceFileName: 'china-cities.json',
    provinceName: /中国-城市/
  },
  {
    provinceCode: 'china-contour.json',
    provinceFileName: 'china-contour.json',
    provinceName: /中国-等高线/
  },
  { provinceCode: 'world.json', provinceFileName: 'world.json', provinceName: /世界/ }
]

export const getProvinceByName = (name) =>
  _.find(PROVINCE_MAPPINGS, ({ provinceName }) => provinceName.test(name))

// 缓存,加快重复的访问速度
const MAP_DATA_CHACHE = {}
export const getProvinceDataByName = async (name) => {
  if (MAP_DATA_CHACHE[name]) {
    return MAP_DATA_CHACHE[name]
  } else {
    const { provinceFileName } = getProvinceByName(name)
    const data = (await get(`/maps@${MAP_VERSION}/${provinceFileName}`)).data
    return (MAP_DATA_CHACHE[name] = data)
  }
}
