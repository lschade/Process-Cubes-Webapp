package de.luuuke.pcubes.models;

import javax.persistence.*;
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
  private ProcessCubeStructure processCubeStructure;

  @OneToMany
  private Set<DimensionAttribute> attributes;

  @OneToMany
  private Set<DimensionElement> elements;

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