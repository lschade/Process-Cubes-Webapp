package de.luuuke.pcubes.models;

import javax.persistence.*;

@Entity
public class DimensionElementValue {

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  private DimensionElement dimensionElement;

  @ManyToOne
  private DimensionAttribute dimensionAttribute;

  public Long getId() {
    return id;
  }

  public DimensionElement getDimensionElement() {
    return dimensionElement;
  }

  public DimensionAttribute getDimensionAttribute() {
    return dimensionAttribute;
  }
}
