package com.credit.card.validator.java.model;

import lombok.Data;

import java.util.List;

@Data
public class CardType {
    private String name;
    private String range;
    private List<Integer> validLength;
}
