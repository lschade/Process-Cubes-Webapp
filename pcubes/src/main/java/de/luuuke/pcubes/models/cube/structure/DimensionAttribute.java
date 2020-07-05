package de.luuuke.pcubes.models.cube.structure;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import de.luuuke.pcubes.models.BaseEntity;
import de.luuuke.pcubes.models.DataType;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.xml.crypto.Data;
import javax.xml.datatype.DatatypeConfigurationException;

@Entity
public class DimensionAttribute
  extends BaseEntity
  implements Comparable<DimensionAttribute> {
  private String name;

  @Enumerated(EnumType.STRING)
  private DataType dataType;

  @ManyToOne
  @JsonIgnoreProperties("attributes")
  private Dimension dimension;

  @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL)
  @JsonIgnoreProperties("attribute")
  private final Set<AttributeValue> values = new HashSet<>();

  public DimensionAttribute() {}

  public DimensionAttribute(
    String name,
    DataType dataType,
    Dimension dimension
  ) {
    this.name = name;
    this.dataType = dataType;
    this.dimension = dimension;
  }

  public String getName() {
    return name;
  }

  public DataType getDataType() {
    return dataType;
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
