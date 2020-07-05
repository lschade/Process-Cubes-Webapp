package de.luuuke.pcubes.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CubeStructure extends BaseEntity {

  private String name;

  @OneToMany(mappedBy = "cubeStructure", cascade = CascadeType.ALL)
  private final List<Dimension> dimensions = new ArrayList<>();

  public String getName() {
    return name;
  }

  public List<Dimension> getDimensions() {
    return dimensions;
  }
}