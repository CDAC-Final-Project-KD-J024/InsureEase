package com.insureease.policy_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.insureease.policy_service.model.Claim;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByUserId(Long userId);
    List<Claim> findByPolicyId(Long policyId);
}
