package com.insureease.policy_service.controller;


public class HealthInsuranceRequest {
    private int age;
    private double coverageAmount;
    private boolean preExistingConditions;

    // Getters and Setters
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getCoverageAmount() {
        return coverageAmount;
    }

    public void setCoverageAmount(double coverageAmount) {
        this.coverageAmount = coverageAmount;
    }

    public boolean isPreExistingConditions() {
        return preExistingConditions;
    }

    public void setPreExistingConditions(boolean preExistingConditions) {
        this.preExistingConditions = preExistingConditions;
    }
}
