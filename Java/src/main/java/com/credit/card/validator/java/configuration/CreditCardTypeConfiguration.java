package com.credit.card.validator.java.configuration;

import com.credit.card.validator.java.model.CardType;
import com.credit.card.validator.java.model.CreditCardData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class CreditCardTypeConfiguration {

    @Autowired
    CreditCardData creditCardData;

    @Bean(name = "cardTypeNameMap")
    public Map<Integer,String> cardTypeNameMap(){
        Map<Integer, String> map = new HashMap<>();
        List<CardType> cardTypeList = creditCardData.getCards();

        for(CardType cardType : cardTypeList){
            String range = cardType.getRange();
            List<Integer> cardNumberRange = getRangeList(range);
            for(Integer integerRange : cardNumberRange){
                map.put(integerRange, cardType.getName());
            }
        }
        return map;
    }

    @Bean(name = "cardTypeMap")
    public Map<String,CardType> cardTypeMap(){
        Map<String,CardType> map = new HashMap<>();
        for(CardType cardType : creditCardData.getCards()){
            map.put(cardType.getName(), cardType);
        }
        return map;
    }

    private List<Integer> getRangeList(String totalRange){
        List<Integer> rangeList = new ArrayList<>();

        //Split String in-to list of ranges
        String[] stringRange = totalRange.split(",");

        for(String range : stringRange){
            if(!range.contains("-")){
                rangeList.add(Integer.parseInt(range));
            }else{
                String[] startAndEndRange = range.split("-");
                int start = Integer.parseInt(startAndEndRange[0]);
                int end = Integer.parseInt(startAndEndRange[1]);
                for(int i = start; i < end; i++){
                    rangeList.add(i);
                }
            }
        }
        return rangeList;
    }

}
