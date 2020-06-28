package de.luuuke.pcubes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
  @JsonIgnoreProperties("values")
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