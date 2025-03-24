package com.dearu.backend.repository;

import com.dearu.backend.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvitationRepository extends JpaRepository<Invitation, String> {
    Optional<Invitation> findById(String Id);
    List<Invitation> findAllByOrderByScheduleDesc();
}
