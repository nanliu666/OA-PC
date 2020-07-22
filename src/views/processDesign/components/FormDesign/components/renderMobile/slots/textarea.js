export default function(h, config) {
  return (
    <div class="drawing-item-wrap__mobile vertical">
      <div class={`drawing-item-label ${config.__config__.required ? 'required' : ''}`}>
        {config.__config__.label}
      </div>
      <div class="drawing-item-placeholder" style="padding:4px 0 18px 0;">
        {config.placeholder}
      </div>
    </div>
  )
}
