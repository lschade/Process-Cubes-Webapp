package de.luuuke.pcubes.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public abstract class ValueGroup {

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  private DimensionAttribute attribute;

  public ValueGroup() {
  }

  public ValueGroup(DimensionAttribute attribute) {
    this.attribute = attribute;
  }

  public Long getId() {
    return id;
  }

  public DimensionAttribute getAttribute() {
    return attribute;
  }
}