package com.credit.card.validator.java.service;

import com.credit.card.validator.java.model.ValidationResult;

public interface CardValidationService {
    ValidationResult validateCard(String cardNumber);
}
