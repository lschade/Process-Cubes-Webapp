package de.luuuke.pcubes.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class DimensionElementValue {

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  @JsonIgnore
  private DimensionElement dimensionElement;

  @ManyToOne
  @JsonIgnoreProperties({"dimension", "values"})
  private DimensionAttribute dimensionAttribute;

  @ManyToOne
  @JsonIgnoreProperties("attribute")
  private ValueGroup value;

  public DimensionElementValue() {
  }

  public DimensionElementValue(DimensionAttribute attribute, ValueGroup value) {
    this.dimensionAttribute = attribute;
    this.value = value;
  }

  public Long getId() {
    return id;
  }

  public DimensionElement getDimensionElement() {
    return dimensionElement;
  }

  public DimensionAttribute getDimensionAttribute() {
    return dimensionAttribute;
  }

  public ValueGroup getValue() {
    return value;
  }
}
