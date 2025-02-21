package com.dearu.backend.model;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
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

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime schedule;

    private String location;
    private String settings;
    private String pictureId;
    private String createdBy;
    private String participantIds;
    private String description;
}
