package com.insureease.policy_service.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "policies")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String policyName;

    @Column(nullable = false)
    private String policyType;

    @Column(nullable = false)
    private double premiumAmount;

    private String description;
}
