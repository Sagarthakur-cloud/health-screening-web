export default function InputRow({
  icon: Icon,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  type = 'text',
  placeholder,
  inputMode,
  focused,
  fieldName,
}) {
  const isFocused = focused === fieldName;

  return (
    <div style={{ marginBottom: 12 }}>
      <label className="label">{label}</label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 16,
          border: `2px solid ${isFocused ? '#2563eb' : '#e2e8f0'}`,
          background: 'white',
          transition: 'all 0.2s ease',
          boxShadow: isFocused ? '0 0 0 4px rgba(37,99,235,0.1)' : 'none',
        }}
      >
        <div style={{ paddingLeft: 14, paddingRight: 10, color: '#94a3b8', display: 'flex' }}>
          <Icon size={18} strokeWidth={2.2} />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          inputMode={inputMode}
          style={{
            flex: 1,
            padding: '13px 14px 13px 0',
            border: 'none',
            outline: 'none',
            fontSize: 15,
            fontWeight: 600,
            fontFamily: 'inherit',
            background: 'transparent',
            minWidth: 0,
            color: '#0f172a',
          }}
        />
      </div>
    </div>
  );
}