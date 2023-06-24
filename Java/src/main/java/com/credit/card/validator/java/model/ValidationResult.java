package com.credit.card.validator.java.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Optional;

@Data
@AllArgsConstructor
public class ValidationResult {
    private Optional<CardType> cardType;
    private Boolean valid;
    private Boolean luhnValid;
    private Boolean lengthValid;
}
