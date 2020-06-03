package de.luuuke.pcubes.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class ProcessCubeStructure {

  private String id;

  private String name;

  private List<Dimension> dimensions = new ArrayList<>();

  public ProcessCubeStructure() {
    System.out.println("");
  }

  public ProcessCubeStructure(String name, List<Dimension> dimensions) {
    this.name = name;
    this.dimensions = dimensions;
  }

  public String getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public List<Dimension> getDimensions() {
    return dimensions;
  }
}