import React from 'react';
import './ListingGrid.css';

interface ListingGridProps {
    advisors: Advisor[];
    onUpdate: (advisor: Advisor) => void;
    onDelete: (id: number) => void;
}

interface Advisor {
    id?: number;
    name: string;
    sin: string;
    address?: string;
    phone?: string;
    healthStatus?: string;
}

const ListingGrid: React.FC<ListingGridProps> = ({ advisors, onUpdate, onDelete }) => {
    return (
        <table className="advisor-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Health Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {advisors.map(advisor => (
                    <tr key={advisor.id}>
                        <td>{advisor.name}</td>
                        <td>{advisor.phone}</td>
                        <td>{advisor.healthStatus}</td>
                        <td>
                            <button className="update-button" onClick={() => onUpdate(advisor)}>Update</button>
                            <button className="delete-button" onClick={() => onDelete(advisor.id!)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListingGrid;
