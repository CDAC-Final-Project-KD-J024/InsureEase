package com.insureease.policy_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.insureease.policy_service.model.Policy;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}