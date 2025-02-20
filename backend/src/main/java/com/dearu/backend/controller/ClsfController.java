package com.dearu.backend.controller;

import com.dearu.backend.model.Clsf;
import com.dearu.backend.service.ClsfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/clsf")
public class ClsfController {
    @Autowired
    private ClsfService clsfService;

    @GetMapping
    public List<Clsf> getAllClsf() {
        return clsfService.getAllClsf();
    }
}
