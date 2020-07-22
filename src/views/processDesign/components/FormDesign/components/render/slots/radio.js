export default function(h, conf) {
  const list = []
  conf.__slot__.options.forEach((item) => {
    if (conf.__pc__.tag === 'el-select') {
      list.push(
        <el-option label={item.label} value={item.value} disabled={item.disabled}></el-option>
      )
    } else if (conf.__config__.optionType === 'button') {
      list.push(<el-radio-button label={item.value}>{item.label}</el-radio-button>)
    } else {
      list.push(
        <el-radio label={item.value} border={conf.border}>
          {item.label}
        </el-radio>
      )
    }
  })
  return list
}
