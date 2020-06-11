package de.luuuke.pcubes.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ProcessCubeStructure {

  @Id
  @GeneratedValue
  private Long id;

  private String name;

  @OneToMany(mappedBy = "processCubeStructure", cascade = CascadeType.ALL)
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