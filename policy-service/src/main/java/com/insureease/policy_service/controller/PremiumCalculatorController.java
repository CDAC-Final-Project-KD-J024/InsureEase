package com.insureease.policy_service.controller;


import com.insureease.policy_service.service.PremiumCalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/premium")
public class PremiumCalculatorController {

    @Autowired
    private PremiumCalculatorService premiumCalculatorService;

    // Endpoint for life insurance premium calculation
    @PostMapping("/life")
    public ResponseEntity<Double> calculateLifeInsurancePremium(@RequestBody LifeInsuranceRequest request) {
        double premium = premiumCalculatorService.calculateLifeInsurancePremium(request.getAge(), request.getSumAssured(), request.getTenure());
        return ResponseEntity.ok(premium);
    }

    // Endpoint for health insurance premium calculation
    @PostMapping("/health")
    public ResponseEntity<Double> calculateHealthInsurancePremium(@RequestBody HealthInsuranceRequest request) {
        double premium = premiumCalculatorService.calculateHealthInsurancePremium(request.getAge(), request.getCoverageAmount(), request.isPreExistingConditions());
        return ResponseEntity.ok(premium);
    }

    // Endpoint for car insurance premium calculation
    @PostMapping("/car")
    public ResponseEntity<Double> calculateCarInsurancePremium(@RequestBody CarInsuranceRequest request) {
        double premium = premiumCalculatorService.calculateCarInsurancePremium(request.getCarModel(), request.getCarAge(), request.getCoverageAmount());
        return ResponseEntity.ok(premium);
    }

    // Endpoint for home insurance premium calculation
    @PostMapping("/home")
    public ResponseEntity<Double> calculateHomeInsurancePremium(@RequestBody HomeInsuranceRequest request) {
        double premium = premiumCalculatorService.calculateHomeInsurancePremium(request.getPropertyValue(), request.getLocation(), request.getCoverageAmount());
        return ResponseEntity.ok(premium);
    }
}
