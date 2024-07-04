package de.fietensen.wafflemap.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/check")
@RequiredArgsConstructor
@Validated
public class CheckController {
    @GetMapping
    public Boolean getCheck() {
        return true;
    }
}
