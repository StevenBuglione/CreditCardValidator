package com.credit.card.validator.java;

import com.credit.card.validator.java.service.CardValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CreditCardValiationCommandLineRunner  implements CommandLineRunner {

    private final CardValidationService cardValidationService;
    @Override
    public void run(String... args) throws Exception {
        System.out.println(cardValidationService.validateCard("4556781815037"));

    }
}
