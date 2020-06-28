package de.luuuke.pcubes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Dimension {

  public Dimension() {
  }

  public Dimension(String name, CubeStructure cubeStructure) {
    this.name = name;
    this.cubeStructure = cubeStructure;
  }

  @Id
  @GeneratedValue
  private Long id;

  private String name;

  @ManyToOne
  @JsonIgnoreProperties("dimensions")
  private CubeStructure cubeStructure;

  @OneToMany(mappedBy = "dimension", cascade = CascadeType.ALL)
  @JsonIgnoreProperties("dimension")
  private Set<DimensionAttribute> attributes = new HashSet<>();

  @OneToMany(mappedBy = "dimension", cascade = CascadeType.ALL)
  @JsonIgnoreProperties("dimension")
  private Set<DimensionElement> elements = new HashSet<>();

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public CubeStructure getCubeStructure() {
    return cubeStructure;
  }

  public Set<DimensionAttribute> getAttributes() {
    return attributes;
  }

  public Set<DimensionElement> getElements() {
    return elements;
  }
}