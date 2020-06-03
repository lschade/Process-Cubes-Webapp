package de.luuuke.pcubes.model;

import java.util.ArrayList;
import java.util.List;

public class DimensionAttribute {

  private String name;

  private String dtype;

  private List<ValueGroup> values = new ArrayList<>();

  public String getName() {
    return name;
  }

  public String getDtype() {
    return dtype;
  }

  public List<ValueGroup> getValues() {
    return values;
  }
}