package de.luuuke.pcubes.models.cube.structure;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.common.collect.ImmutableMap;
import de.luuuke.pcubes.models.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Entity
public class DimensionElement extends BaseEntity {

  @ManyToOne
  private Dimension dimension;

  @OneToMany(mappedBy = "dimensionElement", cascade = CascadeType.ALL)
  @JsonIgnoreProperties("dimensionElement")
  private Set<DimensionElementValue> values = new HashSet<>();

  public Dimension getDimension() {
    return dimension;
  }

  public Map<Long, DimensionElementValue> getValues() {
    ImmutableMap.Builder<Long, DimensionElementValue> builder = ImmutableMap.builder();
    for (DimensionElementValue value : values) {
      builder.put(value.getDimensionAttribute().getId(), value);
    }

    return builder.build();
  }

  public void setDimension(Dimension dimension) {
    this.dimension = dimension;
  }

  public void setValues(Set<DimensionElementValue> values) {
    this.values = values;
  }

  public void addValue(DimensionElementValue value) {
    this.values.add(value);
  }
}
