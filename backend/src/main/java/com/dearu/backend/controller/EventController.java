package com.dearu.backend.controller;

import com.dearu.backend.model.Event;
import com.dearu.backend.repository.EventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/events")

public class EventController {
    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // ✅ 모든 이벤트 조회 API
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // ✅ 새로운 이벤트 생성 API
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }
}
