package com.dearu.backend.service;

import com.dearu.backend.model.Clsf;
import com.dearu.backend.model.Invitation;
import com.dearu.backend.repository.ClsfRepository;
import com.dearu.backend.repository.InviListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InviListService {
    @Autowired
    private InviListRepository inviListRepository;

    public List<Invitation> getAllInvi() {

        return inviListRepository.findAllByOrderByScheduleDesc();
    }
}
