package com.credit.card.validator.java.service.impl;

import com.credit.card.validator.java.model.CardType;
import com.credit.card.validator.java.service.CreditCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreditCardServiceImpl implements CreditCardService {

    private final Map<Integer,String> cardTypeNameMap;
    private final Map<String,CardType> cardTypeMap;


    @Override
    public Optional<CardType> getCardType(String cardNumber){
        if(cardNumber.length() < 12){
            return Optional.of(null);
        }else{
            String prefixCardNumber = cardNumber.substring(0,6);
            int prefixNumber = Integer.parseInt(prefixCardNumber);
            while(prefixNumber > 10){
                if(cardTypeNameMap.containsKey(prefixNumber)){
                    String cardTypeName = cardTypeNameMap.get(prefixNumber);
                    return Optional.of(cardTypeMap.get(cardTypeName));
                }
                prefixNumber = prefixNumber / 10;
            }
            if (cardTypeNameMap.containsKey(prefixNumber)){
                String cardTypeName = cardTypeNameMap.get(prefixNumber);
                return Optional.of(cardTypeMap.get(cardTypeName));
            }

        }
        return Optional.of(null);

    }

    @Override
    public Boolean isValidLuhn(String cardNumber) {
        String cardNumberRevered = new StringBuilder(cardNumber).reverse().toString();
        int index = 0;
        int sum = 0;
        for(char value : cardNumberRevered.toCharArray()){
            int num = Character.getNumericValue(value);
            if(index % 2 != 0){
                num *= 2;
                if (num < 10){
                    sum += num;
                }else{
                    sum += num-9;
                }
            }else{
                sum += num;
            }
        }

        return sum % 10 == 0;
    }

    @Override
    public Boolean isValidLength(String cardNumber, CardType cardType) {
        for(Integer len : cardType.getValidLength()){
            if(len == cardNumber.length()){
                return true;
            }
        }
        return false;
    }

}
