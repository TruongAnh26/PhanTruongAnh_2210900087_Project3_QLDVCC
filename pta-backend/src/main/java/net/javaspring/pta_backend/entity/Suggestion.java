package net.javaspring.pta_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "PTA_SUGGESTION")
public class Suggestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plant_id", nullable = false)
    private Plant plant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LightLevel light;

    @Enumerated(EnumType.STRING)
    @Column(name = "space_type", nullable = false)
    private SpaceType spaceType;

    @Enumerated(EnumType.STRING)
    @Column(name = "air_quality", nullable = false)
    private AirQuality airQuality;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Humidity humidity;
} 