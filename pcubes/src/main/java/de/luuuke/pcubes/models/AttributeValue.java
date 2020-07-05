package de.luuuke.pcubes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public abstract class AttributeValue extends BaseEntity {

  @ManyToOne
  @JsonIgnoreProperties("values")
  private DimensionAttribute attribute;

  public AttributeValue() {
  }

  public AttributeValue(DimensionAttribute attribute) {
    this.attribute = attribute;
  }

  public DimensionAttribute getAttribute() {
    return attribute;
  }
}