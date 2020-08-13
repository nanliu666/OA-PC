export default function(h, config) {
  return (
    <div>
      <div class="drawing-item-wrap__mobile">
        <div class={`drawing-item-label ${config.__config__.required ? 'required' : ''}`}>
          {config.__mobile__.props.startLabel}
        </div>
        <div class="right-wrap">
          <div class="drawing-item-placeholder">{config.__mobile__.props.placeholder}</div>
          <i class="icon-arrow-right-outlined"></i>
        </div>
      </div>
      <div class="drawing-item-wrap__mobile">
        <div class={`drawing-item-label ${config.__config__.required ? 'required' : ''}`}>
          {config.__mobile__.props.endLabel}
        </div>
        <div class="right-wrap">
          <div class="drawing-item-placeholder">{config.__mobile__.props.placeholder}</div>
          <i class="icon-arrow-right-outlined"></i>
        </div>
      </div>
      {config.__mobile__.props.autoCalc ? (
        <div class="drawing-item-wrap__mobile">
          <div class={`drawing-item-label`}>自动计算时长（天）</div>
        </div>
      ) : null}
    </div>
  )
}
