package de.luuuke.pcubes.models.cube.structure;


import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"lower", "upper"})})
public class AttributeValueNumber extends AttributeValue {

  private double lower;

  private double upper;

  public AttributeValueNumber() {
  }

  public AttributeValueNumber(DimensionAttribute attribute, double lower, double upper) {
    super(attribute);
    this.lower = lower;
    this.upper = upper;
  }

  public double getLower() {
    return lower;
  }

  public double getUpper() {
    return upper;
  }
}
