import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { logAudit } from "../../utils/logAudit";
import "./settings.css";

const DEFAULT_SETTINGS = {
  notifications: {
    emailAlerts: true,
    contractExpiryAlerts: true,
    paymentReminders: true,
    tributeSubmissions: true,
    systemUpdates: true,
    expiryAlertDays: "30",
  },
  config: {
    siteName: "Cherubim of Heaven Memorial Park",
    contactEmail: "admin@cherubim.ph",
    contactPhone: "(000) 000-0000",
    address: "Hagonoy, Bulacan, Philippines",
    timezone: "Asia/Manila",
    currency: "PHP",
  },
  security: {
    autoBackup: true,
    backupFrequency: "Daily",
  },
};

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`st-toggle ${checked ? "st-toggle--on" : ""}`}
      onClick={onChange}
    >
      <span className="st-toggle-knob" />
    </button>
  );
}

function Settings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, "settings", "system"));
        if (snap.exists()) {
          setSettings((prev) => ({ ...prev, ...snap.data() }));
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const updateNotif = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));
  };

  const updateConfig = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      config: { ...prev.config, [key]: value },
    }));
  };

  const updateSecurity = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, [key]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "system"), settings);
      await logAudit({
        user: auth.currentUser?.email || "Admin",
        role: "Admin",
        action: "Updated system settings",
        target: "—",
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="st-page">
        <div className="st-topbar">
          <span>Cherubim of Heaven Memorial Park</span>
        </div>
        <div className="st-header">
          <div>
            <h1>System Settings</h1>
            <p>Configure system preferences</p>
          </div>
        </div>
        <p className="st-loading">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="st-page">
      <div className="st-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>
      <div className="st-header">
        <div>
          <h1>System Settings</h1>
          <p>Configure system preferences</p>
        </div>
        <button className="st-save-btn" onClick={handleSave} disabled={saving}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Notification Settings */}
      <div className="st-card">
        <div className="st-card-heading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span>Notification Settings</span>
        </div>

        <div className="st-row">
          <div>
            <p className="st-row-label">Email Alerts</p>
            <p className="st-row-sub">Send email notifications to users</p>
          </div>
          <ToggleSwitch
            checked={settings.notifications.emailAlerts}
            onChange={() => updateNotif("emailAlerts", !settings.notifications.emailAlerts)}
          />
        </div>

        <div className="st-row">
          <div>
            <p className="st-row-label">Contract Expiry Alerts</p>
            <p className="st-row-sub">Notify families about expiring lease contracts</p>
          </div>
          <ToggleSwitch
            checked={settings.notifications.contractExpiryAlerts}
            onChange={() => updateNotif("contractExpiryAlerts", !settings.notifications.contractExpiryAlerts)}
          />
        </div>

        <div className="st-row">
          <div>
            <p className="st-row-label">Payment Reminders</p>
            <p className="st-row-sub">Send reminders for overdue installments</p>
          </div>
          <ToggleSwitch
            checked={settings.notifications.paymentReminders}
            onChange={() => updateNotif("paymentReminders", !settings.notifications.paymentReminders)}
          />
        </div>

        <div className="st-row">
          <div>
            <p className="st-row-label">Tribute Submissions</p>
            <p className="st-row-sub">Notify admin of new tribute submissions</p>
          </div>
          <ToggleSwitch
            checked={settings.notifications.tributeSubmissions}
            onChange={() => updateNotif("tributeSubmissions", !settings.notifications.tributeSubmissions)}
          />
        </div>

        <div className="st-row">
          <div>
            <p className="st-row-label">System Updates</p>
            <p className="st-row-sub">Notify admin of system updates and maintenance</p>
          </div>
          <ToggleSwitch
            checked={settings.notifications.systemUpdates}
            onChange={() => updateNotif("systemUpdates", !settings.notifications.systemUpdates)}
          />
        </div>

        <div className="st-row st-row--input">
          <div>
            <p className="st-row-label">Expiry Alert Days</p>
            <p className="st-row-sub">Days before contract expiry to send alert</p>
          </div>
          <input
            type="number"
            className="st-small-input"
            value={settings.notifications.expiryAlertDays}
            onChange={(e) => updateNotif("expiryAlertDays", e.target.value)}
          />
        </div>
      </div>

      {/* System Configuration */}
      <div className="st-card">
        <div className="st-card-heading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>System Configuration</span>
        </div>

        <div className="st-form-grid">
          <div className="st-field">
            <label className="st-label">Site Name</label>
            <input
              type="text"
              className="st-input"
              value={settings.config.siteName}
              onChange={(e) => updateConfig("siteName", e.target.value)}
            />
          </div>
          <div className="st-field">
            <label className="st-label">Contact Email</label>
            <input
              type="email"
              className="st-input"
              value={settings.config.contactEmail}
              onChange={(e) => updateConfig("contactEmail", e.target.value)}
            />
          </div>
          <div className="st-field">
            <label className="st-label">Contact Phone</label>
            <input
              type="text"
              className="st-input"
              value={settings.config.contactPhone}
              onChange={(e) => updateConfig("contactPhone", e.target.value)}
            />
          </div>
          <div className="st-field">
            <label className="st-label">Address</label>
            <input
              type="text"
              className="st-input"
              value={settings.config.address}
              onChange={(e) => updateConfig("address", e.target.value)}
            />
          </div>
          <div className="st-field">
            <label className="st-label">Timezone</label>
            <select
              className="st-input"
              value={settings.config.timezone}
              onChange={(e) => updateConfig("timezone", e.target.value)}
            >
              <option value="Asia/Manila">Asia/Manila (GMT+8)</option>
              <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div className="st-field">
            <label className="st-label">Currency</label>
            <select
              className="st-input"
              value={settings.config.currency}
              onChange={(e) => updateConfig("currency", e.target.value)}
            >
              <option value="PHP">PHP (₱)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="st-card">
        <div className="st-card-heading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Security</span>
        </div>

        <div className="st-row">
          <div>
            <p className="st-row-label">Auto Backup</p>
            <p className="st-row-sub">Automatically backup system data</p>
          </div>
          <ToggleSwitch
            checked={settings.security.autoBackup}
            onChange={() => updateSecurity("autoBackup", !settings.security.autoBackup)}
          />
        </div>

        <div className="st-row st-row--input">
          <div>
            <p className="st-row-label">Backup Frequency</p>
            <p className="st-row-sub">How often to create system backups</p>
          </div>
          <select
            className="st-small-input"
            value={settings.security.backupFrequency}
            onChange={(e) => updateSecurity("backupFrequency", e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Settings;