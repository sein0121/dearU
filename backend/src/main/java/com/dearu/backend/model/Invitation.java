package com.dearu.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "invitation")
@Getter
@Setter
public class Invitation {
    @Id
    @Column(columnDefinition = "VARCHAR(36)")
    private String id = UUID.randomUUID().toString();

    private String title;
    private String clsf;
    private LocalDateTime schedule;
    private String location;
    private String settings;
    private String pictureId;
    private String createdBy;
    private String participantIds;
    private String description;
}
