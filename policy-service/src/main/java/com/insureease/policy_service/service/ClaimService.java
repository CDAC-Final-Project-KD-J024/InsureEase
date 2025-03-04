package com.insureease.policy_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insureease.policy_service.model.Claim;
import com.insureease.policy_service.repository.ClaimRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public List<Claim> getClaimsByUserId(Long userId) {
        return claimRepository.findByUserId(userId);
    }

    public Optional<Claim> getClaimById(Long id) {
        return claimRepository.findById(id);
    }

    public Claim submitClaim(Claim claim) {
        return claimRepository.save(claim);
    }

    public Claim updateClaimStatus(Long id, Claim.ClaimStatus status) {
        return claimRepository.findById(id).map(claim -> {
            claim.setClaimStatus(status);
            return claimRepository.save(claim);
        }).orElse(null);
    }

    public void deleteClaim(Long id) {
        claimRepository.deleteById(id);
    }
}
