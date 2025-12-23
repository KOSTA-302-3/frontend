import "./SettingItem.css";

function SettingToggle({ title, desc, checked, onChange }) {
  return (
    <div className="setting-item toggle">
      <div>
        <div className="setting-title">{title}</div>
        {desc && <div className="setting-desc">{desc}</div>}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
}

export default SettingToggle;
