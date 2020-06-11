package de.luuuke.pcubes.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class DimensionElement {

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  private Dimension dimension;

  @OneToMany
  private Set<DimensionElementValue> values = new HashSet<>();

  public Long getId() {
    return id;
  }

  public Dimension getDimension() {
    return dimension;
  }

  public Set<DimensionElementValue> getValues() {
    return values;
  }
}
