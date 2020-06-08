package de.luuuke.pcubes.models;

import javax.persistence.*;
import java.util.Set;

@Entity
public class DimensionAttribute {

  @Id
  @GeneratedValue
  private Long id;

  private String name;

  private String dtype;

  @ManyToOne
  private Dimension dimension;

  @OneToMany
  private Set<ValueGroup> values;

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDtype() {
    return dtype;
  }

  public Dimension getDimension() {
    return dimension;
  }

  public Set<ValueGroup> getValues() {
    return values;
  }
}