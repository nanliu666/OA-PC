export default function(h, config) {
  return (
    <div class="drawing-item-wrap__mobile vertical">
      <div class={`drawing-item-label ${config.__config__.required ? 'required' : ''}`}>
        {config.__config__.label}
      </div>
      <div class="drawing-uploader">
        <i class="el-icon-plus drawing-uploader-icon" />
      </div>
    </div>
  )
}
