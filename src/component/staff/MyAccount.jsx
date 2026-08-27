import React, { useState } from "react";
import "./staff-shared.css";

export default function MyAccount() {
  const [form, setForm] = useState({
    fullName: "Juan Dela Cruz",
    email: "staff@cherubim.ph",
    phone: "0918-234-5678",
    address: "Hagonoy, Bulacan",
    employeeId: "EMP-0042",
    department: "Operations",
    position: "Cemetery Staff",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3500);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    showToast("Profile details updated successfully!", "success");
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      showToast("New passwords do not match!", "error");
      return;
    }
    showToast("Password updated successfully!", "success");
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  const inputStyle = {
    width: '100%', padding: '0.6rem 1rem', border: '1px solid #dce3ec', 
    borderRadius: '8px', fontSize: '0.9rem', color: '#1a3d5c', 
    background: '#f8fafc', marginBottom: '1rem', transition: '0.3s'
  };

  const labelStyle = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600, 
    color: '#1a3d5c', marginBottom: '0.4rem'
  };

  return (
    <div className="reports-page-wrapper">
        <div className="topbar">
            <div className="topbar-left">
                <h1>My Account <span>{"\u2726"}</span></h1>
                <div className="greeting">Manage your personal profile and security settings</div>
            </div>
            <div className="topbar-right">
                <div className="date-badge"><i className="fas fa-calendar-alt"></i> August 2026</div>
                <button className="notification-btn"><i className="fas fa-bell"></i><span className="dot"></span></button>
            </div>
        </div>

        <div style={{display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start'}}>
            {/* Left Column: Profile Avatar & Basic Info */}
            <div className="reports-container" style={{flex: '1 1 300px', textAlign: 'center'}}>
                <div style={{
                    width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37, #b8942e)', 
                    margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontSize: '2.5rem', fontWeight: 700, color: '#fff'
                }}>
                    JD
                </div>
                <h3 style={{margin: '0 0 0.2rem', color: '#1a3d5c', fontSize: '1.2rem'}}>{form.fullName}</h3>
                <p style={{margin: '0 0 1.5rem', color: '#6a8aaa', fontSize: '0.9rem'}}>{form.position}</p>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '10px', textAlign: 'left', marginBottom: '1.5rem'}}>
                    <div style={{marginBottom: '0.8rem'}}>
                        <span style={{fontSize: '0.7rem', color: '#8aaccc', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Employee ID</span>
                        <div style={{fontWeight: 600, color: '#1a3d5c'}}>{form.employeeId}</div>
                    </div>
                    <div>
                        <span style={{fontSize: '0.7rem', color: '#8aaccc', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Department</span>
                        <div style={{fontWeight: 600, color: '#1a3d5c'}}>{form.department}</div>
                    </div>
                </div>
                <button className="btn-secondary" style={{width: '100%', justifyContent: 'center'}}><i className="fas fa-camera"></i> Change Photo</button>
            </div>

            {/* Right Column: Forms */}
            <div style={{flex: '2 1 600px', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                
                {/* Profile Form */}
                <div className="reports-container">
                    <div className="reports-header" style={{borderBottom: '1px solid #e8edf4', paddingBottom: '1rem', marginBottom: '1.5rem'}}>
                        <h2 style={{fontSize: '1.2rem', color: '#1a3d5c', margin: 0}}><i className="fas fa-user-edit" style={{color: '#d4af37', marginRight: '8px'}}></i> Edit Profile</h2>
                    </div>
                    <form onSubmit={handleProfileSave}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 1.5rem'}}>
                            <div>
                                <label style={labelStyle}>Full Name</label>
                                <input style={inputStyle} type="text" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Email Address</label>
                                <input style={inputStyle} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Phone Number</label>
                                <input style={inputStyle} type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Home Address</label>
                                <input style={inputStyle} type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
                            <button type="submit" className="btn-primary"><i className="fas fa-save"></i> Save Changes</button>
                        </div>
                    </form>
                </div>

                {/* Security Form */}
                <div className="reports-container">
                    <div className="reports-header" style={{borderBottom: '1px solid #e8edf4', paddingBottom: '1rem', marginBottom: '1.5rem'}}>
                        <h2 style={{fontSize: '1.2rem', color: '#1a3d5c', margin: 0}}><i className="fas fa-shield-alt" style={{color: '#d4af37', marginRight: '8px'}}></i> Security Settings</h2>
                    </div>
                    <form onSubmit={handlePasswordSave}>
                        <div style={{maxWidth: '400px'}}>
                            <label style={labelStyle}>Current Password</label>
                            <input style={inputStyle} type="password" value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} required />
                            
                            <label style={labelStyle}>New Password</label>
                            <input style={inputStyle} type="password" value={passwords.newPass} onChange={e => setPasswords({...passwords, newPass: e.target.value})} required />
                            
                            <label style={labelStyle}>Confirm New Password</label>
                            <input style={inputStyle} type="password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} required />
                        </div>
                        <div style={{display: 'flex', marginTop: '1rem'}}>
                            <button type="submit" className="btn-secondary"><i className="fas fa-key"></i> Update Password</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>

        {toast.show && (
            <div className={`toast ${toast.type} show`}>
                <span>{toast.msg}</span>
                <button className="toast-close" onClick={() => setToast({ ...toast, show: false })}>×</button>
            </div>
        )}
    </div>
  );
}