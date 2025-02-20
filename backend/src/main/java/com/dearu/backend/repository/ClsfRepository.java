package com.dearu.backend.repository;

import com.dearu.backend.model.Clsf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClsfRepository extends JpaRepository<Clsf, String> {
    Clsf findByCode(String title);
    Clsf findByTitle(String title);
}
