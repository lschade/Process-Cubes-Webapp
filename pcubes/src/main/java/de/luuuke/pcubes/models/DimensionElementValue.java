package de.luuuke.pcubes.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class DimensionElementValue extends BaseEntity {

  @ManyToOne
  @JsonIgnore
  private DimensionElement dimensionElement;

  @ManyToOne
  @JsonIgnoreProperties({"dimension", "values"})
  private DimensionAttribute dimensionAttribute;

  @ManyToOne
  @JsonIgnoreProperties("attribute")
  private AttributeValue value;

  public DimensionElementValue() {
  }

  public DimensionElementValue(DimensionElement dimensionElement, DimensionAttribute attribute, AttributeValue value) {
    this.dimensionElement = dimensionElement;
    this.dimensionAttribute = attribute;
    this.value = value;
  }

  public DimensionElement getDimensionElement() {
    return dimensionElement;
  }

  public DimensionAttribute getDimensionAttribute() {
    return dimensionAttribute;
  }

  public AttributeValue getValue() {
    return value;
  }
}
