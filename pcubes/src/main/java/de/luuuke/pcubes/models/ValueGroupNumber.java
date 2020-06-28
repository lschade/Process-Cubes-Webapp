package de.luuuke.pcubes.models;

import javax.persistence.Entity;

@Entity
public class ValueGroupNumber extends ValueGroup {

  private double lower;

  private double upper;

  public ValueGroupNumber() {
  }

  public ValueGroupNumber(DimensionAttribute attribute, double lower, double upper) {
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
