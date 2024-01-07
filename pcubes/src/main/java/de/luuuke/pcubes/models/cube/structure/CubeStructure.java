package de.luuuke.pcubes.models.cube.structure;

import de.luuuke.pcubes.models.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

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