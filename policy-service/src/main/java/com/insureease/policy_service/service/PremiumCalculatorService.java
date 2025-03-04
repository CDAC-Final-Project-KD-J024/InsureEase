package com.insureease.policy_service.service;


import org.springframework.stereotype.Service;

@Service
public class PremiumCalculatorService {

    // Method for calculating life insurance premium
    public double calculateLifeInsurancePremium(int age, double sumAssured, int tenure) {
        // Sample logic: Premium = (sumAssured * age) / 1000 + tenure * 5
        return (sumAssured * age) / 1000 + tenure * 5;
    }

    // Method for calculating health insurance premium
    public double calculateHealthInsurancePremium(int age, double coverageAmount, boolean preExistingConditions) {
        // Sample logic: Premium = (coverageAmount * age) / 500 + (preExistingConditions ? 200 : 0)
        double premium = (coverageAmount * age) / 500;
        if (preExistingConditions) {
            premium += 200;
        }
        return premium;
    }

    // Method for calculating car insurance premium
    public double calculateCarInsurancePremium(String carModel, int carAge, double coverageAmount) {
        // Sample logic: Premium = (carAge * 10) + (coverageAmount / 1000)
        return (carAge * 10) + (coverageAmount / 1000);
    }

    // Method for calculating home insurance premium
    public double calculateHomeInsurancePremium(double propertyValue, String location, double coverageAmount) {
        // Sample logic: Premium = (propertyValue * 0.005) + (coverageAmount / 1000)
        return (propertyValue * 0.005) + (coverageAmount / 1000);
    }
}
