package com.credit.card.validator.java.service.impl;

import com.credit.card.validator.java.model.CardType;
import com.credit.card.validator.java.model.ValidationResult;
import com.credit.card.validator.java.service.CardValidationService;
import com.credit.card.validator.java.service.CreditCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CardValidationServiceImpl implements CardValidationService {

    private final CreditCardService creditCardService;


    @Override
    public ValidationResult validateCard(String cardNumber) {
        Optional<CardType> cardType = creditCardService.getCardType(cardNumber);
        Boolean isValidLuhn = creditCardService.isValidLuhn(cardNumber);
        Boolean isValidLength = creditCardService.isValidLength(cardNumber,cardType.get());
        Boolean isValid = isValidLuhn && isValidLength;
        return new ValidationResult(cardType,isValid,isValidLuhn,isValidLength);
    }
}
