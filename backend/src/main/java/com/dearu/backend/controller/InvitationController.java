package com.dearu.backend.controller;

import com.dearu.backend.model.Invitation;
import com.dearu.backend.service.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/invitations")
public class InvitationController {

    @Autowired
    private InvitationService invitationService;

    @GetMapping
    public List<Invitation> getAllInvitations() {
        return invitationService.getAllInvitations();
    }

    @PostMapping("/save")
    public Invitation saveInvitation(@RequestBody Invitation invitation) {
        System.out.println("Received JSON: " + invitation.toString());
        return invitationService.saveInvitation(invitation);
    }

    @PutMapping("/update/{id}")
    public Invitation updateInvitation(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        return invitationService.updateInvitation(id, updates);
    }

}
