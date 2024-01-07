package de.luuuke.pcubes.models.cube.structure;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;


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
