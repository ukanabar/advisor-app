import React, { useState, useEffect } from 'react';
import './Popup.css';

interface PopupProps {
    advisor: Advisor | null;
    isUpdateMode: boolean;
    onSave: (advisor: Omit<Advisor, 'id' | 'healthStatus'>) => void;
    onCancel: () => void;
}

interface Advisor {
    id?: number;
    name: string;
    sin: string;
    address?: string;
    phone?: string;
    healthStatus?: string;
}

const Popup: React.FC<PopupProps> = ({ advisor, isUpdateMode, onSave, onCancel }) => {
    const [name, setName] = useState(advisor?.name || '');
    const [sin, setSin] = useState(advisor?.sin || '');
    const [address, setAddress] = useState(advisor?.address || '');
    const [phone, setPhone] = useState(advisor?.phone || '');
    const [showSin, setShowSin] = useState(!isUpdateMode);
    const [showPhone, setShowPhone] = useState(!isUpdateMode);
    const [error, setError] = useState('');

    const validateForm = () => {
        if (name.length === 0 || name.length > 255) {
            setError('Name is required and must be less than 255 characters.');
            return false;
        }
        if (sin.length !== 9) {
            setError('SIN must be exactly 9 characters.');
            return false;
        }
        if (address.length > 255) {
            setError('Address must be less than 255 characters.');
            return false;
        }
        if (phone.length > 0 && phone.length !== 8) {
            setError('Phone must be exactly 8 characters if provided.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        onSave({ name, sin, address, phone });
    };

    const maskValue = (value: string) => value.replace(/./g, '*');

    return (
        <div className="popup">
            <div className="popup-content">
                <form onSubmit={handleSubmit}>
                    <h2>{isUpdateMode ? 'Update Advisor' : 'Add Advisor'}</h2>
                    {error && <p className="error">{error}</p>}
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
                    <div className="input-group">
                        <input
                            type="text"
                            value={showSin ? sin : maskValue(sin)}
                            onChange={e => setSin(e.target.value)}
                            placeholder="SIN"
                            required
                        />
                        <button type="button" className="icon-button" onClick={() => setShowSin(!showSin)}>
                            <i className={`fa ${showSin ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                    </div>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
                    <div className="input-group">
                        <input
                            type="text"
                            value={showPhone ? phone : maskValue(phone)}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="Phone"
                        />
                        <button type="button" className="icon-button" onClick={() => setShowPhone(!showPhone)}>
                            <i className={`fa ${showPhone ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                    </div>
                    <div className="popup-actions">
                        <button className="save-button" type="submit">{isUpdateMode ? 'Update' : 'Save'}</button>
                        <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Popup;
