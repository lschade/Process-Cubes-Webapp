package de.luuuke.pcubes.models.cube.mapping;

import de.luuuke.pcubes.models.BaseEntity;
import de.luuuke.pcubes.models.cube.structure.DimensionAttribute;
import de.luuuke.pcubes.models.data.DataAttribute;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class AttributeAttributeMapping extends BaseEntity {
  @ManyToOne
  private DimensionAttribute dimensionAttribute;

  @ManyToOne
  private DataAttribute dataAttribute;

  public DimensionAttribute getDimensionAttribute() {
    return dimensionAttribute;
  }

  public DataAttribute getDataAttribute() {
    return dataAttribute;
  }
}
