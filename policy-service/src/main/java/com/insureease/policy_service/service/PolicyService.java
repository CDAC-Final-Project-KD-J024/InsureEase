package com.insureease.policy_service.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insureease.policy_service.model.Policy;
import com.insureease.policy_service.repository.PolicyRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Optional<Policy> getPolicyById(Long id) {
        return policyRepository.findById(id);
    }

    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    public Policy updatePolicy(Long id, Policy updatedPolicy) {
        return policyRepository.findById(id).map(policy -> {
            policy.setPolicyName(updatedPolicy.getPolicyName());
            policy.setPolicyType(updatedPolicy.getPolicyType());
            policy.setPremiumAmount(updatedPolicy.getPremiumAmount());
            policy.setDescription(updatedPolicy.getDescription());
            return policyRepository.save(policy);
        }).orElse(null);
    }

    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }
}
