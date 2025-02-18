import { createSlice } from '@reduxjs/toolkit';
import CarInsuranceImg from '../assets/images/car.png';
import LifeInsuranceImg from '../assets/images/life.png';
import HealthInsuranceImg from '../assets/images/health.png';
import HouseInsuranceImg from '../assets/images/house.png';

const dummyPolicies = [
  {
    id: '101',
    name: 'Comprehensive Car Insurance',
    type: 'Car',
    premium: 500,
    coverage: 'Full coverage including theft, fire, and accidents',
    benefits: ['Roadside assistance', 'Theft protection', 'Accident coverage'],
    terms: 'Covers up to $50,000 in damages. Deductible: $500',
    duration: '1 Year',
    provider: 'ABC Insurance Co.',
    image: CarInsuranceImg,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    status: 'Active',
  },
  {
    id: '102',
    name: 'Term Life Insurance',
    type: 'Life',
    premium: 300,
    coverage: 'Life coverage up to $500,000',
    benefits: ['Death benefits', 'Tax-free payout', 'No medical exam required'],
    terms: 'Valid for 10 years, renewable with premium adjustment',
    duration: '10 Years',
    provider: 'XYZ Life Co.',
    image: LifeInsuranceImg,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    status: 'Active',
  },
  {
    id: '103',
    name: 'Health Insurance Basic Plan',
    type: 'Health',
    premium: 200,
    coverage: 'Covers hospitalization, surgery, and prescriptions',
    benefits: ['Free preventive checkups', 'Low co-pay for medications'],
    terms: 'Up to $100,000 in medical expenses, co-pay: 10%',
    duration: '1 Year',
    provider: 'HealthFirst Inc.',
    image: HealthInsuranceImg,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    status: 'Active',
  },
  {
    id: '104',
    name: 'Homeowners Insurance Premium',
    type: 'Home',
    premium: 400,
    coverage: 'Covers damages due to natural disasters and theft',
    benefits: ['Fire protection', 'Flood damage coverage', 'Liability protection'],
    terms: 'Up to $200,000 in damages, deductible: $1,000',
    duration: '1 Year',
    provider: 'HomeSecure Ltd.',
    image: HouseInsuranceImg,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    status: 'Active',
  },
];

const initialState = {
  policies: [],
  loading: false,
  error: null,
};

const policySlice = createSlice({
  name: 'policies',
  initialState,
  reducers: {
    fetchPoliciesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPoliciesSuccess: (state, action) => {
      state.policies = action.payload;
      state.loading = false;
    },
    fetchPoliciesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPolicy: (state, action) => {
      state.policies.push(action.payload);
    },
    removePolicy: (state, action) => {
      state.policies = state.policies.filter(policy => policy.id !== action.payload);
    },
    updatePolicy: (state, action) => {
      const index = state.policies.findIndex(policy => policy.id === action.payload.id);
      if (index !== -1) {
        state.policies[index] = { ...state.policies[index], ...action.payload };
      }
    },
    updatePolicyStatus: (state, action) => {
      const { policyId, status } = action.payload;
      const policy = state.policies.find(policy => policy.id === policyId);
      if (policy) {
        policy.status = status;
      }
    },
    deletePolicy: (state, action) => {
      state.policies = state.policies.filter(policy => policy.id !== action.payload);
    },
    renewPolicy: (state, action) => {
      const policy = state.policies.find(p => p.id === action.payload);
      if (policy) {
        policy.status = "Active"; 
      }
    },
  },
});


export const fetchPolicies = () => (dispatch) => {
  dispatch(fetchPoliciesRequest()); 
  setTimeout(() => {
    try {
      dispatch(fetchPoliciesSuccess(dummyPolicies)); 
    } catch (error) {
      dispatch(fetchPoliciesFailure("Failed to load policies")); 
      console.log(error);
    }
  }, 1000);
};


export const selectPolicyById = (state, policyId) => 
  state.policy.policies.find(policy => policy.id === policyId);

export const {
  fetchPoliciesRequest,
  fetchPoliciesSuccess,
  fetchPoliciesFailure,
  addPolicy,
  removePolicy,
  updatePolicy,
  updatePolicyStatus,
  deletePolicy,
  renewPolicy
} = policySlice.actions;

export default policySlice.reducer;