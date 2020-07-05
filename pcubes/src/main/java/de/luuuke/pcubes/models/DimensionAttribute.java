package de.luuuke.pcubes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class DimensionAttribute extends BaseEntity implements Comparable<DimensionAttribute> {

  private String name;

  private String dtype;

  @ManyToOne
  @JsonIgnoreProperties("attributes")
  private Dimension dimension;

  @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL)
  @JsonIgnoreProperties("attribute")
  private final Set<AttributeValue> values = new HashSet<>();

  public DimensionAttribute() {
  }

  public DimensionAttribute(String name, String dtype, Dimension dimension) {
    this.name = name;
    this.dtype = dtype;
    this.dimension = dimension;
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

  public Set<AttributeValue> getValues() {
    return values;
  }

  @Override
  public int compareTo(DimensionAttribute o) {
    return this.getCreatedAt().compareTo(o.getCreatedAt());
  }
}