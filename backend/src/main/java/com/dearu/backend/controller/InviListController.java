package com.dearu.backend.controller;


import com.dearu.backend.model.Invitation;
import com.dearu.backend.service.InviListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/invitations")
public class InviListController {
    @Autowired
    private InviListService inviListService;

    @GetMapping
    public List<Invitation> getAllInvi() {
        return inviListService.getAllInvi();
    }
}
