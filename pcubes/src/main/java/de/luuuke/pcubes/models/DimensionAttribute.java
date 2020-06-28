package de.luuuke.pcubes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class DimensionAttribute extends BaseObject implements Serializable, Comparable<DimensionAttribute> {

  @Id
  @GeneratedValue
  private Long id;

  private String name;

  private String dtype;

  @ManyToOne
  @JsonIgnoreProperties("attributes")
  private Dimension dimension;

  @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL)
  @JsonIgnoreProperties("attribute")
  private final Set<ValueGroup> values = new HashSet<>();

  public DimensionAttribute() {
  }

  public DimensionAttribute(String name, String dtype, Dimension dimension) {
    this.name = name;
    this.dtype = dtype;
    this.dimension = dimension;
  }

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

  @Override
  public int compareTo(DimensionAttribute o) {
    return this.getCreatedAt().compareTo(o.getCreatedAt());
  }
}