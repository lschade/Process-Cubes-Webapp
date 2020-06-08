package de.luuuke.pcubes.models;

import javax.persistence.*;

@Entity
public abstract class ValueGroup {

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  private DimensionAttribute attribute;

  public Long getId() {
    return id;
  }

  public DimensionAttribute getAttribute() {
    return attribute;
  }
}