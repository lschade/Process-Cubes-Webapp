package de.luuuke.pcubes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Dimension {

  public Dimension() {
  }

  public Dimension(String name, ProcessCubeStructure processCubeStructure) {
    this.name = name;
    this.processCubeStructure = processCubeStructure;
  }

  @Id
  @GeneratedValue
  private Long id;

  private String name;

  @ManyToOne
  @JsonIgnoreProperties("dimensions")
  private ProcessCubeStructure processCubeStructure;

  @OneToMany(mappedBy = "dimension", cascade = CascadeType.ALL)
  @JsonIgnoreProperties("dimension")
  private Set<DimensionAttribute> attributes = new HashSet<>();

  @OneToMany(mappedBy = "dimension", cascade = CascadeType.ALL)
  private Set<DimensionElement> elements = new HashSet<>();

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public ProcessCubeStructure getProcessCubeStructure() {
    return processCubeStructure;
  }

  public Set<DimensionAttribute> getAttributes() {
    return attributes;
  }

  public Set<DimensionElement> getElements() {
    return elements;
  }
}