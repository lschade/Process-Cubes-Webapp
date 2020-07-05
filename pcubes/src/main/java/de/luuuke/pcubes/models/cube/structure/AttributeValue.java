package de.luuuke.pcubes.models.cube.structure;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import de.luuuke.pcubes.models.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class AttributeValue extends BaseEntity {

  @ManyToOne
  @JsonIgnoreProperties("values")
  private DimensionAttribute attribute;

  public AttributeValue() {
  }

  public AttributeValue(DimensionAttribute attribute) {
    this.attribute = attribute;
  }

  public DimensionAttribute getAttribute() {
    return attribute;
  }
}