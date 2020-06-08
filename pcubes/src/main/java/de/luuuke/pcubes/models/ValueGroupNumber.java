package de.luuuke.pcubes.models;

import javax.persistence.Entity;

@Entity
public class ValueGroupNumber extends ValueGroup {

  private double lower;

  private double upper;

  public double getLower() {
    return lower;
  }

  public double getUpper() {
    return upper;
  }
}
