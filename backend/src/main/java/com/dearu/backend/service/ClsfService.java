package com.dearu.backend.service;

import com.dearu.backend.model.Clsf;
import com.dearu.backend.repository.ClsfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClsfService {
    @Autowired
    private ClsfRepository clsfRepository;

    public List<Clsf> getAllClsf() {
        return clsfRepository.findAll();
    }
}
