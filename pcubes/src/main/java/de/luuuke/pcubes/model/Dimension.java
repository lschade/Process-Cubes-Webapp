package de.luuuke.pcubes.model;

import java.util.HashSet;
import java.util.Set;

public class Dimension {

  private String name;

  private Set<DimensionAttribute> attributes = new HashSet<>();

  private Set<DimensionElement> elements = new HashSet<>();

  public Dimension() {
  }

  public Dimension(String name, Set<DimensionAttribute> attributes, Set<DimensionElement> elements) {
    this.name = name;
    this.attributes = attributes;
    this.elements = elements;
  }

  public Dimension(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public Set<DimensionAttribute> getAttributes() {
    return attributes;
  }

  public Set<DimensionElement> getElements() {
    return elements;
  }
}