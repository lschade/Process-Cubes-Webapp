package de.luuuke.pcubes.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CubeStructure {

  @Id
  @GeneratedValue
  private Long id;

  private String name;

  @OneToMany(mappedBy = "cubeStructure", cascade = CascadeType.ALL)
  private List<Dimension> dimensions = new ArrayList<>();

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public List<Dimension> getDimensions() {
    return dimensions;
  }
}