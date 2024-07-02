package de.fietensen.wafflemap;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
    @RequestMapping(value = { "/check", "/profile/{id}"})
    public String index() {
        return "forward:/";
    }
}
