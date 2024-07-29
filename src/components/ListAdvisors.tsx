import React, { useEffect, useState } from 'react';
import { getAdvisors, createAdvisor, updateAdvisor, deleteAdvisor, Advisor } from '../services/AdvisorService';
import ListingGrid from './ListingGrid';
import Popup from './Popup';
import './ListAdvisors.css';

const ListAdvisors: React.FC = () => {
    const [advisors, setAdvisors] = useState<Advisor[]>([]);
    const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAdvisors();
                setAdvisors(result);
                setError('');
            } catch (error: any) {
                setError('An error occurred while fetching the advisors.');
            }
        };
        fetchData();
    }, []);

    const handleAddClick = () => {
        setSelectedAdvisor(null);
        setIsUpdateMode(false);
        setIsPopupOpen(true);
    };

    const handleUpdateClick = (advisor: Advisor) => {
        setSelectedAdvisor(advisor);
        setIsUpdateMode(true);
        setIsPopupOpen(true);
    };

    const handleDeleteClick = async (id: number) => {
        try {
            await deleteAdvisor(id);
            setAdvisors(advisors.filter(advisor => advisor.id !== id));
            setError('');
        } catch (error: any) {
            setError('An error occurred while deleting the advisor.');
        }
    };

    const handleSave = async (advisor: Omit<Advisor, 'id' | 'healthStatus'>) => {
        try {
            if (isUpdateMode && selectedAdvisor) {
                await updateAdvisor({ ...selectedAdvisor, ...advisor });
            } else {
                await createAdvisor(advisor);
            }
            const result = await getAdvisors();
            setAdvisors(result);
            setIsPopupOpen(false);
            setError('');
        } catch (error: any) {
            setError('An error occurred while saving the advisor.');
        }
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="advisor-list">
            <h2>Advisors List</h2>
            <button className="add-button" onClick={handleAddClick}>Add Advisor</button>
            {error && <p className="error">{error}</p>}
            <ListingGrid advisors={advisors} onUpdate={handleUpdateClick} onDelete={handleDeleteClick} />
            {isPopupOpen && (
                <Popup
                    advisor={selectedAdvisor}
                    isUpdateMode={isUpdateMode}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default ListAdvisors;
