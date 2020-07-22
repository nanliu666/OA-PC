export default function(h, config) {
  return (
    <div class="drawing-item-wrap__mobile">
      <div class={`drawing-item-label ${config.__config__.required ? 'required' : ''}`}>
        {config.__config__.label}
      </div>
      <div class="right-wrap">
        <div class="drawing-item-placeholder">{config.placeholder}</div>
        <i class="icon-arrow-right-outlined"></i>
      </div>
    </div>
  )
}
