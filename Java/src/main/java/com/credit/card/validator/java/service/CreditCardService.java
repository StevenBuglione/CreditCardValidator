package com.credit.card.validator.java.service;

import com.credit.card.validator.java.model.CardType;

import java.util.Optional;

public interface CreditCardService {
    Optional<CardType> getCardType(String cardNumber);
    Boolean isValidLuhn(String cardNumber);
    Boolean isValidLength(String cardNumber, CardType cardType);
}
