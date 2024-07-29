import axios from 'axios';
import API_URL from '../config';

interface Advisor {
    id?: number; // Make id optional for creation
    name: string;
    sin: string;
    address?: string;
    phone?: string;
    healthStatus?: string; // Make healthStatus optional for creation
}

const getAdvisors = async (): Promise<Advisor[]> => {
    const response = await axios.get(`${API_URL}/advisors`);
    return response.data;
};

const getAdvisor = async (id: number): Promise<Advisor> => {
    const response = await axios.get(`${API_URL}/advisors/${id}`);
    return response.data;
};

const createAdvisor = async (advisor: Omit<Advisor, 'id' | 'healthStatus'>): Promise<Advisor> => {
    const response = await axios.post(`${API_URL}/advisors`, advisor);
    return response.data;
};

const updateAdvisor = async (advisor: Advisor): Promise<void> => {
    await axios.put(`${API_URL}/advisors/${advisor.id}`, advisor);
};

const deleteAdvisor = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/advisors/${id}`);
};

export { getAdvisors, getAdvisor, createAdvisor, updateAdvisor, deleteAdvisor };
export type { Advisor };
