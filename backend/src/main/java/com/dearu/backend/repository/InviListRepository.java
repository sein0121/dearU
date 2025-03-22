package com.dearu.backend.repository;

import com.dearu.backend.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InviListRepository extends JpaRepository<Invitation, String> {
    Optional<Invitation> findById(String id);
    List<Invitation> findAllByOrderByScheduleDesc();
}
